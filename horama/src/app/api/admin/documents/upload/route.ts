import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { validateAdminDocumentFile } from "@/lib/upload/validateFile";

export const runtime = "nodejs";

function sanitizeFilename(filename: string) {
    const withoutPath = filename.replace(/[/\\\\]/g, "_");
    const safe = withoutPath
        .normalize("NFKD")
        .replace(/[^\w.\- ]+/g, "_")
        .replace(/\s+/g, "_");

    return safe.length > 120 ? safe.slice(-120) : safe;
}

export async function POST(request: NextRequest) {
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

    let formData: FormData;
    try {
        formData = await request.formData();
    } catch {
        return NextResponse.json({ error: "Invalid multipart form data" }, { status: 400 });
    }

    const file = formData.get("file");
    if (!(file instanceof File)) {
        return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const validation = validateAdminDocumentFile(file);
    if (!validation.ok) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const now = new Date();
    const year = String(now.getUTCFullYear());
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const uuid = crypto.randomUUID();
    const sanitizedFilename = sanitizeFilename(file.name);

    const bucket = "documents-private";
    const path = `admin-uploads/${year}/${month}/${uuid}_${sanitizedFilename}`;

    const service = createServiceClient();

    const { error: uploadError } = await service.storage.from(bucket).upload(path, file, {
        contentType: file.type || undefined,
        upsert: false,
    });

    if (uploadError) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const { data: inserted, error: insertError } = await service
        .from("elements_media")
        .insert({
            nom: file.name,
            url: path,
            type: file.type || null,
            bucket,
            is_public: false,
        })
        .select("id")
        .single();

    if (insertError || !inserted) {
        await service.storage.from(bucket).remove([path]).catch(() => undefined);
        return NextResponse.json({ error: "Failed to save metadata" }, { status: 500 });
    }

    return NextResponse.json(
        { ok: true, media_id: inserted.id, path },
        { status: 201 }
    );
}
