import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

const PRIVATE_BUCKET = "documents-private";
const SIGNED_URL_TTL_SECONDS = 60;

function extractMediaId(body: unknown) {
    if (!body || typeof body !== "object") return null;
    const candidate = (body as { media_id?: unknown }).media_id;
    if (typeof candidate !== "string") return null;
    const mediaId = candidate.trim();
    return mediaId.length > 0 ? mediaId : null;
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

    const mediaId = extractMediaId(body);
    if (!mediaId) {
        return NextResponse.json({ error: "Invalid media_id" }, { status: 400 });
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

    const { data: media, error: mediaError } = await supabase
        .from("elements_media")
        .select("id, url, bucket")
        .eq("id", mediaId)
        .maybeSingle();

    if (mediaError) {
        return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
    }

    if (!media) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (typeof media.url !== "string") {
        return NextResponse.json({ error: "Invalid media url" }, { status: 400 });
    }

    const rawBucket = (media as { bucket?: unknown }).bucket;
    const rawUrl = normalizeStoragePath(media.url);
    if (!rawUrl) {
        return NextResponse.json({ error: "Invalid media url" }, { status: 400 });
    }

    let path = rawUrl;

    if (typeof rawBucket === "string") {
        if (rawBucket !== PRIVATE_BUCKET) {
            return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
        }
    } else {
        const [maybeBucket, ...rest] = rawUrl.split("/");
        if (maybeBucket !== PRIVATE_BUCKET || rest.length === 0) {
            return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
        }
        path = rest.join("/");
    }

    path = normalizeStoragePath(path);
    if (!path) {
        return NextResponse.json({ error: "Invalid media path" }, { status: 400 });
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
