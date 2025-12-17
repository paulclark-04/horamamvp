"use client";

import type { ReactNode } from "react";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebarBackdrop } from "@/components/admin/AdminSidebarBackdrop";
import { AdminSidebarProvider, useAdminSidebar } from "@/components/admin/AdminSidebarContext";
import { AdminSidebarNav } from "@/components/admin/AdminSidebarNav";

function AdminLayoutShellInner({ children }: { children: ReactNode }) {
    const { isExpanded, isHovered, isMobileOpen } = useAdminSidebar();

    const mainContentMargin = isMobileOpen
        ? "ml-0"
        : isExpanded || isHovered
            ? "lg:ml-[290px]"
            : "lg:ml-[90px]";

    return (
        <div className="min-h-screen bg-gray-50 font-outfit text-gray-800 xl:flex">
            <AdminSidebarNav />
            <AdminSidebarBackdrop />

            <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
                <AdminHeader />
                <main className="mx-auto max-w-screen-2xl p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}

export function AdminLayoutShell({ children }: { children: ReactNode }) {
    return (
        <AdminSidebarProvider>
            <AdminLayoutShellInner>{children}</AdminLayoutShellInner>
        </AdminSidebarProvider>
    );
}
