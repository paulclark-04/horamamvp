import { createClient } from "@/lib/supabase/server";
import { LeadsFilters } from "@/components/admin/LeadsFilters";

type LeadRow = {
  id: string;
  nom: string | null;
  prenom: string | null;
  email: string | null;
  societe: string | null;
  statut: string | null;
  created_at: string;
};

export default async function QualificationLeadsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("leads_contacts")
    .select("id, nom, prenom, email, societe, statut, created_at")
    .eq("type", "lead")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const leads = (data ?? []) as LeadRow[];

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Qualification leads</h1>
        <p className="text-sm text-gray-500">
          Gérez et qualifiez vos prospects
        </p>
      </div>

      <LeadsFilters leads={leads} />
    </section>
  );
}
