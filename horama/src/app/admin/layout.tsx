import { requireSession } from "@/lib/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Protect all admin routes - redirects to login if not authenticated
    await requireSession();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Minimal shell - no dashboard logic */}
            <main>{children}</main>
        </div>
    );
}
