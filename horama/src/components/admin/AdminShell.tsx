import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-zinc-50">
            <div className="flex min-h-screen">
                <AdminSidebar />
                <main className="flex-1 p-6 md:p-10">{children}</main>
            </div>
        </div>
    );
}

