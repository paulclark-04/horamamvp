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

    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-zinc-900">Gestion contacts</h1>
                <p className="text-sm text-zinc-600">
                    {contacts.length} enregistrement{contacts.length > 1 ? "s" : ""}
                </p>
            </div>

            <GestionContactsClient contacts={contacts} initialSociete={initialSociete} />
        </section>
    );
}
