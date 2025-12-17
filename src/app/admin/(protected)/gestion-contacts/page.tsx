import { createClient } from "@/lib/supabase/server";
import { GestionContactsClient } from "@/components/admin/GestionContactsClient";

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

// Stats Card Component
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

export default async function GestionContactsPage({
  searchParams,
}: {
  searchParams?: { societe?: string | string[] } | Promise<{ societe?: string | string[] }>;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("leads_contacts")
    .select("id, type, nom, prenom, email, telephone, societe, statut, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const resolvedSearchParams = await Promise.resolve(searchParams);
  const rawSocieteParam = Array.isArray(resolvedSearchParams?.societe)
    ? resolvedSearchParams?.societe[0]
    : resolvedSearchParams?.societe;
  const initialSociete = rawSocieteParam?.trim() ?? "";

  const contacts = (data ?? []) as ContactRow[];

  // Calculate stats
  const totalContacts = contacts.length;
  const leadCount = contacts.filter((c) => c.type === "lead").length;
  const contactCount = contacts.filter((c) => c.type === "contact").length;
  const companiesCount = new Set(contacts.map((c) => c.societe).filter(Boolean)).size;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des contacts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos leads et contacts en un seul endroit
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total"
          value={totalContacts}
          color="bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600"
          icon={
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <StatCard
          label="Leads"
          value={leadCount}
          color="bg-blue-50 text-blue-600"
          icon={
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <StatCard
          label="Contacts"
          value={contactCount}
          color="bg-purple-50 text-purple-600"
          icon={
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <StatCard
          label="Entreprises"
          value={companiesCount}
          color="bg-amber-50 text-amber-600"
          icon={
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>

      {/* Main Content */}
      <GestionContactsClient contacts={contacts} initialSociete={initialSociete} />
    </section>
  );
}
