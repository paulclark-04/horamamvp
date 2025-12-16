import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH, ADMIN_UNAUTHORIZED_PATH } from "./paths";

/**
 * Require admin privileges.
 *
 * Redirects to login if unauthenticated.
 * FAIL-CLOSED: any error or missing role row redirects to unauthorized.
 */
export async function requireAdmin() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect(ADMIN_LOGIN_PATH);
    }

    const { data: profile, error: profileError } = await supabase
        .from("utilisateurs")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profileError || !profile || profile.role !== "admin") {
        redirect(ADMIN_UNAUTHORIZED_PATH);
    }

    return { user };
}
