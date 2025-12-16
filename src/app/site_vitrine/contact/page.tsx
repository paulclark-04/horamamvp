"use client";

import { useState } from "react";
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

// Step Indicator Component
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
    return (
        <div className="step-indicator">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div
                    key={step}
                    className={`step-dot ${
                        step < currentStep
                            ? "step-dot-completed"
                            : step === currentStep
                            ? "step-dot-active"
                            : ""
                    }`}
                />
            ))}
        </div>
    );
}

// Form Input Component
function FormInput({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    required,
}: {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
}) {
    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">
                {label} {required && <span className="text-error">*</span>}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`form-input ${error ? "form-input-error" : ""}`}
            />
            {error && <p className="form-error">{error}</p>}
        </div>
    );
}

// Summary Row Component
function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="summary-row">
            <span className="text-muted text-sm">{label}</span>
            <span className="text-primary text-sm text-right">{value}</span>
        </div>
    );
}

// Success Message Component
function SuccessMessage({ onReset }: { onReset: () => void }) {
    return (
        <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
                <svg
                    className="w-8 h-8 text-success"
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
            <h2 className="text-2xl font-bold text-primary mb-2">Message envoye !</h2>
            <p className="text-secondary mb-6">
                Merci pour votre message. Nous vous repondrons dans les plus brefs delais.
            </p>
            <button onClick={onReset} className="btn-outline">
                Envoyer un autre message
            </button>
        </div>
    );
}

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
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    // Validate current step
    const validateStep = (): boolean => {
        const newErrors: FormErrors = {};

        if (currentStep === 1) {
            if (!formData.prenom?.trim()) {
                newErrors.prenom = "Le prenom est requis";
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
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-24 pb-12 overflow-hidden">
                <div className="absolute inset-0 hero-gradient" />
                <div className="hero-glow" />

                <div className="relative z-10 container-content text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                        Contactez-nous
                    </h1>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        Remplissez ce formulaire et nous vous repondrons dans les plus brefs delais.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="section bg-background">
                <div className="max-w-xl mx-auto px-4">
                    {submitStatus === "success" ? (
                        <SuccessMessage onReset={handleReset} />
                    ) : (
                        <div className="card">
                            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

                            {/* Step 1: Personal Info */}
                            {currentStep === 1 && (
                                <div className="animate-fadeIn">
                                    <h2 className="text-xl font-semibold text-primary mb-6">
                                        Vos informations personnelles
                                    </h2>
                                    <FormInput
                                        id="prenom"
                                        label="Prenom"
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
                                <div className="animate-fadeIn">
                                    <h2 className="text-xl font-semibold text-primary mb-6">
                                        Vos coordonnees
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
                                        label="Telephone"
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
                                <div className="animate-fadeIn">
                                    <h2 className="text-xl font-semibold text-primary mb-6">
                                        Votre entreprise
                                    </h2>
                                    <FormInput
                                        id="societe"
                                        label="Societe"
                                        placeholder="Nom de votre entreprise"
                                        value={formData.societe || ""}
                                        onChange={(e) => updateField("societe", e.target.value)}
                                        error={errors.societe}
                                    />
                                    <div className="form-group">
                                        <label htmlFor="message" className="form-label">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            placeholder="Comment pouvons-nous vous aider ?"
                                            value={formData.message || ""}
                                            onChange={(e) => updateField("message", e.target.value)}
                                            rows={4}
                                            className="form-textarea"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Confirmation */}
                            {currentStep === 4 && (
                                <div className="animate-fadeIn">
                                    <h2 className="text-xl font-semibold text-primary mb-6">
                                        Confirmez vos informations
                                    </h2>
                                    <div className="summary-card">
                                        <SummaryRow label="Prenom" value={formData.prenom} />
                                        <SummaryRow label="Nom" value={formData.nom} />
                                        <SummaryRow label="Email" value={formData.email} />
                                        {formData.telephone && (
                                            <SummaryRow label="Telephone" value={formData.telephone} />
                                        )}
                                        {formData.societe && (
                                            <SummaryRow label="Societe" value={formData.societe} />
                                        )}
                                        {formData.message && (
                                            <SummaryRow label="Message" value={formData.message} />
                                        )}
                                    </div>

                                    {submitStatus === "error" && (
                                        <div className="alert alert-error mt-4">
                                            {errorMessage}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 gap-4">
                                {currentStep > 1 ? (
                                    <button onClick={handleBack} className="btn-outline">
                                        Retour
                                    </button>
                                ) : (
                                    <div />
                                )}

                                {currentStep < TOTAL_STEPS ? (
                                    <button onClick={handleNext} className="btn-accent">
                                        Suivant
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="btn-accent"
                                    >
                                        {isSubmitting ? "Envoi..." : "Envoyer"}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Calendly Section */}
            <section className="section-lg bg-background border-t border-neutral-800">
                <div className="container-content">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                            Ou prenez rendez-vous directement
                        </h2>
                        <p className="text-secondary">
                            Choisissez un creneau qui vous convient
                        </p>
                    </div>
                    <div className="card overflow-hidden max-w-4xl mx-auto">
                        <iframe
                            src="https://calendly.com/horama"
                            width="100%"
                            height="630"
                            frameBorder="0"
                            title="Calendly - Prendre rendez-vous"
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
