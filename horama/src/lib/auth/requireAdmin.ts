import { requireSession } from "./requireSession";

/**
 * Custom error for unimplemented features.
 */
export class NotImplementedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotImplementedError";
    }
}

/**
 * Require admin privileges.
 *
 * FAIL-CLOSED: This function currently throws NotImplementedError.
 * Do NOT attempt to guess admin status via email checks or JWT claims.
 *
 * TODO: Implement proper admin check once DB schema and RLS are finalized.
 * Expected implementation:
 * 1. Call requireSession() to get user
 * 2. Query DB/RLS to verify admin role
 * 3. Throw or redirect if not admin
 *
 * @throws NotImplementedError - Always, until backend is finalized
 */
export async function requireAdmin(): Promise<never> {
    // Ensure user is at least authenticated
    await requireSession();

    // FAIL-CLOSED: Always deny until proper implementation
    throw new NotImplementedError(
        "requireAdmin() is not yet implemented. " +
        "Admin role verification requires finalized DB schema and RLS policies. " +
        "See TODO in src/lib/auth/requireAdmin.ts"
    );
}
