import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "./paths";

/**
 * Require an authenticated session.
 * Redirects to login if no session exists.
 *
 * Use in Server Components and Server Actions.
 *
 * @returns The authenticated session and user
 * @throws Redirects to ADMIN_LOGIN_PATH if not authenticated
 */
export async function requireSession() {
    const supabase = await createClient();
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (error || !session) {
        redirect(ADMIN_LOGIN_PATH);
    }

    return {
        session,
        user: session.user,
    };
}
