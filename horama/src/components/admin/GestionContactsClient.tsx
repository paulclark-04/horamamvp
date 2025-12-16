"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

function formatDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("fr-FR");
}

function contactDisplayName(row: ContactRow) {
    const fullName = [row.prenom, row.nom].filter(Boolean).join(" ");
    return fullName || row.email || "—";
}

function normalizeCompany(value: string | null) {
    const trimmed = value?.trim();
    return trimmed ? trimmed : null;
}

export function GestionContactsClient({
    contacts,
    initialSociete,
}: {
    contacts: ContactRow[];
    initialSociete?: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");

    const selectedSociete = (searchParams.get("societe") ?? initialSociete ?? "").trim();

    const availableTypes = useMemo(() => {
        const types = new Set<string>();
        contacts.forEach((c) => {
            if (c.type) types.add(c.type);
        });
        return ["all", ...Array.from(types).sort()];
    }, [contacts]);

    const entrepriseCounts = useMemo(() => {
        const counts = new Map<string, number>();
        const base = typeFilter === "all" ? contacts : contacts.filter((c) => c.type === typeFilter);
        base.forEach((c) => {
            const company = normalizeCompany(c.societe);
            if (!company) return;
            counts.set(company, (counts.get(company) ?? 0) + 1);
        });

        return Array.from(counts.entries())
            .map(([societe, count]) => ({ societe, count }))
            .sort((a, b) => b.count - a.count || a.societe.localeCompare(b.societe));
    }, [contacts, typeFilter]);

    const filteredContacts = useMemo(() => {
        const q = query.trim().toLowerCase();
        return contacts.filter((c) => {
            if (typeFilter !== "all" && c.type !== typeFilter) return false;

            const company = normalizeCompany(c.societe);
            if (selectedSociete && company !== selectedSociete) return false;

            if (!q) return true;

            const haystack = [
                c.nom,
                c.prenom,
                c.email,
                c.societe,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return haystack.includes(q);
        });
    }, [contacts, query, selectedSociete, typeFilter]);

    const setSocieteParam = (societe: string | null) => {
        const next = new URLSearchParams(searchParams);
        if (!societe) {
            next.delete("societe");
        } else {
            next.set("societe", societe);
        }
        const queryString = next.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    };

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4">
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                    <h2 className="text-sm font-semibold text-zinc-900">Entreprises</h2>
                    {entrepriseCounts.length === 0 ? (
                        <p className="mt-3 text-sm text-zinc-600">
                            Aucune société renseignée.
                        </p>
                    ) : (
                        <ul className="mt-3 space-y-1 max-h-[420px] overflow-auto pr-1">
                            {entrepriseCounts.map((row) => {
                                const isActive = selectedSociete === row.societe;
                                return (
                                    <li key={row.societe}>
                                        <button
                                            type="button"
                                            onClick={() => setSocieteParam(isActive ? null : row.societe)}
                                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${isActive
                                                    ? "bg-indigo-50 text-indigo-700"
                                                    : "hover:bg-zinc-50 text-zinc-700"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="truncate">{row.societe}</span>
                                                <span className="text-xs text-zinc-500">
                                                    {row.count}
                                                </span>
                                            </div>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {selectedSociete && (
                        <button
                            type="button"
                            onClick={() => setSocieteParam(null)}
                            className="mt-4 text-sm font-medium text-zinc-700 hover:text-zinc-900"
                        >
                            Effacer le filtre société
                        </button>
                    )}
                </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-2">
                            <label htmlFor="type" className="text-sm text-zinc-700">
                                Type
                            </label>
                            <select
                                id="type"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="h-10 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                            >
                                {availableTypes.map((t) => (
                                    <option key={t} value={t}>
                                        {t === "all" ? "Tous" : t}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="search" className="text-sm text-zinc-700">
                                Recherche
                            </label>
                            <input
                                id="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Nom, email, société…"
                                className="h-10 w-full sm:w-72 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400"
                            />
                        </div>
                    </div>

                    <p className="text-sm text-zinc-600">
                        {filteredContacts.length} résultat{filteredContacts.length > 1 ? "s" : ""}
                    </p>
                </div>

                {filteredContacts.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-10 text-center">
                        <h2 className="text-lg font-semibold text-zinc-900">
                            Aucun résultat
                        </h2>
                        <p className="mt-2 text-sm text-zinc-600">
                            Ajustez les filtres ou la recherche.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                                <tr>
                                    <th className="px-4 py-3">Nom</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Téléphone</th>
                                    <th className="px-4 py-3">Société</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Statut</th>
                                    <th className="px-4 py-3">Créé le</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {filteredContacts.map((row) => (
                                    <tr key={row.id} className="hover:bg-zinc-50">
                                        <td className="px-4 py-3 font-medium text-zinc-900">
                                            {contactDisplayName(row)}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">{row.email || "—"}</td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {row.telephone || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {normalizeCompany(row.societe) || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">{row.type}</td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {row.statut || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {formatDate(row.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

