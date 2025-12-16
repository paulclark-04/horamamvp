import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client using the service role key.
 * This client bypasses RLS and should ONLY be used server-side.
 *
 * @throws Error if SUPABASE_SERVICE_ROLE_KEY is not set
 */
export function createServiceClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
        throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
    }

    if (!serviceRoleKey) {
        throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
