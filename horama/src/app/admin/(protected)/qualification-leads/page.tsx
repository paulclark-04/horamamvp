import Link from "next/link";

import { AdminTable } from "@/components/admin/AdminTable";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
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
    searchParams?:
        | { statut?: string | string[]; q?: string | string[] }
        | Promise<{ statut?: string | string[]; q?: string | string[] }>;
}) {
    const supabase = await createClient();

    const resolvedSearchParams = await Promise.resolve(searchParams);
    const rawStatutParam = Array.isArray(resolvedSearchParams?.statut)
        ? resolvedSearchParams?.statut[0]
        : resolvedSearchParams?.statut;
    const rawQueryParam = Array.isArray(resolvedSearchParams?.q)
        ? resolvedSearchParams?.q[0]
        : resolvedSearchParams?.q;

    const rawStatut = rawStatutParam?.trim();
    const rawQuery = rawQueryParam?.trim();
    const statutNormalized = rawStatut ? normalizeStatutFilter(rawStatut) : undefined;
    const statutFilter =
        statutNormalized && statutNormalized.toLowerCase() !== "all"
            ? statutNormalized
            : undefined;
    const searchQuery = rawQuery?.replace(/[,]/g, " ").trim() || undefined;

    let query = supabase
        .from("leads_contacts")
        .select("id, nom, prenom, email, societe, statut, created_at")
        .eq("type", "lead")
        .order("created_at", { ascending: false });

    if (statutFilter) {
        query = query.eq("statut", statutFilter);
    }

    if (searchQuery) {
        const pattern = `%${searchQuery}%`;
        query = query.or(
            `nom.ilike.${pattern},prenom.ilike.${pattern},email.ilike.${pattern},societe.ilike.${pattern}`
        );
    }

    const { data, error } = await query;
    if (error) {
        throw new Error(error.message);
    }

    const leads = (data ?? []) as LeadRow[];

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-1">
                    <h1 className="text-title-md font-bold text-gray-800">Qualification leads</h1>
                    <p className="text-theme-sm text-gray-500">
                        {leads.length} lead{leads.length > 1 ? "s" : ""}
                        {statutFilter ? ` · Statut: ${statutFilter}` : ""}
                        {searchQuery ? ` · Recherche: ${searchQuery}` : ""}
                    </p>
                </div>

                <form
                    method="get"
                    className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end"
                >
                    <div className="relative w-full sm:max-w-[280px] lg:max-w-[340px]">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.5 3.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM1.75 8.5a6.75 6.75 0 1 1 12.1 4.154l3.023 3.023a.75.75 0 1 1-1.06 1.06l-3.024-3.023A6.75 6.75 0 0 1 1.75 8.5Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            name="q"
                            defaultValue={searchQuery ?? ""}
                            placeholder="Rechercher (nom, email, société)…"
                            className="h-11 w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-12 pr-4 text-theme-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="statut" className="text-theme-sm font-medium text-gray-700">
                            Statut
                        </label>
                        <select
                            id="statut"
                            name="statut"
                            defaultValue={statutFilter ?? "all"}
                            className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-theme-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                        >
                            <option value="all">Tous</option>
                            <option value="new">Nouveau</option>
                            <option value="contacted">Contacté</option>
                            <option value="qualified">Qualifié</option>
                            <option value="lost">Perdu</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-4 text-theme-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600"
                    >
                        Filtrer
                    </button>

                    {(statutFilter || searchQuery) && (
                        <Link
                            href="/admin/qualification-leads"
                            className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-theme-sm font-medium text-gray-700 shadow-theme-xs transition hover:bg-gray-50"
                        >
                            Réinitialiser
                        </Link>
                    )}
                </form>
            </div>

            {leads.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
                    <h2 className="text-theme-xl font-semibold text-gray-800">Aucun lead</h2>
                    <p className="mt-2 text-theme-sm text-gray-500">
                        {statutFilter
                            ? "Aucun lead ne correspond à ce filtre."
                            : "Les leads créés via le formulaire public apparaîtront ici."}
                    </p>
                </div>
            ) : (
                <AdminTable>
                    <thead className="border-b border-gray-100">
                        <tr>
                            <th className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500">
                                Nom
                            </th>
                            <th className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500">
                                Email
                            </th>
                            <th className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500">
                                Société
                            </th>
                            <th className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500">
                                Statut
                            </th>
                            <th className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500">
                                Créé le
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {leads.map((lead) => {
                            const fullName = [lead.prenom, lead.nom].filter(Boolean).join(" ");
                            return (
                                <tr key={lead.id} className="hover:bg-gray-50">
                                    <td className="px-5 py-4 text-start">
                                        <Link
                                            href={`/admin/qualification-leads/${lead.id}`}
                                            className="block font-medium text-gray-800 text-theme-sm hover:underline"
                                        >
                                            {fullName || "—"}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-4 text-start text-theme-sm text-gray-500">
                                        {lead.email || "—"}
                                    </td>
                                    <td className="px-5 py-4 text-start text-theme-sm text-gray-500">
                                        {lead.societe || "—"}
                                    </td>
                                    <td className="px-5 py-4 text-start text-theme-sm text-gray-500">
                                        <LeadStatusBadge status={lead.statut} />
                                    </td>
                                    <td className="px-5 py-4 text-start text-theme-sm text-gray-500">
                                        {formatDate(lead.created_at)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </AdminTable>
            )}
        </section>
    );
}
