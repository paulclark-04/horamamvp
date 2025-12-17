"use client";

import { useMemo, useState } from "react";
import { CandidatureCvSignedUrlButton } from "@/components/admin/CandidatureCvSignedUrlButton";

// ============================================================================
// TYPES
// ============================================================================

type OffreEmploi = {
  id: string;
  titre: string;
  description: string | null;
  statut: string;
  created_at: string;
  updated_at: string;
};

type Candidature = {
  id: string;
  nom: string;
  prenom: string | null;
  email: string;
  cv_url: string | null;
  offre_id: string | null;
  statut: string;
  created_at: string;
};

type TabType = "offres" | "candidatures";

// ============================================================================
// ICONS
// ============================================================================

const BriefcaseIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UsersIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const FileIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

function getOffreStatusConfig(statut: string) {
  switch (statut) {
    case "published":
      return { label: "Publiée", color: "text-green-700", bgColor: "bg-green-50", borderColor: "border-green-200" };
    case "draft":
      return { label: "Brouillon", color: "text-gray-700", bgColor: "bg-gray-50", borderColor: "border-gray-200" };
    case "archived":
      return { label: "Archivée", color: "text-red-700", bgColor: "bg-red-50", borderColor: "border-red-200" };
    default:
      return { label: statut, color: "text-gray-700", bgColor: "bg-gray-50", borderColor: "border-gray-200" };
  }
}

function getCandidatureStatusConfig(statut: string) {
  switch (statut) {
    case "new":
      return { label: "Nouvelle", color: "text-blue-700", bgColor: "bg-blue-50", dotColor: "bg-blue-500" };
    case "reviewing":
      return { label: "En cours", color: "text-amber-700", bgColor: "bg-amber-50", dotColor: "bg-amber-500" };
    case "hired":
      return { label: "Acceptée", color: "text-green-700", bgColor: "bg-green-50", dotColor: "bg-green-500" };
    case "rejected":
      return { label: "Refusée", color: "text-red-700", bgColor: "bg-red-50", dotColor: "bg-red-500" };
    default:
      return { label: statut, color: "text-gray-700", bgColor: "bg-gray-50", dotColor: "bg-gray-500" };
  }
}

function normalizeString(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getInitials(nom: string, prenom: string | null) {
  const first = prenom?.charAt(0) || "";
  const last = nom?.charAt(0) || "";
  return (first + last).toUpperCase() || "?";
}

// ============================================================================
// COMPONENTS
// ============================================================================

function TabButton({
  label,
  icon,
  count,
  isActive,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-medium transition-all ${
        isActive
          ? "bg-white text-gray-900 shadow-md"
          : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
      }`}
    >
      {icon}
      <span>{label}</span>
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          isActive ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function OffreCard({
  offre,
  candidatureCount,
}: {
  offre: OffreEmploi;
  candidatureCount: number;
}) {
  const statusConfig = getOffreStatusConfig(offre.statut);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{offre.titre}</h3>
          <p className="mt-1 text-sm text-gray-500">Créée le {formatDate(offre.created_at)}</p>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor}`}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Description */}
      {offre.description && (
        <p className="mt-4 line-clamp-2 text-sm text-gray-600">{offre.description}</p>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <UsersIcon />
          <span>
            {candidatureCount} candidature{candidatureCount > 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

function CandidatureCard({
  candidature,
  offreTitre,
}: {
  candidature: Candidature;
  offreTitre: string | null;
}) {
  const statusConfig = getCandidatureStatusConfig(candidature.statut);
  const fullName = [candidature.prenom, candidature.nom].filter(Boolean).join(" ");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white shadow-md">
          {getInitials(candidature.nom, candidature.prenom)}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900">{fullName}</h3>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotColor}`} />
              {statusConfig.label}
            </span>
          </div>
          {offreTitre && (
            <p className="mt-0.5 truncate text-sm text-gray-500">
              Candidature pour : {offreTitre}
            </p>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className="mt-4 space-y-2">
        <a
          href={`mailto:${candidature.email}`}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
        >
          <MailIcon />
          <span className="truncate">{candidature.email}</span>
        </a>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs text-gray-400">{formatDate(candidature.created_at)}</span>
        {candidature.cv_url ? (
          <CandidatureCvSignedUrlButton candidatureId={candidature.id} />
        ) : (
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <FileIcon />
            CV non fourni
          </span>
        )}
      </div>
    </div>
  );
}

function StatusFilterButton({
  label,
  count,
  isActive,
  onClick,
  config,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  config: { color: string; bgColor: string };
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-medium transition-all ${
        isActive
          ? `${config.bgColor} ${config.color} border-current`
          : "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <span>{label}</span>
      <span className={`rounded-full px-1.5 py-0.5 text-xs ${isActive ? "bg-white/60" : "bg-gray-200"}`}>
        {count}
      </span>
    </button>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function RecrutementClient({
  offres,
  candidatures,
}: {
  offres: OffreEmploi[];
  candidatures: Candidature[];
}) {
  const [activeTab, setActiveTab] = useState<TabType>("candidatures");
  const [searchQuery, setSearchQuery] = useState("");
  const [offreFilter, setOffreFilter] = useState<string>("all");
  const [candidatureStatusFilter, setCandidatureStatusFilter] = useState<string>("all");

  // Create a map of offre titles by ID
  const offreTitlesMap = useMemo(() => {
    const map = new Map<string, string>();
    offres.forEach((o) => map.set(o.id, o.titre));
    return map;
  }, [offres]);

  // Count candidatures per offre
  const candidaturesPerOffre = useMemo(() => {
    const counts = new Map<string, number>();
    candidatures.forEach((c) => {
      if (c.offre_id) {
        counts.set(c.offre_id, (counts.get(c.offre_id) || 0) + 1);
      }
    });
    return counts;
  }, [candidatures]);

  // Count candidatures by status
  const candidatureStatusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: candidatures.length };
    candidatures.forEach((c) => {
      counts[c.statut] = (counts[c.statut] || 0) + 1;
    });
    return counts;
  }, [candidatures]);

  // Filter offres
  const filteredOffres = useMemo(() => {
    const query = normalizeString(searchQuery);
    return offres.filter((offre) => {
      if (offreFilter !== "all" && offre.statut !== offreFilter) return false;
      if (!query) return true;
      const haystack = normalizeString([offre.titre, offre.description].filter(Boolean).join(" "));
      return haystack.includes(query);
    });
  }, [offres, searchQuery, offreFilter]);

  // Filter candidatures
  const filteredCandidatures = useMemo(() => {
    const query = normalizeString(searchQuery);
    return candidatures.filter((c) => {
      if (candidatureStatusFilter !== "all" && c.statut !== candidatureStatusFilter) return false;
      if (!query) return true;
      const offreTitre = c.offre_id ? offreTitlesMap.get(c.offre_id) : "";
      const haystack = normalizeString([c.nom, c.prenom, c.email, offreTitre].filter(Boolean).join(" "));
      return haystack.includes(query);
    });
  }, [candidatures, searchQuery, candidatureStatusFilter, offreTitlesMap]);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="rounded-2xl bg-gray-100 p-2">
        <div className="flex gap-2">
          <TabButton
            label="Candidatures"
            icon={<UsersIcon />}
            count={candidatures.length}
            isActive={activeTab === "candidatures"}
            onClick={() => setActiveTab("candidatures")}
          />
          <TabButton
            label="Offres d'emploi"
            icon={<BriefcaseIcon />}
            count={offres.length}
            isActive={activeTab === "offres"}
            onClick={() => setActiveTab("offres")}
          />
        </div>
      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        {/* Search */}
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === "candidatures"
                ? "Rechercher une candidature..."
                : "Rechercher une offre..."
            }
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <XIcon />
            </button>
          )}
        </div>

        {/* Status Filters */}
        {activeTab === "candidatures" && (
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusFilterButton
              label="Toutes"
              count={candidatureStatusCounts.all || 0}
              isActive={candidatureStatusFilter === "all"}
              onClick={() => setCandidatureStatusFilter("all")}
              config={{ color: "text-gray-700", bgColor: "bg-gray-100" }}
            />
            <StatusFilterButton
              label="Nouvelles"
              count={candidatureStatusCounts.new || 0}
              isActive={candidatureStatusFilter === "new"}
              onClick={() => setCandidatureStatusFilter("new")}
              config={{ color: "text-blue-700", bgColor: "bg-blue-50" }}
            />
            <StatusFilterButton
              label="En cours"
              count={candidatureStatusCounts.reviewing || 0}
              isActive={candidatureStatusFilter === "reviewing"}
              onClick={() => setCandidatureStatusFilter("reviewing")}
              config={{ color: "text-amber-700", bgColor: "bg-amber-50" }}
            />
            <StatusFilterButton
              label="Acceptées"
              count={candidatureStatusCounts.hired || 0}
              isActive={candidatureStatusFilter === "hired"}
              onClick={() => setCandidatureStatusFilter("hired")}
              config={{ color: "text-green-700", bgColor: "bg-green-50" }}
            />
            <StatusFilterButton
              label="Refusées"
              count={candidatureStatusCounts.rejected || 0}
              isActive={candidatureStatusFilter === "rejected"}
              onClick={() => setCandidatureStatusFilter("rejected")}
              config={{ color: "text-red-700", bgColor: "bg-red-50" }}
            />
          </div>
        )}

        {activeTab === "offres" && (
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusFilterButton
              label="Toutes"
              count={offres.length}
              isActive={offreFilter === "all"}
              onClick={() => setOffreFilter("all")}
              config={{ color: "text-gray-700", bgColor: "bg-gray-100" }}
            />
            <StatusFilterButton
              label="Publiées"
              count={offres.filter((o) => o.statut === "published").length}
              isActive={offreFilter === "published"}
              onClick={() => setOffreFilter("published")}
              config={{ color: "text-green-700", bgColor: "bg-green-50" }}
            />
            <StatusFilterButton
              label="Brouillons"
              count={offres.filter((o) => o.statut === "draft").length}
              isActive={offreFilter === "draft"}
              onClick={() => setOffreFilter("draft")}
              config={{ color: "text-gray-700", bgColor: "bg-gray-100" }}
            />
            <StatusFilterButton
              label="Archivées"
              count={offres.filter((o) => o.statut === "archived").length}
              isActive={offreFilter === "archived"}
              onClick={() => setOffreFilter("archived")}
              config={{ color: "text-red-700", bgColor: "bg-red-50" }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      {activeTab === "candidatures" && (
        <>
          {filteredCandidatures.length === 0 ? (
            <EmptyState
              icon={<UsersIcon />}
              title="Aucune candidature"
              description={
                searchQuery || candidatureStatusFilter !== "all"
                  ? "Aucune candidature ne correspond à vos critères."
                  : "Les candidatures apparaîtront ici."
              }
              onReset={
                searchQuery || candidatureStatusFilter !== "all"
                  ? () => {
                      setSearchQuery("");
                      setCandidatureStatusFilter("all");
                    }
                  : undefined
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCandidatures.map((candidature) => (
                <CandidatureCard
                  key={candidature.id}
                  candidature={candidature}
                  offreTitre={candidature.offre_id ? offreTitlesMap.get(candidature.offre_id) || null : null}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "offres" && (
        <>
          {filteredOffres.length === 0 ? (
            <EmptyState
              icon={<BriefcaseIcon />}
              title="Aucune offre"
              description={
                searchQuery || offreFilter !== "all"
                  ? "Aucune offre ne correspond à vos critères."
                  : "Les offres d'emploi apparaîtront ici."
              }
              onReset={
                searchQuery || offreFilter !== "all"
                  ? () => {
                      setSearchQuery("");
                      setOffreFilter("all");
                    }
                  : undefined
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredOffres.map((offre) => (
                <OffreCard
                  key={offre.id}
                  offre={offre}
                  candidatureCount={candidaturesPerOffre.get(offre.id) || 0}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  onReset,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onReset?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        {icon}
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}
