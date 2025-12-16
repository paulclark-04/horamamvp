"use client";

import { useState } from "react";

export function DocumentSignedUrlButton({
    mediaId,
    label,
}: {
    mediaId: string;
    label: string;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        if (isLoading) return;

        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/documents/signed-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ media_id: mediaId }),
            });

            const payload = (await response.json().catch(() => null)) as
                | { signedUrl?: unknown; error?: unknown }
                | null;

            if (!response.ok) {
                const message =
                    typeof payload?.error === "string"
                        ? payload.error
                        : "Impossible d'ouvrir le document.";
                setError(message);
                return;
            }

            const signedUrl =
                typeof payload?.signedUrl === "string" ? payload.signedUrl : null;

            if (!signedUrl) {
                setError("URL invalide.");
                return;
            }

            window.open(signedUrl, "_blank", "noopener,noreferrer");
        } catch {
            setError("Impossible d'ouvrir le document.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-end gap-1">
            <button
                type="button"
                onClick={() => void handleClick()}
                disabled={isLoading}
                className="h-9 rounded-lg bg-zinc-900 px-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
            >
                {isLoading ? "Ouverture..." : label}
            </button>
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}
