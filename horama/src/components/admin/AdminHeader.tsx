"use client";

import { usePathname } from "next/navigation";

import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";
import { LogoutButton } from "@/components/admin/LogoutButton";

function getAdminPageTitle(pathname: string) {
    if (pathname.startsWith("/admin/boite-de-reception")) return "Boîte de réception";
    if (pathname.startsWith("/admin/dashboard")) return "Dashboard";
    if (pathname.startsWith("/admin/qualification-leads")) return "Qualification leads";
    if (pathname.startsWith("/admin/gestion-contacts")) return "Gestion contacts";
    if (pathname.startsWith("/admin/gestion-documents")) return "Gestion documents";
    return "Admin";
}

export function AdminHeader() {
    const pathname = usePathname();
    const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useAdminSidebar();

    const title = getAdminPageTitle(pathname);

    const handleToggle = () => {
        if (window.innerWidth >= 1024) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };

    return (
        <header className="sticky top-0 z-99999 flex w-full border-b border-gray-200 bg-white">
            <div className="flex w-full items-center justify-between gap-4 px-3 py-3 lg:px-6 lg:py-4">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 lg:h-11 lg:w-11"
                        onClick={handleToggle}
                        aria-label="Toggle sidebar"
                    >
                        {isMobileOpen ? (
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 6L18 18M18 6L6 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        ) : (
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 6h16M4 12h16M4 18h16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        )}
                    </button>

                    <div className="min-w-0">
                        <div className="truncate text-theme-sm font-semibold text-gray-800">
                            {title}
                        </div>
                        <div className="truncate text-theme-xs text-gray-500">Horama Admin</div>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <form>
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8.5 3.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM1.75 8.5a6.75 6.75 0 1 1 12.1 4.154l3.023 3.023a.75.75 0 1 1-1.06 1.06l-3.024-3.023A6.75 6.75 0 0 1 1.75 8.5Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Rechercher…"
                                className="h-11 w-[360px] rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-theme-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-500/10 xl:w-[430px]"
                            />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-2">
                    <LogoutButton
                        className="h-10 w-auto bg-brand-500 px-4 text-white shadow-theme-xs hover:bg-brand-600"
                        label="Déconnexion"
                    />
                </div>
            </div>
        </header>
    );
}
