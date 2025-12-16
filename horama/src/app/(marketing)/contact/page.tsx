"use client";

import { useState } from "react";
import { Card, StepIndicator, FormInput, Button } from "@/components/ui";
import { LeadCreateInputSchema, type LeadCreateInput } from "@/contracts";

const TOTAL_STEPS = 4;

// Initial form state
const initialFormData: LeadCreateInput = {
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    societe: "",
    message: "",
};

type FormErrors = Partial<Record<keyof LeadCreateInput, string>>;

export default function ContactPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<LeadCreateInput>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // Update form field
    const updateField = (field: keyof LeadCreateInput, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    // Validate current step
    const validateStep = (): boolean => {
        const newErrors: FormErrors = {};

        if (currentStep === 1) {
            if (!formData.prenom?.trim()) {
                newErrors.prenom = "Le prénom est requis";
            }
            if (!formData.nom?.trim()) {
                newErrors.nom = "Le nom est requis";
            }
        }

        if (currentStep === 2) {
            if (!formData.email?.trim()) {
                newErrors.email = "L'email est requis";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Email invalide";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Navigate to next step
    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
        }
    };

    // Navigate to previous step
    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    // Submit form
    const handleSubmit = async () => {
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            // Validate full form data with Zod
            const result = LeadCreateInputSchema.safeParse(formData);
            if (!result.success) {
                const formattedErrors: FormErrors = {};
                result.error.issues.forEach((err) => {
                    const field = err.path[0] as keyof LeadCreateInput;
                    formattedErrors[field] = err.message;
                });
                setErrors(formattedErrors);
                setIsSubmitting(false);
                return;
            }

            // Submit to API
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result.data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Erreur lors de l'envoi du formulaire");
            }

            setSubmitStatus("success");
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage(
                error instanceof Error ? error.message : "Une erreur est survenue"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form
    const handleReset = () => {
        setFormData(initialFormData);
        setCurrentStep(1);
        setSubmitStatus("idle");
        setErrors({});
        setErrorMessage("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950">
            <div className="container mx-auto px-4 py-16 md:py-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                        Contactez-nous
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.
                    </p>
                </div>

                {/* Form Card */}
                <div className="max-w-xl mx-auto">
                    {submitStatus === "success" ? (
                        <SuccessMessage onReset={handleReset} />
                    ) : (
                        <Card>
                            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

                            {/* Step 1: Personal Info */}
                            {currentStep === 1 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                                        Vos informations personnelles
                                    </h2>
                                    <FormInput
                                        id="prenom"
                                        label="Prénom"
                                        placeholder="Jean"
                                        value={formData.prenom}
                                        onChange={(e) => updateField("prenom", e.target.value)}
                                        error={errors.prenom}
                                        required
                                    />
                                    <FormInput
                                        id="nom"
                                        label="Nom"
                                        placeholder="Dupont"
                                        value={formData.nom}
                                        onChange={(e) => updateField("nom", e.target.value)}
                                        error={errors.nom}
                                        required
                                    />
                                </div>
                            )}

                            {/* Step 2: Contact Info */}
                            {currentStep === 2 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                                        Vos coordonnées
                                    </h2>
                                    <FormInput
                                        id="email"
                                        label="Email"
                                        type="email"
                                        placeholder="jean.dupont@email.com"
                                        value={formData.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        error={errors.email}
                                        required
                                    />
                                    <FormInput
                                        id="telephone"
                                        label="Téléphone"
                                        type="tel"
                                        placeholder="+33 6 12 34 56 78"
                                        value={formData.telephone || ""}
                                        onChange={(e) => updateField("telephone", e.target.value)}
                                        error={errors.telephone}
                                    />
                                </div>
                            )}

                            {/* Step 3: Company Info */}
                            {currentStep === 3 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                                        Votre entreprise
                                    </h2>
                                    <FormInput
                                        id="societe"
                                        label="Société"
                                        placeholder="Nom de votre entreprise"
                                        value={formData.societe || ""}
                                        onChange={(e) => updateField("societe", e.target.value)}
                                        error={errors.societe}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="message"
                                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            placeholder="Comment pouvons-nous vous aider ?"
                                            value={formData.message || ""}
                                            onChange={(e) => updateField("message", e.target.value)}
                                            rows={4}
                                            className="
                        w-full px-4 py-3
                        rounded-xl
                        bg-white dark:bg-zinc-800
                        border border-zinc-200 dark:border-zinc-700
                        text-zinc-900 dark:text-zinc-100
                        placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
                        transition-all duration-200
                        resize-none
                      "
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Confirmation */}
                            {currentStep === 4 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                                        Confirmez vos informations
                                    </h2>
                                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 space-y-4">
                                        <SummaryRow label="Prénom" value={formData.prenom} />
                                        <SummaryRow label="Nom" value={formData.nom} />
                                        <SummaryRow label="Email" value={formData.email} />
                                        {formData.telephone && (
                                            <SummaryRow label="Téléphone" value={formData.telephone} />
                                        )}
                                        {formData.societe && (
                                            <SummaryRow label="Société" value={formData.societe} />
                                        )}
                                        {formData.message && (
                                            <SummaryRow label="Message" value={formData.message} />
                                        )}
                                    </div>

                                    {submitStatus === "error" && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-400">
                                            {errorMessage}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 gap-4">
                                {currentStep > 1 ? (
                                    <Button variant="secondary" onClick={handleBack}>
                                        Retour
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                {currentStep < TOTAL_STEPS ? (
                                    <Button onClick={handleNext}>Suivant</Button>
                                ) : (
                                    <Button onClick={handleSubmit} isLoading={isSubmitting}>
                                        Envoyer
                                    </Button>
                                )}
                            </div>
                        </Card>
                    )}
                </div>

                {/* Calendly Section */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                            Ou prenez rendez-vous directement
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Choisissez un créneau qui vous convient
                        </p>
                    </div>
                    <Card className="overflow-hidden">
                        <iframe
                            src="https://calendly.com/horama"
                            width="100%"
                            height="630"
                            frameBorder="0"
                            title="Calendly - Prendre rendez-vous"
                            className="rounded-xl"
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Summary row component
function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-start gap-4">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {label}
            </span>
            <span className="text-sm text-zinc-900 dark:text-white text-right">
                {value}
            </span>
        </div>
    );
}

// Success message component
function SuccessMessage({ onReset }: { onReset: () => void }) {
    return (
        <Card className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                Message envoyé !
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
            </p>
            <Button variant="secondary" onClick={onReset}>
                Envoyer un autre message
            </Button>
        </Card>
    );
}
