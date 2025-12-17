"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";

type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
    {
        href: "/admin/dashboard",
        label: "Dashboard",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                    d="M4 13.5V20h6v-6.5H4Zm0-9V11h6V4.5H4ZM14 4.5V9h6V4.5h-6ZM14 12v8h6v-8h-6Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        href: "/admin/qualification-leads",
        label: "Qualification leads",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                    d="M4 7h16M4 12h10M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        href: "/admin/gestion-contacts",
        label: "Gestion contacts",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M22 21v-2a4 4 0 0 0-3-3.87"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M16 3.13a4 4 0 0 1 0 7.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        href: "/admin/gestion-documents",
        label: "Gestion documents",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                <path
                    d="M14 2v6h8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        href: "/admin/boite-de-reception",
        label: "Boîte de réception",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                    d="M4 4h16v16H4V4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                <path
                    d="M4 7l8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

function isPathActive(pathname: string, href: string) {
    if (href === "/admin/dashboard") {
        return pathname === href || pathname === "/admin";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebarNav() {
    const pathname = usePathname();
    const {
        isExpanded,
        isHovered,
        isMobileOpen,
        setIsHovered,
        closeMobileSidebar,
    } = useAdminSidebar();

    const showLabels = isExpanded || isHovered || isMobileOpen;
    const widthClass = showLabels ? "w-[290px]" : "w-[90px]";
    const translateClass = isMobileOpen ? "translate-x-0" : "-translate-x-full";

    return (
        <aside
            className={`fixed top-0 left-0 z-99999 flex h-screen flex-col border-r border-gray-200 bg-white px-4 py-5 transition-all duration-300 ease-in-out lg:translate-x-0 ${widthClass} ${translateClass}`}
            onMouseEnter={() => {
                if (!isExpanded) setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center gap-3 px-2 py-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-title-sm font-bold text-white shadow-theme-xs">
                    H
                </div>
                {showLabels && (
                    <div className="min-w-0 leading-tight">
                        <div className="truncate text-theme-sm font-semibold text-gray-800">
                            Horama
                        </div>
                        <div className="truncate text-theme-xs text-gray-500">Admin</div>
                    </div>
                )}
            </div>

            <nav className="mt-6 flex-1 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const active = isPathActive(pathname, item.href);
                    const base = `menu-item group transition-colors ${
                        !showLabels ? "lg:justify-center" : "lg:justify-start"
                    }`;
                    const activeClass = active ? "menu-item-active" : "menu-item-inactive";
                    const iconClass = active ? "menu-item-icon-active" : "menu-item-icon-inactive";

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => closeMobileSidebar()}
                            className={`${base} ${activeClass}`}
                        >
                            <span className={iconClass} aria-hidden="true">
                                {item.icon}
                            </span>
                            {showLabels && (
                                <span className="menu-item-text truncate">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {showLabels && (
                <div className="mt-auto rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-theme-xs font-semibold uppercase tracking-wide text-gray-500">
                        Astuce
                    </div>
                    <div className="mt-2 text-theme-sm text-gray-700">
                        Utilisez le bouton en haut pour replier la sidebar.
                    </div>
                </div>
            )}
        </aside>
    );
}
