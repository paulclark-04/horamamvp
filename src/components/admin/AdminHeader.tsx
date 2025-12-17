"use client";

import { usePathname } from "next/navigation";

import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";
import { LogoutButton } from "@/components/admin/LogoutButton";

// ============================================================================
// HELPERS
// ============================================================================

function getAdminPageTitle(pathname: string) {
  if (pathname.startsWith("/admin/boite-de-reception")) return "Boîte de réception";
  if (pathname.startsWith("/admin/dashboard")) return "Dashboard";
  if (pathname.startsWith("/admin/qualification-leads")) return "Qualification leads";
  if (pathname.startsWith("/admin/gestion-contacts")) return "Gestion contacts";
  if (pathname.startsWith("/admin/recrutement")) return "Recrutement";
  if (pathname.startsWith("/admin/gestion-documents")) return "Gestion documents";
  if (pathname.startsWith("/admin/settings")) return "Paramètres";
  if (pathname.startsWith("/admin/help")) return "Aide";
  return "Admin";
}

function getPageDescription(pathname: string) {
  if (pathname.startsWith("/admin/boite-de-reception")) return "Messages et notifications";
  if (pathname.startsWith("/admin/dashboard")) return "Vue d'ensemble de votre activité";
  if (pathname.startsWith("/admin/qualification-leads")) return "Gérez vos prospects";
  if (pathname.startsWith("/admin/gestion-contacts")) return "Annuaire des contacts";
  if (pathname.startsWith("/admin/recrutement")) return "Offres d'emploi et candidatures";
  if (pathname.startsWith("/admin/gestion-documents")) return "Fichiers et documents";
  if (pathname.startsWith("/admin/settings")) return "Configuration du compte";
  if (pathname.startsWith("/admin/help")) return "Centre d'aide";
  return "Administration Horama";
}

// ============================================================================
// ICONS
// ============================================================================

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 6h16M4 12h16M4 18h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);


// ============================================================================
// COMPONENTS
// ============================================================================

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AdminHeader() {
  const pathname = usePathname();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useAdminSidebar();

  const title = getAdminPageTitle(pathname);
  const description = getPageDescription(pathname);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 z-9999 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-6">
        {/* Left Section */}
        <div className="flex min-w-0 items-center gap-4">
          {/* Toggle Button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            onClick={handleToggle}
            aria-label="Toggle sidebar"
          >
            {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Page Title */}
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-gray-900">{title}</h1>
            <p className="hidden truncate text-sm text-gray-500 sm:block">{description}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Logout */}
          <LogoutButton
            className="hidden h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 text-sm font-medium text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 sm:flex"
            label="Déconnexion"
          />

          {/* Mobile Logout Icon */}
          <LogoutButton
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 sm:hidden"
            label=""
          />
        </div>
      </div>
    </header>
  );
}
