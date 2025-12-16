import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { updateLeadStatus } from "../actions";

type Lead = {
    id: string;
    type: string;
    nom: string | null;
    prenom: string | null;
    email: string | null;
    telephone: string | null;
    societe: string | null;
    statut: string | null;
    user_id: string | null;
    created_at: string;
    updated_at: string;
};

type Interaction = {
    id: string;
    type: string;
    notes: string | null;
    date: string;
    created_at: string;
};

const STATUT_OPTIONS = [
    { value: "new", label: "Nouveau" },
    { value: "contacted", label: "Contacté" },
    { value: "qualified", label: "Qualifié" },
    { value: "lost", label: "Perdu" },
];

function formatDateTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString("fr-FR");
}

export default async function QualificationLeadDetailPage({
    params,
}: {
    params: { id: string } | Promise<{ id: string }>;
}) {
    const supabase = await createClient();

    const resolvedParams = await Promise.resolve(params);
    const leadId = resolvedParams.id;
    if (!leadId) {
        notFound();
    }

    const { data: lead, error: leadError } = await supabase
        .from("leads_contacts")
        .select(
            "id, type, nom, prenom, email, telephone, societe, statut, user_id, created_at, updated_at"
        )
        .eq("id", leadId)
        .single();

    if (leadError || !lead) {
        notFound();
    }

    const typedLead = lead as Lead;
    if (typedLead.type !== "lead") {
        notFound();
    }

    const { data: interactionsData, error: interactionsError } = await supabase
        .from("interactions")
        .select("id, type, notes, date, created_at")
        .eq("lead_id", typedLead.id)
        .order("date", { ascending: false });

    const interactions = ((interactionsData ?? []) as Interaction[]).filter(Boolean);

    const fullName = [typedLead.prenom, typedLead.nom].filter(Boolean).join(" ") || "—";
    const statutValue = typedLead.statut ?? "";
    const options = statutValue && !STATUT_OPTIONS.some((o) => o.value === statutValue)
        ? [{ value: statutValue, label: statutValue }, ...STATUT_OPTIONS]
        : STATUT_OPTIONS;

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-sm text-zinc-600">
                        <Link
                            href="/admin/qualification-leads"
                            className="font-medium text-zinc-700 hover:text-zinc-900"
                        >
                            Qualification leads
                        </Link>{" "}
                        / Détail
                    </p>
                    <h1 className="text-2xl font-bold text-zinc-900">{fullName}</h1>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl border border-zinc-200 bg-white p-6">
                        <h2 className="text-lg font-semibold text-zinc-900">Informations</h2>
                        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                    Email
                                </dt>
                                <dd className="mt-1 text-sm text-zinc-900">{typedLead.email || "—"}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                    Téléphone
                                </dt>
                                <dd className="mt-1 text-sm text-zinc-900">
                                    {typedLead.telephone || "—"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                    Société
                                </dt>
                                <dd className="mt-1 text-sm text-zinc-900">{typedLead.societe || "—"}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                    Statut
                                </dt>
                                <dd className="mt-1 text-sm text-zinc-900">{typedLead.statut || "—"}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                    Créé le
                                </dt>
                                <dd className="mt-1 text-sm text-zinc-900">
                                    {formatDateTime(typedLead.created_at)}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                    Mis à jour
                                </dt>
                                <dd className="mt-1 text-sm text-zinc-900">
                                    {formatDateTime(typedLead.updated_at)}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="rounded-xl border border-zinc-200 bg-white p-6">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-lg font-semibold text-zinc-900">Interactions</h2>
                            {interactionsError && (
                                <p className="text-xs text-zinc-500">
                                    Impossible de charger les interactions.
                                </p>
                            )}
                        </div>

                        {interactions.length === 0 ? (
                            <p className="mt-4 text-sm text-zinc-600">
                                Aucune interaction pour ce lead.
                            </p>
                        ) : (
                            <ul className="mt-4 space-y-3">
                                {interactions.map((interaction) => (
                                    <li
                                        key={interaction.id}
                                        className="rounded-lg border border-zinc-100 bg-zinc-50 p-4"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div className="text-sm font-medium text-zinc-900">
                                                {interaction.type}
                                            </div>
                                            <div className="text-xs text-zinc-600">
                                                {formatDateTime(interaction.date)}
                                            </div>
                                        </div>
                                        {interaction.notes && (
                                            <p className="mt-2 text-sm text-zinc-700">
                                                {interaction.notes}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <aside className="space-y-6">
                    <div className="rounded-xl border border-zinc-200 bg-white p-6">
                        <h2 className="text-lg font-semibold text-zinc-900">Mettre à jour</h2>

                        <form action={updateLeadStatus} className="mt-4 space-y-4">
                            <input type="hidden" name="id" value={typedLead.id} />
                            <div className="space-y-2">
                                <label
                                    htmlFor="statut"
                                    className="text-sm font-medium text-zinc-700"
                                >
                                    Statut
                                </label>
                                <select
                                    id="statut"
                                    name="statut"
                                    defaultValue={statutValue}
                                    className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                                >
                                    {options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="h-10 w-full rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 transition"
                            >
                                Enregistrer
                            </button>
                        </form>
                    </div>
                </aside>
            </div>
        </section>
    );
}
