import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

type LeadRow = {
    id: string;
    nom: string | null;
    prenom: string | null;
    email: string | null;
    societe: string | null;
    statut: string | null;
    created_at: string;
};

function normalizeStatutFilter(raw: string): string {
    const trimmed = raw.trim();
    const key = trimmed.toLowerCase();

    const aliases: Record<string, string> = {
        nouveau: "new",
        "contacté": "contacted",
        contacte: "contacted",
        "qualifié": "qualified",
        qualifie: "qualified",
        perdu: "lost",
    };

    return aliases[key] ?? trimmed;
}

function formatDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("fr-FR");
}

export default async function QualificationLeadsPage({
    searchParams,
}: {
    searchParams?: { statut?: string | string[] } | Promise<{ statut?: string | string[] }>;
}) {
    const supabase = await createClient();

    const resolvedSearchParams = await Promise.resolve(searchParams);
    const rawStatutParam = Array.isArray(resolvedSearchParams?.statut)
        ? resolvedSearchParams?.statut[0]
        : resolvedSearchParams?.statut;

    const rawStatut = rawStatutParam?.trim();
    const statutNormalized = rawStatut ? normalizeStatutFilter(rawStatut) : undefined;
    const statutFilter =
        statutNormalized && statutNormalized.toLowerCase() !== "all"
            ? statutNormalized
            : undefined;

    let query = supabase
        .from("leads_contacts")
        .select("id, nom, prenom, email, societe, statut, created_at")
        .eq("type", "lead")
        .order("created_at", { ascending: false });

    if (statutFilter) {
        query = query.eq("statut", statutFilter);
    }

    const { data, error } = await query;
    if (error) {
        throw new Error(error.message);
    }

    const leads = (data ?? []) as LeadRow[];

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-zinc-900">Qualification leads</h1>
                    <p className="text-sm text-zinc-600">
                        {leads.length} lead{leads.length > 1 ? "s" : ""}
                        {statutFilter ? ` · Filtré: ${statutFilter}` : ""}
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    {statutFilter && (
                        <Link
                            href="/admin/qualification-leads"
                            className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
                        >
                            Effacer le filtre
                        </Link>
                    )}

                    <form method="get" className="flex items-center gap-2">
                        <label htmlFor="statut" className="text-sm text-zinc-700">
                            Statut
                        </label>
                        <select
                            id="statut"
                            name="statut"
                            defaultValue={statutFilter ?? "all"}
                            className="h-10 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                        >
                            <option value="all">Tous</option>
                            <option value="new">Nouveau</option>
                            <option value="contacted">Contacté</option>
                            <option value="qualified">Qualifié</option>
                            <option value="lost">Perdu</option>
                        </select>
                        <button
                            type="submit"
                            className="h-10 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 transition"
                        >
                            Filtrer
                        </button>
                    </form>
                </div>
            </div>

            {leads.length === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-10 text-center">
                    <h2 className="text-lg font-semibold text-zinc-900">Aucun lead</h2>
                    <p className="mt-2 text-sm text-zinc-600">
                        {statutFilter
                            ? "Aucun lead ne correspond à ce filtre."
                            : "Les leads créés via le formulaire public apparaîtront ici."}
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                            <tr>
                                <th className="px-4 py-3">Nom</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Société</th>
                                <th className="px-4 py-3">Statut</th>
                                <th className="px-4 py-3">Créé le</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {leads.map((lead) => {
                                const fullName = [lead.prenom, lead.nom].filter(Boolean).join(" ");
                                return (
                                    <tr key={lead.id} className="hover:bg-zinc-50">
                                        <td className="px-4 py-3 font-medium text-zinc-900">
                                            <Link
                                                href={`/admin/qualification-leads/${lead.id}`}
                                                className="hover:underline"
                                            >
                                                {fullName || "—"}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {lead.email || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {lead.societe || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {lead.statut || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {formatDate(lead.created_at)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
