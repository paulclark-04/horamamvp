import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

type LeadInfo = {
    id: string;
    nom: string | null;
    prenom: string | null;
    societe: string | null;
    email: string | null;
    statut: string | null;
};

type InteractionRow = {
    id: string;
    type: string;
    notes: string | null;
    date: string;
    lead_id: string;
    lead: LeadInfo | LeadInfo[] | null;
};

function formatDateTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString("fr-FR");
}

function normalizeLead(lead: LeadInfo | LeadInfo[] | null): LeadInfo | null {
    if (!lead) return null;
    if (Array.isArray(lead)) return lead[0] ?? null;
    return lead;
}

function getLeadDisplayName(lead: LeadInfo | null) {
    if (!lead) return "Lead";
    const fullName = [lead.prenom, lead.nom].filter(Boolean).join(" ");
    return fullName || lead.email || "Lead";
}

export default async function BoiteDeReceptionPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("interactions")
        .select(
            "id, type, notes, date, lead_id, lead:leads_contacts(id, nom, prenom, societe, email, statut)"
        )
        .order("date", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    const interactions = (data ?? []) as InteractionRow[];

    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-zinc-900">Boîte de réception</h1>
                <p className="text-sm text-zinc-600">
                    {interactions.length} interaction{interactions.length > 1 ? "s" : ""}
                </p>
            </div>

            {interactions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-10 text-center">
                    <h2 className="text-lg font-semibold text-zinc-900">
                        Aucune interaction
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                        L’historique des échanges apparaîtra ici.
                    </p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {interactions.map((interaction) => {
                        const lead = normalizeLead(interaction.lead);
                        const leadName = getLeadDisplayName(lead);
                        const company = lead?.societe;
                        const statut = lead?.statut;

                        return (
                            <li key={interaction.id}>
                                <Link
                                    href={`/admin/qualification-leads/${interaction.lead_id}`}
                                    className="block rounded-xl border border-zinc-200 bg-white p-5 hover:bg-zinc-50 transition"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div className="space-y-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <div className="text-sm font-semibold text-zinc-900">
                                                    {leadName}
                                                </div>
                                                {company && (
                                                    <div className="text-sm text-zinc-600">
                                                        · {company}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                                                <span className="rounded-md bg-zinc-100 px-2 py-1 font-medium text-zinc-700">
                                                    {interaction.type}
                                                </span>
                                                {statut && <span>Statut: {statut}</span>}
                                            </div>
                                        </div>

                                        <div className="text-xs text-zinc-500">
                                            {formatDateTime(interaction.date)}
                                        </div>
                                    </div>

                                    {interaction.notes && (
                                        <p className="mt-3 line-clamp-2 text-sm text-zinc-700">
                                            {interaction.notes}
                                        </p>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
