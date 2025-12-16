import { createClient } from "@/lib/supabase/server";
import { GestionDocumentsUploadForm } from "@/components/admin/GestionDocumentsUploadForm";

type DocumentRow = {
    id: string;
    nom: string;
    url: string;
    type: string | null;
    bucket: string;
    created_at: string;
};

function formatDateTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString("fr-FR");
}

export default async function GestionDocumentsPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("elements_media")
        .select("id, nom, url, type, bucket, created_at")
        .eq("bucket", "documents-private")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    const documents = (data ?? []) as DocumentRow[];

    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-zinc-900">Gestion documents</h1>
                <p className="text-sm text-zinc-600">
                    {documents.length} document{documents.length > 1 ? "s" : ""}
                </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-zinc-900">Uploader un document</h2>
                <p className="mt-1 text-sm text-zinc-600">
                    CSV, XLSX ou PDF (10 MB max). Stockage privé côté serveur.
                </p>
                <div className="mt-4">
                    <GestionDocumentsUploadForm />
                </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-zinc-900">Documents</h2>

                {documents.length === 0 ? (
                    <p className="mt-4 text-sm text-zinc-600">
                        Aucun document pour le moment.
                    </p>
                ) : (
                    <ul className="mt-4 divide-y divide-zinc-100">
                        {documents.map((doc) => (
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
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

