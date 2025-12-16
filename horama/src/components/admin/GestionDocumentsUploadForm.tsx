"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { validateAdminDocumentFile } from "@/lib/upload/validateFile";

export function GestionDocumentsUploadForm() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const file = inputRef.current?.files?.[0];
        if (!file) {
            setError("Veuillez sélectionner un fichier.");
            return;
        }

        const validation = validateAdminDocumentFile(file);
        if (!validation.ok) {
            setError(validation.error);
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/admin/documents/upload", {
                method: "POST",
                body: formData,
            });

            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                setError(payload?.error || "Upload impossible.");
                setIsUploading(false);
                return;
            }

            if (inputRef.current) {
                inputRef.current.value = "";
            }

            setSuccess("Document uploadé.");
            router.refresh();
        } catch {
            setError("Upload impossible.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
                ref={inputRef}
                type="file"
                name="file"
                accept=".csv,.xlsx,.pdf,text/csv,application/csv,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                className="block w-full text-sm text-zinc-700 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-zinc-800"
                disabled={isUploading}
            />

            <button
                type="submit"
                disabled={isUploading}
                className="h-10 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 transition"
            >
                {isUploading ? "Upload..." : "Uploader"}
            </button>

            <div className="text-sm">
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-700">{success}</p>}
            </div>
        </form>
    );
}

