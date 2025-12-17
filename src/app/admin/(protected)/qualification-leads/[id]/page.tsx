import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
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

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("fr-FR");
}

function getInteractionIcon(type: string) {
  switch (type) {
    case "call":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "email":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 6l-10 7L2 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "meeting":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}

function getInteractionLabel(type: string) {
  switch (type) {
    case "call":
      return "Appel";
    case "email":
      return "Email";
    case "meeting":
      return "Réunion";
    default:
      return "Autre";
  }
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

  const { data: interactionsData } = await supabase
    .from("interactions")
    .select("id, type, notes, date, created_at")
    .eq("lead_id", typedLead.id)
    .order("date", { ascending: false });

  const interactions = ((interactionsData ?? []) as Interaction[]).filter(Boolean);

  const fullName = [typedLead.prenom, typedLead.nom].filter(Boolean).join(" ") || "—";

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">
            <Link
              href="/admin/qualification-leads"
              className="font-medium text-gray-600 hover:text-gray-900 hover:underline"
            >
              ← Retour aux leads
            </Link>
          </p>
          <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
          {typedLead.societe && (
            <p className="text-sm text-gray-500">{typedLead.societe}</p>
          )}
        </div>

        {/* Status Selector */}
        <LeadStatusSelect
          leadId={typedLead.id}
          currentStatus={typedLead.statut}
          onStatusChange={updateLeadStatus}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Informations de contact</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {typedLead.email ? (
                    <a
                      href={`mailto:${typedLead.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {typedLead.email}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Téléphone
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {typedLead.telephone ? (
                    <a
                      href={`tel:${typedLead.telephone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {typedLead.telephone}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Société
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {typedLead.societe || "—"}
                </dd>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Créé le
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {formatDateTime(typedLead.created_at)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Interactions Timeline */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Historique des interactions
            </h2>

            {interactions.length === 0 ? (
              <div className="mt-4 rounded-lg border border-dashed border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-500">
                  Aucune interaction enregistrée pour ce lead.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {interactions.map((interaction, index) => (
                  <div
                    key={interaction.id}
                    className="relative flex gap-4 pb-4"
                  >
                    {/* Timeline line */}
                    {index < interactions.length - 1 && (
                      <div className="absolute left-5 top-10 h-full w-px bg-gray-200" />
                    )}

                    {/* Icon */}
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      {getInteractionIcon(interaction.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 rounded-lg border border-gray-100 bg-gray-50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
                          {getInteractionLabel(interaction.type)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDateTime(interaction.date)}
                        </span>
                      </div>
                      {interaction.notes && (
                        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                          {interaction.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Quick Info Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Résumé</h2>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Dernière mise à jour
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDateTime(typedLead.updated_at)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Nombre d&apos;interactions
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {interactions.length} interaction{interactions.length > 1 ? "s" : ""}
                </dd>
              </div>
            </dl>
          </div>

          {/* Actions Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Actions rapides</h2>
            <div className="mt-4 space-y-2">
              {typedLead.email && (
                <a
                  href={`mailto:${typedLead.email}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 6l-10 7L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Envoyer un email
                </a>
              )}
              {typedLead.telephone && (
                <a
                  href={`tel:${typedLead.telephone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Appeler
                </a>
              )}
              <Link
                href={`/admin/gestion-contacts?societe=${encodeURIComponent(typedLead.societe || "")}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Voir les contacts
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
