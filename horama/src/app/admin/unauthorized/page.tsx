import Link from "next/link";

export default function AdminUnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-4 rounded-lg bg-white p-8 shadow">
                <h1 className="text-2xl font-bold text-zinc-900">Accès refusé</h1>
                <p className="text-zinc-600">
                    Votre compte n&apos;a pas les droits administrateur.
                </p>
                <Link
                    href="/admin/login"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition"
                >
                    Retour à la connexion
                </Link>
            </div>
        </div>
    );
}

