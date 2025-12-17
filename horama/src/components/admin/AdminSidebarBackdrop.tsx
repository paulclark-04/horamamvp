"use client";

import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";

export function AdminSidebarBackdrop() {
    const { isMobileOpen, closeMobileSidebar } = useAdminSidebar();

    if (!isMobileOpen) return null;

    return (
        <div
            className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
            onClick={closeMobileSidebar}
        />
    );
}
