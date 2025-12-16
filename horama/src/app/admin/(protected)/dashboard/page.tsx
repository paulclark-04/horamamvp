import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

type LeadStatusRow = { statut: string | null };
type RecentLeadRow = {
    id: string;
    nom: string | null;
    prenom: string | null;
    email: string | null;
    societe: string | null;
    statut: string | null;
    created_at: string;
};

function formatDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("fr-FR");
}

function leadDisplayName(lead: RecentLeadRow) {
    const fullName = [lead.prenom, lead.nom].filter(Boolean).join(" ");
    return fullName || lead.email || "Lead";
}

function clampPercent(value: number) {
    return Math.max(0, Math.min(100, value));
}

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
        totalLeadsRes,
        leads7Res,
        leads30Res,
        interactions7Res,
        interactions30Res,
        leadStatusesRes,
        recentLeadsRes,
    ] = await Promise.all([
        supabase
            .from("leads_contacts")
            .select("id", { count: "exact", head: true })
            .eq("type", "lead"),
        supabase
            .from("leads_contacts")
            .select("id", { count: "exact", head: true })
            .eq("type", "lead")
            .gte("created_at", sevenDaysAgo.toISOString()),
        supabase
            .from("leads_contacts")
            .select("id", { count: "exact", head: true })
            .eq("type", "lead")
            .gte("created_at", thirtyDaysAgo.toISOString()),
        supabase
            .from("interactions")
            .select("id", { count: "exact", head: true })
            .gte("created_at", sevenDaysAgo.toISOString()),
        supabase
            .from("interactions")
            .select("id", { count: "exact", head: true })
            .gte("created_at", thirtyDaysAgo.toISOString()),
        supabase.from("leads_contacts").select("statut").eq("type", "lead"),
        supabase
            .from("leads_contacts")
            .select("id, nom, prenom, email, societe, statut, created_at")
            .eq("type", "lead")
            .order("created_at", { ascending: false })
            .limit(5),
    ]);

    const firstError =
        totalLeadsRes.error ??
        leads7Res.error ??
        leads30Res.error ??
        interactions7Res.error ??
        interactions30Res.error ??
        leadStatusesRes.error ??
        recentLeadsRes.error;

    if (firstError) {
        throw new Error(firstError.message);
    }

    const totalLeads = totalLeadsRes.count ?? 0;
    const leadsLast7Days = leads7Res.count ?? 0;
    const leadsLast30Days = leads30Res.count ?? 0;
    const interactionsLast7Days = interactions7Res.count ?? 0;
    const interactionsLast30Days = interactions30Res.count ?? 0;

    const statusRows = (leadStatusesRes.data ?? []) as LeadStatusRow[];
    const statusCounts = new Map<string, number>();
    for (const row of statusRows) {
        const key = row.statut?.trim() || "—";
        statusCounts.set(key, (statusCounts.get(key) ?? 0) + 1);
    }

    const statusDistribution = Array.from(statusCounts.entries())
        .map(([statut, count]) => ({
            statut,
            count,
            percent: totalLeads > 0 ? (count / totalLeads) * 100 : 0,
        }))
        .sort((a, b) => b.count - a.count);

    const recentLeads = (recentLeadsRes.data ?? []) as RecentLeadRow[];

    return (
        <section className="space-y-8">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
                <p className="text-sm text-zinc-600">KPIs basés sur les 30 derniers jours.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Total leads
                    </div>
                    <div className="mt-2 text-2xl font-bold text-zinc-900">{totalLeads}</div>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Leads (7j)
                    </div>
                    <div className="mt-2 text-2xl font-bold text-zinc-900">{leadsLast7Days}</div>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Leads (30j)
                    </div>
                    <div className="mt-2 text-2xl font-bold text-zinc-900">{leadsLast30Days}</div>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Interactions (7j)
                    </div>
                    <div className="mt-2 text-2xl font-bold text-zinc-900">
                        {interactionsLast7Days}
                    </div>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Interactions (30j)
                    </div>
                    <div className="mt-2 text-2xl font-bold text-zinc-900">
                        {interactionsLast30Days}
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 bg-white p-6">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-lg font-semibold text-zinc-900">
                            Répartition par statut
                        </h2>
                        <Link
                            href="/admin/qualification-leads"
                            className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
                        >
                            Voir les leads
                        </Link>
                    </div>

                    {totalLeads === 0 ? (
                        <p className="mt-4 text-sm text-zinc-600">
                            Aucun lead pour le moment.
                        </p>
                    ) : (
                        <ul className="mt-4 space-y-3">
                            {statusDistribution.map((row) => {
                                const percent = clampPercent(row.percent);
                                return (
                                    <li key={row.statut} className="space-y-1">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-sm font-medium text-zinc-900">
                                                {row.statut}
                                            </div>
                                            <div className="text-xs text-zinc-600">
                                                {row.count} · {Math.round(percent)}%
                                            </div>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-zinc-100">
                                            <div
                                                className="h-2 rounded-full bg-indigo-500"
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-6">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-lg font-semibold text-zinc-900">Leads récents</h2>
                        <Link
                            href="/admin/qualification-leads"
                            className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
                        >
                            Tout voir
                        </Link>
                    </div>

                    {recentLeads.length === 0 ? (
                        <p className="mt-4 text-sm text-zinc-600">
                            Aucun lead pour le moment.
                        </p>
                    ) : (
                        <ul className="mt-4 divide-y divide-zinc-100">
                            {recentLeads.map((lead) => (
                                <li key={lead.id} className="py-3">
                                    <Link
                                        href={`/admin/qualification-leads/${lead.id}`}
                                        className="flex items-center justify-between gap-4 hover:underline"
                                    >
                                        <div className="min-w-0">
                                            <div className="truncate text-sm font-medium text-zinc-900">
                                                {leadDisplayName(lead)}
                                            </div>
                                            <div className="truncate text-xs text-zinc-600">
                                                {lead.societe ? `${lead.societe} · ` : ""}
                                                {lead.statut || "—"} · {formatDate(lead.created_at)}
                                            </div>
                                        </div>
                                        <div className="text-xs text-zinc-500">Voir</div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
