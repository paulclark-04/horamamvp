import { requireAdmin } from "@/lib/auth";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export default async function AdminProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireAdmin();

    return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
