import { createClient } from "@/lib/supabase/server";
import { GestionDocumentsUploadForm } from "@/components/admin/GestionDocumentsUploadForm";
import { DocumentSignedUrlButton } from "@/components/admin/DocumentSignedUrlButton";
import { CandidatureCvSignedUrlButton } from "@/components/admin/CandidatureCvSignedUrlButton";

type DocumentRow = {
    id: string;
    nom: string;
    url: string;
    type: string | null;
    bucket: string;
    created_at: string;
};

type CandidatureRow = {
    id: string;
    nom: string;
    prenom: string | null;
    email: string;
    offre_id: string | null;
    statut: string | null;
    created_at: string;
    cv_url: string | null;
};

function formatDateTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString("fr-FR");
}

function formatCandidateName(row: CandidatureRow) {
    const fullName = [row.prenom, row.nom].filter(Boolean).join(" ");
    return fullName || row.nom || "—";
}

export default async function GestionDocumentsPage() {
    const supabase = await createClient();

    const { data: internalData, error: internalError } = await supabase
        .from("elements_media")
        .select("id, nom, url, type, bucket, created_at")
        .eq("bucket", "documents-private")
        .like("url", "admin-uploads/%")
        .order("created_at", { ascending: false });

    if (internalError) {
        throw new Error(internalError.message);
    }

    const { data: candidatureData, error: candidatureError } = await supabase
        .from("candidatures")
        .select("id, nom, prenom, email, offre_id, statut, created_at, cv_url")
        .order("created_at", { ascending: false })
        .limit(200);

    if (candidatureError) {
        throw new Error(candidatureError.message);
    }

    const internalDocuments = (internalData ?? []) as DocumentRow[];
    const candidatures = (candidatureData ?? []) as CandidatureRow[];

    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-zinc-900">Gestion documents</h1>
                <p className="text-sm text-zinc-600">
                    Documents internes et CV des postulants.
                </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-zinc-900">
                        Documents internes (perso)
                    </h2>
                    <p className="text-sm text-zinc-600">
                        {internalDocuments.length} document
                        {internalDocuments.length > 1 ? "s" : ""}
                    </p>
                </div>

                <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                    <h3 className="text-sm font-semibold text-zinc-900">
                        Uploader un document
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600">
                        CSV, XLSX ou PDF (10 MB max). Stockage privé côté serveur.
                    </p>
                    <div className="mt-4">
                        <GestionDocumentsUploadForm />
                    </div>
                </div>

                {internalDocuments.length === 0 ? (
                    <p className="mt-4 text-sm text-zinc-600">
                        Aucun document pour le moment.
                    </p>
                ) : (
                    <ul className="mt-6 divide-y divide-zinc-100">
                        {internalDocuments.map((doc) => (
                            <li key={doc.id} className="py-4">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-medium text-zinc-900">
                                            {doc.nom}
                                        </div>
                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                                            <span className="rounded-md bg-zinc-100 px-2 py-1 font-medium text-zinc-700">
                                                {doc.type || "type inconnu"}
                                            </span>
                                            <span>·</span>
                                            <span>{formatDateTime(doc.created_at)}</span>
                                            <span>·</span>
                                            <span>Taille: —</span>
                                        </div>
                                        <div className="mt-2 truncate text-xs text-zinc-500">
                                            {doc.bucket}/{doc.url}
                                        </div>
                                    </div>
                                    <DocumentSignedUrlButton
                                        mediaId={doc.id}
                                        label={
                                            doc.type === "application/pdf"
                                                ? "Voir"
                                                : "Télécharger"
                                        }
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-zinc-900">
                        Documents des postulants (CV)
                    </h2>
                    <p className="text-sm text-zinc-600">
                        {candidatures.length} candidature
                        {candidatures.length > 1 ? "s" : ""}
                    </p>
                </div>

                {candidatures.length === 0 ? (
                    <p className="mt-4 text-sm text-zinc-600">
                        Aucune candidature pour le moment.
                    </p>
                ) : (
                    <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                                <tr>
                                    <th className="px-4 py-3">Candidat</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Offre</th>
                                    <th className="px-4 py-3">Statut</th>
                                    <th className="px-4 py-3">Créé le</th>
                                    <th className="px-4 py-3 text-right">CV</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {candidatures.map((row) => (
                                    <tr key={row.id} className="hover:bg-zinc-50">
                                        <td className="px-4 py-3 font-medium text-zinc-900">
                                            {formatCandidateName(row)}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {row.email}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {row.offre_id || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {row.statut || "—"}
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700">
                                            {formatDateTime(row.created_at)}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {row.cv_url ? (
                                                <CandidatureCvSignedUrlButton
                                                    candidatureId={row.id}
                                                />
                                            ) : (
                                                <span className="text-xs text-zinc-500">
                                                    CV manquant
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
