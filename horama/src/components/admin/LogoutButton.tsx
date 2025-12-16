"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleLogout = async () => {
        if (isSigningOut) return;

        setIsSigningOut(true);

        const supabase = createClient();
        await supabase.auth.signOut();

        router.push("/admin/login");
        router.refresh();
    };

    return (
        <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={isSigningOut}
            className="w-full rounded-lg px-3 py-2 text-left text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isSigningOut ? "Déconnexion..." : "Déconnexion"}
        </button>
    );
}
