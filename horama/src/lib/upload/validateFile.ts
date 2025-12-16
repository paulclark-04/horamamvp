export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const ALLOWED_EXTENSIONS = new Set(["csv", "xlsx", "pdf"]);
const ALLOWED_MIME_TYPES = new Set([
    "text/csv",
    "application/csv",
    "application/vnd.ms-excel", // sometimes used for CSV
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/pdf",
]);

function getFileExtension(filename: string) {
    const lastDot = filename.lastIndexOf(".");
    if (lastDot <= 0) return "";
    return filename.slice(lastDot + 1).toLowerCase();
}

export function validateAdminDocumentFile(file: File):
    | { ok: true }
    | { ok: false; error: string } {
    if (!file) {
        return { ok: false, error: "Fichier manquant." };
    }

    if (file.size <= 0) {
        return { ok: false, error: "Fichier vide." };
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        return { ok: false, error: "Fichier trop volumineux (max 10 MB)." };
    }

    const extension = getFileExtension(file.name);
    if (!extension || !ALLOWED_EXTENSIONS.has(extension)) {
        return { ok: false, error: "Format non supporté (CSV, XLSX, PDF)." };
    }

    const mime = (file.type ?? "").trim().toLowerCase();
    if (mime && mime !== "application/octet-stream" && !ALLOWED_MIME_TYPES.has(mime)) {
        return { ok: false, error: "Type de fichier non supporté." };
    }

    return { ok: true };
}

