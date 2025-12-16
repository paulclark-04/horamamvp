import { z } from "zod";

/**
 * Public environment variables (safe for client components).
 * These are validated at module load time.
 */
const publicSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

/**
 * Server-only environment variables.
 * NEVER import envServer in client components.
 */
const serverSchema = z.object({
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    SUPABASE_JWT_SECRET: z.string().optional(),
});

/**
 * Combined schema for full server-side validation.
 */
const fullServerSchema = publicSchema.merge(serverSchema);

/**
 * Validate and export public env vars.
 * Safe to use in client components.
 */
function getPublicEnv() {
    const parsed = publicSchema.safeParse({
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    if (!parsed.success) {
        console.error("❌ Invalid public environment variables:", parsed.error.flatten().fieldErrors);
        throw new Error("Missing required public environment variables. See console for details.");
    }

    return parsed.data;
}

/**
 * Validate and export server env vars.
 * ONLY use in server components, API routes, and server actions.
 */
function getServerEnv() {
    // Skip validation during build if env vars aren't available
    if (typeof window !== "undefined") {
        throw new Error("envServer cannot be imported in client components!");
    }

    const parsed = fullServerSchema.safeParse({
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    });

    if (!parsed.success) {
        console.error("❌ Invalid server environment variables:", parsed.error.flatten().fieldErrors);
        throw new Error("Missing required server environment variables. See console for details.");
    }

    return parsed.data;
}

/**
 * Public environment variables.
 * Safe to use in client components.
 */
export const envPublic = getPublicEnv();

/**
 * Server environment variables.
 * NEVER import in client components - will throw at runtime.
 */
export const envServer = typeof window === "undefined" ? getServerEnv() : null!;
