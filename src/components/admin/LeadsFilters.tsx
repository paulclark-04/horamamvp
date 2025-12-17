"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { AdminTable } from "@/components/admin/AdminTable";

// ============================================================================
// TYPES
// ============================================================================

type LeadRow = {
  id: string;
  nom: string | null;
  prenom: string | null;
  email: string | null;
  societe: string | null;
  statut: string | null;
  created_at: string;
};

type StatusOption = {
  value: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
};

// ============================================================================
// CONSTANTS
// ============================================================================

const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "all",
    label: "Tous",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-300",
  },
  {
    value: "new",
    label: "Nouveau",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
  },
  {
    value: "contacted",
    label: "Contacté",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-500",
  },
  {
    value: "qualified",
    label: "Qualifié",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
  },
  {
    value: "lost",
    label: "Perdu",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-500",
  },
];

// ============================================================================
// HELPERS
// ============================================================================

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("fr-FR");
}

function getLeadFullName(lead: LeadRow) {
  return [lead.prenom, lead.nom].filter(Boolean).join(" ") || "—";
}

function normalizeString(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// ============================================================================
// ICONS
// ============================================================================

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5 3.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM1.75 8.5a6.75 6.75 0 1 1 12.1 4.154l3.023 3.023a.75.75 0 1 1-1.06 1.06l-3.024-3.023A6.75 6.75 0 0 1 1.75 8.5Z"
      fill="currentColor"
    />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LeadsFilters({ leads }: { leads: LeadRow[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Count leads by status
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: leads.length };
    for (const lead of leads) {
      const status = lead.statut?.toLowerCase() || "unknown";
      counts[status] = (counts[status] || 0) + 1;
    }
    return counts;
  }, [leads]);

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Filter by status
      if (selectedStatus !== "all") {
        const leadStatus = lead.statut?.toLowerCase() || "";
        if (leadStatus !== selectedStatus) return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = normalizeString(searchQuery);
        const searchFields = [
          lead.nom || "",
          lead.prenom || "",
          lead.email || "",
          lead.societe || "",
        ];
        const matchesSearch = searchFields.some((field) =>
          normalizeString(field).includes(query)
        );
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [leads, selectedStatus, searchQuery]);

  const hasActiveFilters = selectedStatus !== "all" || searchQuery.trim() !== "";

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {/* Search */}
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, email ou société..."
            className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-12 pr-10 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <XIcon />
            </button>
          )}
        </div>

        {/* Status Filter Buttons */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
            Filtrer par statut
          </p>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((option) => {
              const isSelected = selectedStatus === option.value;
              const count = statusCounts[option.value] || 0;

              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedStatus(option.value)}
                  className={`inline-flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                    isSelected
                      ? `${option.bgColor} ${option.color} ${option.borderColor}`
                      : "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>{option.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isSelected
                        ? "bg-white/50"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredLeads.length}</span>{" "}
              lead{filteredLeads.length > 1 ? "s" : ""} trouvé{filteredLeads.length > 1 ? "s" : ""}
              {selectedStatus !== "all" && (
                <span className="ml-1">
                  avec statut{" "}
                  <span className="font-medium">
                    {STATUS_OPTIONS.find((o) => o.value === selectedStatus)?.label}
                  </span>
                </span>
              )}
              {searchQuery && (
                <span className="ml-1">
                  correspondant à{" "}
                  <span className="font-medium">&quot;{searchQuery}&quot;</span>
                </span>
              )}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStatus("all");
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {filteredLeads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <SearchIcon />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Aucun lead trouvé</h2>
          <p className="mt-2 text-sm text-gray-500">
            {hasActiveFilters
              ? "Essayez de modifier vos filtres pour voir plus de résultats."
              : "Les leads créés via le formulaire public apparaîtront ici."}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStatus("all");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
            >
              Voir tous les leads
            </button>
          )}
        </div>
      ) : (
        <AdminTable>
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-500">
                Nom
              </th>
              <th className="px-5 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-500">
                Email
              </th>
              <th className="px-5 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-500">
                Société
              </th>
              <th className="px-5 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-500">
                Statut
              </th>
              <th className="px-5 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-start">
                  <Link
                    href={`/admin/qualification-leads/${lead.id}`}
                    className="block font-medium text-gray-900 text-sm hover:text-blue-600 hover:underline"
                  >
                    {getLeadFullName(lead)}
                  </Link>
                </td>
                <td className="px-5 py-4 text-start text-sm text-gray-500">
                  {lead.email || "—"}
                </td>
                <td className="px-5 py-4 text-start text-sm text-gray-500">
                  {lead.societe || "—"}
                </td>
                <td className="px-5 py-4 text-start">
                  <LeadStatusBadge status={lead.statut} />
                </td>
                <td className="px-5 py-4 text-start text-sm text-gray-500">
                  {formatDate(lead.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
    </div>
  );
}
