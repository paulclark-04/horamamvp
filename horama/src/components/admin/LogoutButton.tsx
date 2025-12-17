"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

export function LogoutButton({
    className,
    label = "Déconnexion",
}: {
    className?: string;
    label?: string;
}) {
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
            className={[
                "inline-flex items-center justify-center rounded-lg text-theme-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
                "h-10 bg-gray-100 px-4 text-gray-700 hover:bg-gray-200",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {isSigningOut ? `${label}...` : label}
        </button>
    );
}
