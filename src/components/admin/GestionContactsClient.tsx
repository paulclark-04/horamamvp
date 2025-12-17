"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// ============================================================================
// TYPES
// ============================================================================

type ContactRow = {
  id: string;
  type: string;
  nom: string | null;
  prenom: string | null;
  email: string | null;
  telephone: string | null;
  societe: string | null;
  statut: string | null;
  created_at: string;
};

// ============================================================================
// ICONS
// ============================================================================

const SearchIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const XIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UsersIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================================
// HELPERS
// ============================================================================

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getInitials(nom: string | null, prenom: string | null) {
  const first = prenom?.charAt(0) || "";
  const last = nom?.charAt(0) || "";
  return (first + last).toUpperCase() || "?";
}

function normalizeCompany(value: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeString(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getTypeConfig(type: string) {
  switch (type) {
    case "lead":
      return {
        label: "Lead",
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        icon: <StarIcon />,
      };
    case "contact":
      return {
        label: "Contact",
        color: "text-purple-700",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        icon: <UsersIcon />,
      };
    default:
      return {
        label: type,
        color: "text-gray-700",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        icon: <UserIcon />,
      };
  }
}

function getStatusConfig(status: string | null) {
  switch (status?.toLowerCase()) {
    case "new":
      return { label: "Nouveau", color: "text-blue-600", bgColor: "bg-blue-100" };
    case "contacted":
      return { label: "Contacté", color: "text-amber-600", bgColor: "bg-amber-100" };
    case "qualified":
      return { label: "Qualifié", color: "text-green-600", bgColor: "bg-green-100" };
    case "lost":
      return { label: "Perdu", color: "text-red-600", bgColor: "bg-red-100" };
    default:
      return null;
  }
}

// ============================================================================
// COMPONENTS
// ============================================================================

function ContactCard({ contact }: { contact: ContactRow }) {
  const typeConfig = getTypeConfig(contact.type);
  const statusConfig = getStatusConfig(contact.statut);
  const fullName = [contact.prenom, contact.nom].filter(Boolean).join(" ") || "Sans nom";

  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50">
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white shadow-md">
          {getInitials(contact.nom, contact.prenom)}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-semibold text-gray-900">{fullName}</h3>
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${typeConfig.bgColor} ${typeConfig.color} ${typeConfig.borderColor}`}
            >
              {typeConfig.icon}
              {typeConfig.label}
            </span>
          </div>

          {contact.societe && (
            <p className="mt-0.5 truncate text-sm text-gray-500">{contact.societe}</p>
          )}
        </div>
      </div>

      {/* Contact Details */}
      <div className="mt-4 space-y-2">
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
          >
            <MailIcon />
            <span className="truncate">{contact.email}</span>
          </a>
        )}
        {contact.telephone && (
          <a
            href={`tel:${contact.telephone}`}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
          >
            <PhoneIcon />
            <span>{contact.telephone}</span>
          </a>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs text-gray-400">{formatDate(contact.created_at)}</span>
        {statusConfig && (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
          >
            {statusConfig.label}
          </span>
        )}
      </div>
    </div>
  );
}

function CompanyCard({
  company,
  count,
  isActive,
  onClick,
}: {
  company: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
        isActive
          ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
          : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            isActive ? "bg-blue-500 text-white" : "bg-white text-gray-400 shadow-sm"
          }`}
        >
          <BuildingIcon />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`truncate font-medium ${isActive ? "text-blue-900" : "text-gray-900"}`}>
            {company}
          </p>
          <p className={`text-sm ${isActive ? "text-blue-600" : "text-gray-500"}`}>
            {count} contact{count > 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </button>
  );
}

function TypeFilterButton({
  type,
  count,
  isActive,
  onClick,
}: {
  type: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const config = type === "all"
    ? { label: "Tous", color: "text-gray-700", bgColor: "bg-gray-100", borderColor: "border-gray-300" }
    : getTypeConfig(type);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
        isActive
          ? `${config.bgColor} ${config.color} ${config.borderColor}`
          : "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <span>{config.label}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs ${
          isActive ? "bg-white/60" : "bg-gray-200"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function GestionContactsClient({
  contacts,
  initialSociete,
}: {
  contacts: ContactRow[];
  initialSociete?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const selectedSociete = (searchParams.get("societe") ?? initialSociete ?? "").trim();

  // Count by type
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: contacts.length };
    contacts.forEach((c) => {
      counts[c.type] = (counts[c.type] || 0) + 1;
    });
    return counts;
  }, [contacts]);

  // Available types
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    contacts.forEach((c) => {
      if (c.type) types.add(c.type);
    });
    return ["all", ...Array.from(types).sort()];
  }, [contacts]);

  // Companies with counts
  const entrepriseCounts = useMemo(() => {
    const counts = new Map<string, number>();
    const base = typeFilter === "all" ? contacts : contacts.filter((c) => c.type === typeFilter);
    base.forEach((c) => {
      const company = normalizeCompany(c.societe);
      if (!company) return;
      counts.set(company, (counts.get(company) ?? 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([societe, count]) => ({ societe, count }))
      .sort((a, b) => b.count - a.count || a.societe.localeCompare(b.societe));
  }, [contacts, typeFilter]);

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    const q = normalizeString(query);
    return contacts.filter((c) => {
      if (typeFilter !== "all" && c.type !== typeFilter) return false;

      const company = normalizeCompany(c.societe);
      if (selectedSociete && company !== selectedSociete) return false;

      if (!q) return true;

      const haystack = normalizeString(
        [c.nom, c.prenom, c.email, c.societe].filter(Boolean).join(" ")
      );

      return haystack.includes(q);
    });
  }, [contacts, query, selectedSociete, typeFilter]);

  const setSocieteParam = (societe: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (!societe) {
      next.delete("societe");
    } else {
      next.set("societe", societe);
    }
    const queryString = next.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const hasActiveFilters = query.trim() !== "" || selectedSociete !== "" || typeFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Search & Type Filters */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        {/* Search Bar */}
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par nom, email ou société..."
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <XIcon />
            </button>
          )}
        </div>

        {/* Type Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {availableTypes.map((type) => (
            <TypeFilterButton
              key={type}
              type={type}
              count={typeCounts[type] || 0}
              isActive={typeFilter === type}
              onClick={() => setTypeFilter(type)}
            />
          ))}
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredContacts.length}</span>{" "}
              contact{filteredContacts.length > 1 ? "s" : ""} trouvé
              {filteredContacts.length > 1 ? "s" : ""}
            </p>
            <button
              onClick={() => {
                setQuery("");
                setTypeFilter("all");
                setSocieteParam(null);
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar - Companies */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Entreprises</h2>
              {selectedSociete && (
                <button
                  onClick={() => setSocieteParam(null)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  Effacer
                </button>
              )}
            </div>

            {entrepriseCounts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center">
                <BuildingIcon />
                <p className="mt-2 text-sm text-gray-500">Aucune société</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {entrepriseCounts.map((row) => (
                  <CompanyCard
                    key={row.societe}
                    company={row.societe}
                    count={row.count}
                    isActive={selectedSociete === row.societe}
                    onClick={() => setSocieteParam(selectedSociete === row.societe ? null : row.societe)}
                  />
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Contacts Grid */}
        <div className="lg:col-span-3">
          {filteredContacts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <UserIcon />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900">Aucun contact trouvé</h2>
              <p className="mt-2 text-sm text-gray-500">
                {hasActiveFilters
                  ? "Essayez de modifier vos filtres pour voir plus de résultats."
                  : "Les contacts apparaîtront ici."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setQuery("");
                    setTypeFilter("all");
                    setSocieteParam(null);
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                >
                  Voir tous les contacts
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredContacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
