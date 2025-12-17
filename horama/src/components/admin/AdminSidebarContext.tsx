"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AdminSidebarContextValue = {
    isExpanded: boolean;
    isHovered: boolean;
    isMobileOpen: boolean;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
    closeMobileSidebar: () => void;
    setIsHovered: (value: boolean) => void;
};

const AdminSidebarContext = createContext<AdminSidebarContextValue | null>(null);

export function useAdminSidebar() {
    const context = useContext(AdminSidebarContext);
    if (!context) {
        throw new Error("useAdminSidebar must be used within AdminSidebarProvider");
    }
    return context;
}

export function AdminSidebarProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const value = useMemo<AdminSidebarContextValue>(
        () => ({
            isExpanded,
            isHovered,
            isMobileOpen,
            toggleSidebar: () => setIsExpanded((prev) => !prev),
            toggleMobileSidebar: () => setIsMobileOpen((prev) => !prev),
            closeMobileSidebar: () => setIsMobileOpen(false),
            setIsHovered,
        }),
        [isExpanded, isHovered, isMobileOpen]
    );

    return (
        <AdminSidebarContext.Provider value={value}>
            {children}
        </AdminSidebarContext.Provider>
    );
}

