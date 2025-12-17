import { NextRequest, NextResponse } from "next/server";

import { CandidatureCreateInputSchema } from "@/contracts/candidatures";
import { createServiceClient } from "@/lib/supabase/service";
import { validateCandidatureCvFile } from "@/lib/upload/validateFile";

export const runtime = "nodejs";

// -----------------------------------------------------------------------------
// Rate Limiting (In-Memory for MVP)
// -----------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    const realIp = request.headers.get("x-real-ip");
    if (realIp) {
        return realIp;
    }

    return "unknown";
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
        return true;
    }

    record.count++;
    return false;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function sanitizeFilename(filename: string) {
    const withoutPath = filename.replace(/[/\\\\]/g, "_");
    const safe = withoutPath
        .normalize("NFKD")
        .replace(/[^\w.\- ]+/g, "_")
        .replace(/\s+/g, "_");

    return safe.length > 120 ? safe.slice(-120) : safe;
}

function getFormString(formData: FormData, key: string) {
    const value = formData.get(key);
    return typeof value === "string" ? value : null;
}

function emptyToUndefined(value: string | null) {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}

// -----------------------------------------------------------------------------
// POST /api/candidatures
// -----------------------------------------------------------------------------

export async function POST(request: NextRequest) {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }

    try {
        let formData: FormData;
        try {
            formData = await request.formData();
        } catch {
            return NextResponse.json(
                { error: "Invalid multipart form data" },
                { status: 400 }
            );
        }

        const cv = formData.get("cv");
        if (!(cv instanceof File)) {
            return NextResponse.json({ error: "Missing cv file" }, { status: 400 });
        }

        const fileValidation = validateCandidatureCvFile(cv);
        if (!fileValidation.ok) {
            return NextResponse.json({ error: fileValidation.error }, { status: 400 });
        }

        const inputCandidate = {
            nom: getFormString(formData, "nom") ?? "",
            prenom: emptyToUndefined(getFormString(formData, "prenom")),
            email: getFormString(formData, "email") ?? "",
            offre_id: emptyToUndefined(getFormString(formData, "offre_id")),
        };

        const parseResult = CandidatureCreateInputSchema.safeParse(inputCandidate);
        if (!parseResult.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: parseResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const input = parseResult.data;

        const now = new Date();
        const year = String(now.getUTCFullYear());
        const month = String(now.getUTCMonth() + 1).padStart(2, "0");
        const uuid = crypto.randomUUID();
        const sanitizedFilename = sanitizeFilename(cv.name);

        const bucket = "documents-private";
        const path = `candidatures/${year}/${month}/${uuid}_${sanitizedFilename}`;

        const service = createServiceClient();

        const { error: uploadError } = await service.storage.from(bucket).upload(path, cv, {
            contentType: cv.type || undefined,
            upsert: false,
        });

        if (uploadError) {
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        }

        const { data: inserted, error: insertError } = await service
            .from("candidatures")
            .insert({
                nom: input.nom,
                prenom: input.prenom ?? null,
                email: input.email,
                offre_id: input.offre_id ?? null,
                cv_url: path,
                statut: "new",
            })
            .select("id")
            .single();

        if (insertError || !inserted) {
            await service.storage.from(bucket).remove([path]).catch(() => undefined);
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { ok: true, candidature_id: inserted.id },
            { status: 201 }
        );
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
