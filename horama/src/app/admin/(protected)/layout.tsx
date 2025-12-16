import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireAdmin();

    return <AdminShell>{children}</AdminShell>;
}

