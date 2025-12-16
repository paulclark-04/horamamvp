import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

const PRIVATE_BUCKET = "documents-private";
const CV_PATH_PREFIX = "candidatures/";
const SIGNED_URL_TTL_SECONDS = 60;

function extractCandidatureId(body: unknown) {
    if (!body || typeof body !== "object") return null;
    const candidate = (body as { candidature_id?: unknown }).candidature_id;
    if (typeof candidate !== "string") return null;
    const trimmed = candidate.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function normalizeStoragePath(value: string) {
    return value.replace(/^\/+/, "").trim();
}

export async function POST(request: NextRequest) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const candidatureId = extractCandidatureId(body);
    if (!candidatureId) {
        return NextResponse.json({ error: "Invalid candidature_id" }, { status: 400 });
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
        .from("utilisateurs")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profileError || !profile || profile.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: candidature, error: candidatureError } = await supabase
        .from("candidatures")
        .select("id, cv_url")
        .eq("id", candidatureId)
        .maybeSingle();

    if (candidatureError) {
        return NextResponse.json(
            { error: "Failed to fetch candidature" },
            { status: 500 }
        );
    }

    if (!candidature) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (typeof candidature.cv_url !== "string") {
        return NextResponse.json({ error: "Missing cv_url" }, { status: 400 });
    }

    const path = normalizeStoragePath(candidature.cv_url);
    if (!path) {
        return NextResponse.json({ error: "Missing cv_url" }, { status: 400 });
    }

    if (!path.startsWith(CV_PATH_PREFIX)) {
        return NextResponse.json({ error: "Invalid cv_url" }, { status: 400 });
    }

    const service = createServiceClient();

    const { data: signed, error: signedError } = await service.storage
        .from(PRIVATE_BUCKET)
        .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);

    if (signedError || !signed?.signedUrl) {
        return NextResponse.json(
            { error: "Failed to create signed URL" },
            { status: 500 }
        );
    }

    return NextResponse.json({ signedUrl: signed.signedUrl });
}

