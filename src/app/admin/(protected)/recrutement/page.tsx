import { createClient } from "@/lib/supabase/server";
import { RecrutementClient } from "@/components/admin/RecrutementClient";

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

export default async function RecrutementPage() {
  const supabase = await createClient();

  // Fetch job offers
  const { data: offresData, error: offresError } = await supabase
    .from("offres_emploi")
    .select("id, titre, description, statut, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (offresError) {
    throw new Error(offresError.message);
  }

  // Fetch candidatures
  const { data: candidaturesData, error: candidaturesError } = await supabase
    .from("candidatures")
    .select("id, nom, prenom, email, cv_url, offre_id, statut, created_at")
    .order("created_at", { ascending: false });

  if (candidaturesError) {
    throw new Error(candidaturesError.message);
  }

  const offres = (offresData ?? []) as OffreEmploi[];
  const candidatures = (candidaturesData ?? []) as Candidature[];

  // Calculate stats
  const totalOffres = offres.length;
  const offresPubliees = offres.filter((o) => o.statut === "published").length;
  const totalCandidatures = candidatures.length;
  const nouvellesCandidatures = candidatures.filter((c) => c.statut === "new").length;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recrutement</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos offres d&apos;emploi et les candidatures reçues
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Offres totales"
          value={totalOffres}
          color="bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600"
          icon={<BriefcaseIcon />}
        />
        <StatCard
          label="Offres publiées"
          value={offresPubliees}
          color="bg-green-50 text-green-600"
          icon={<CheckCircleIcon />}
        />
        <StatCard
          label="Candidatures"
          value={totalCandidatures}
          color="bg-purple-50 text-purple-600"
          icon={<UsersIcon />}
        />
        <StatCard
          label="Nouvelles"
          value={nouvellesCandidatures}
          color="bg-amber-50 text-amber-600"
          icon={<SparklesIcon />}
        />
      </div>

      {/* Main Content */}
      <RecrutementClient offres={offres} candidatures={candidatures} />
    </section>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

// ============================================================================
// ICONS
// ============================================================================

function BriefcaseIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
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
}

function CheckCircleIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 11.08V12a10 10 0 11-5.93-9.14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 4L12 14.01l-3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
