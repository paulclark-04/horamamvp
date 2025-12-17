"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";

// ============================================================================
// TYPES
// ============================================================================

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

// ============================================================================
// ICONS
// ============================================================================

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m6 18h4a2 2 0 002-2v-5m0-4V5a2 2 0 00-2-2h-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 7h6M9 11h6M9 15h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const LeadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ContactsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocumentsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M22 12h-6l-2 3H10l-2-3H2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const HelpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const RecruitmentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M19 8v6M22 11h-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================================
// NAVIGATION DATA
// ============================================================================

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Principal",
    items: [
      {
        href: "/admin/dashboard",
        label: "Dashboard",
        icon: <DashboardIcon />,
      },
      {
        href: "/admin/qualification-leads",
        label: "Qualification leads",
        icon: <LeadsIcon />,
      },
      {
        href: "/admin/boite-de-reception",
        label: "Boîte de réception",
        icon: <InboxIcon />,
      },
    ],
  },
  {
    title: "Gestion",
    items: [
      {
        href: "/admin/gestion-contacts",
        label: "Contacts",
        icon: <ContactsIcon />,
      },
      {
        href: "/admin/recrutement",
        label: "Recrutement",
        icon: <RecruitmentIcon />,
      },
      {
        href: "/admin/gestion-documents",
        label: "Documents",
        icon: <DocumentsIcon />,
      },
    ],
  },
];

const BOTTOM_ITEMS: NavItem[] = [
  {
    href: "/admin/settings",
    label: "Paramètres",
    icon: <SettingsIcon />,
  },
  {
    href: "/admin/help",
    label: "Aide",
    icon: <HelpIcon />,
  },
];

// ============================================================================
// HELPERS
// ============================================================================

function isPathActive(pathname: string, href: string) {
  if (href === "/admin/dashboard") {
    return pathname === href || pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

// ============================================================================
// COMPONENTS
// ============================================================================

function NavItemComponent({
  item,
  isActive,
  showLabels,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  showLabels: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
        showLabels ? "justify-start" : "justify-center"
      } ${
        isActive
          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
      title={!showLabels ? item.label : undefined}
    >
      {/* Active indicator */}
      {isActive && (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-500 to-purple-500" />
      )}

      {/* Icon */}
      <span
        className={`flex-shrink-0 transition-colors ${
          isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
        }`}
      >
        {item.icon}
      </span>

      {/* Label */}
      {showLabels && (
        <span className={`truncate text-sm font-medium ${isActive ? "text-blue-600" : ""}`}>
          {item.label}
        </span>
      )}

      {/* Badge */}
      {item.badge && item.badge > 0 && (
        <span
          className={`flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-1.5 text-xs font-semibold text-white ${
            showLabels ? "ml-auto" : "absolute -right-1 -top-1"
          }`}
        >
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      )}

      {/* Tooltip for collapsed state */}
      {!showLabels && (
        <span className="pointer-events-none absolute left-full ml-2 hidden rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
          {item.label}
          {item.badge && item.badge > 0 && (
            <span className="ml-2 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
              {item.badge}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}

function SectionTitle({ title, showLabels }: { title: string; showLabels: boolean }) {
  if (!showLabels) {
    return <div className="my-2 h-px bg-gray-200" />;
  }

  return (
    <div className="mb-2 mt-6 flex items-center gap-2 px-3 first:mt-0">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </span>
      <span className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

function UserSection({ showLabels }: { showLabels: boolean }) {
  if (!showLabels) {
    return (
      <div className="flex justify-center py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">
          A
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white shadow-md">
        A
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-gray-900">Admin</div>
        <div className="truncate text-xs text-gray-500">admin@horama.ai</div>
      </div>
      <button
        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
        title="Options"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <circle cx="12" cy="5" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="12" cy="19" r="1" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

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
  const widthClass = showLabels ? "w-[280px]" : "w-[80px]";
  const translateClass = isMobileOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <aside
      className={`fixed left-0 top-0 z-99999 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out lg:translate-x-0 ${widthClass} ${translateClass}`}
      onMouseEnter={() => {
        if (!isExpanded) setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section */}
      <div className={`flex items-center border-b border-gray-100 px-4 py-4 ${showLabels ? "gap-3" : "justify-center"}`}>
        <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
          <Image
            src="/images/horama_logo_trimmed.png"
            alt="Horama"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        {showLabels && (
          <div className="min-w-0">
            <div className="truncate text-lg font-bold text-gray-900">Horama</div>
            <div className="truncate text-xs font-medium text-gray-500">Administration</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <SectionTitle title={section.title} showLabels={showLabels} />
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavItemComponent
                  key={item.href}
                  item={item}
                  isActive={isPathActive(pathname, item.href)}
                  showLabels={showLabels}
                  onClick={closeMobileSidebar}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-100 px-3 py-4">
        {/* Bottom Nav Items */}
        <div className="mb-4 space-y-1">
          {BOTTOM_ITEMS.map((item) => (
            <NavItemComponent
              key={item.href}
              item={item}
              isActive={isPathActive(pathname, item.href)}
              showLabels={showLabels}
              onClick={closeMobileSidebar}
            />
          ))}
        </div>

        {/* User Section */}
        <UserSection showLabels={showLabels} />
      </div>
    </aside>
  );
}
