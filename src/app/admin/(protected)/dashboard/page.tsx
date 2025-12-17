import Link from "next/link";

import { AdminCard } from "@/components/admin/AdminCard";
import { AdminKpiCard } from "@/components/admin/AdminKpiCard";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
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
        <section className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-title-md font-bold text-gray-800">Dashboard</h1>
                <p className="text-theme-sm text-gray-500">KPIs basés sur les 30 derniers jours.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
                <AdminKpiCard
                    label="Total leads"
                    value={totalLeads}
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                            <path
                                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        </svg>
                    }
                />
                <AdminKpiCard
                    label="Leads (7j)"
                    value={leadsLast7Days}
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                            <path
                                d="M4 18V6"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M4 18h16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M7 14l3-3 3 2 4-6"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                />
                <AdminKpiCard
                    label="Leads (30j)"
                    value={leadsLast30Days}
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                            <path
                                d="M8 7V3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M16 7V3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M4 11h16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                />
                <AdminKpiCard
                    label="Interactions (30j)"
                    value={interactionsLast30Days}
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                            <path
                                d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 8h8M8 12h6"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    }
                    badge={
                        <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-0.5 text-theme-xs font-medium text-gray-700">
                            7j: {interactionsLast7Days}
                        </span>
                    }
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <AdminCard
                    title="Répartition par statut"
                    action={
                        <Link
                            href="/admin/qualification-leads"
                            className="text-theme-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                            Voir les leads
                        </Link>
                    }
                >
                    {totalLeads === 0 ? (
                        <p className="text-theme-sm text-gray-500">Aucun lead pour le moment.</p>
                    ) : (
                        <ul className="space-y-3">
                            {statusDistribution.map((row) => {
                                const percent = clampPercent(row.percent);
                                return (
                                    <li key={row.statut} className="space-y-1">
                                        <div className="flex items-center justify-between gap-3">
                                            <LeadStatusBadge status={row.statut} />
                                            <div className="text-theme-xs text-gray-500">
                                                {row.count} · {Math.round(percent)}%
                                            </div>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-100">
                                            <div
                                                className="h-2 rounded-full bg-brand-500"
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </AdminCard>

                <AdminCard
                    title="Leads récents"
                    action={
                        <Link
                            href="/admin/qualification-leads"
                            className="text-theme-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                            Tout voir
                        </Link>
                    }
                    bodyClassName="p-0"
                >
                    {recentLeads.length === 0 ? (
                        <div className="p-6">
                            <p className="text-theme-sm text-gray-500">
                                Aucun lead pour le moment.
                            </p>
                        </div>
                    ) : (
                        <div className="max-w-full overflow-x-auto">
                            <div className="min-w-[720px]">
                                <table className="min-w-full text-left">
                                    <thead className="border-b border-gray-100">
                                        <tr>
                                            <th className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500">
                                                Lead
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
                                        {recentLeads.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-gray-50">
                                                <td className="px-5 py-4 text-start">
                                                    <Link
                                                        href={`/admin/qualification-leads/${lead.id}`}
                                                        className="block font-medium text-gray-800 text-theme-sm hover:underline"
                                                    >
                                                        {leadDisplayName(lead)}
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
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </AdminCard>
            </div>
        </section>
    );
}
