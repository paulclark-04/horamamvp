import { NextRequest, NextResponse } from "next/server";
import { LeadCreateInputSchema } from "@/contracts/leads";
import { createServiceClient } from "@/lib/supabase/service";

// -----------------------------------------------------------------------------
// Rate Limiting (In-Memory for MVP)
// -----------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
    // Try x-forwarded-for first (common with proxies/load balancers)
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        // x-forwarded-for can contain multiple IPs; take the first one
        return forwarded.split(",")[0].trim();
    }

    // Fallback to x-real-ip
    const realIp = request.headers.get("x-real-ip");
    if (realIp) {
        return realIp;
    }

    // Default fallback
    return "unknown";
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetAt) {
        // First request or window expired
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
// POST /api/leads
// -----------------------------------------------------------------------------

export async function POST(request: NextRequest) {
    const clientIp = getClientIp(request);

    // Rate limit check
    if (isRateLimited(clientIp)) {
        console.warn(`[leads] Rate limit exceeded for IP: ${clientIp}`);
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }

    try {
        // Parse request body
        const body = await request.json();

        // Validate input
        const parseResult = LeadCreateInputSchema.safeParse(body);
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

        // Insert into database using service role client (bypasses RLS)
        const supabase = createServiceClient();
        const { data, error } = await supabase
            .from("leads_contacts")
            .insert({
                type: "lead",
                statut: "new",
                nom: input.nom,
                prenom: input.prenom ?? null,
                email: input.email,
                telephone: input.telephone ?? null,
                societe: input.societe ?? null,
            })
            .select("id")
            .single();

        if (error) {
            console.error("[leads] Supabase insert error:", error.message);
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        }

        console.info(`[leads] Created lead: ${data.id}`);
        return NextResponse.json({ lead_id: data.id }, { status: 201 });
    } catch (err) {
        // Handle JSON parse errors or unexpected issues
        if (err instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Invalid JSON body" },
                { status: 400 }
            );
        }

        console.error("[leads] Unexpected error:", err instanceof Error ? err.message : "Unknown");
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
