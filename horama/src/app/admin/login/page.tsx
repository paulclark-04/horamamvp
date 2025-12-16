"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { Button, Card, FormInput } from "@/components/ui";

export default function AdminLoginPage() {
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const checkAdminAndRedirect = useCallback(async () => {
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
            await supabase.auth.signOut();
            setStatusMessage("Erreur de session. Veuillez vous reconnecter.");
            return;
        }

        if (!user) {
            return;
        }

        const { data: profile, error: profileError } = await supabase
            .from("utilisateurs")
            .select("role")
            .eq("id", user.id)
            .maybeSingle();

        if (profileError || !profile || profile.role !== "admin") {
            await supabase.auth.signOut();
            setStatusMessage("Accès refusé : votre compte n’a pas le rôle admin.");
            return;
        }

        router.push("/admin/dashboard");
        router.refresh();
    }, [router, supabase]);

    useEffect(() => {
        void (async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                await checkAdminAndRedirect();
            }
        })();
    }, [checkAdminAndRedirect, supabase]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setStatusMessage(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setStatusMessage("Identifiants invalides.");
            setIsSubmitting(false);
            return;
        }

        await checkAdminAndRedirect();
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
            <div className="w-full max-w-md">
                <Card className="p-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-bold text-zinc-900">Admin Login</h1>
                        <p className="text-sm text-zinc-600">
                            Connectez-vous pour accéder au CRM.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <FormInput
                            id="email"
                            label="Email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FormInput
                            id="password"
                            label="Mot de passe"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {statusMessage && (
                            <p className="text-sm text-red-600">{statusMessage}</p>
                        )}

                        <Button type="submit" className="w-full" isLoading={isSubmitting}>
                            Se connecter
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
