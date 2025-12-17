"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { LeadCreateInputSchema, type LeadCreateInput } from "@/contracts";
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldIcon,
} from "@/components/icons";
import { FadeIn, GlowingOrb } from "@/components/ui/MotionWrapper";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

const TOTAL_STEPS = 4;

const initialFormData: LeadCreateInput = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  societe: "",
  message: "",
};

type FormErrors = Partial<Record<keyof LeadCreateInput, string>>;

const steps = [
  { number: 1, label: "Identité" },
  { number: 2, label: "Contact" },
  { number: 3, label: "Projet" },
  { number: 4, label: "Confirmation" },
];

// ============================================================================
// COMPONENTS
// ============================================================================

function AnimatedGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 grid-background-container">
      <div
        className="absolute inset-0 opacity-[0.02] grid-pattern"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0 grid-radial-mask"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, black 70%)",
        }}
      />
    </div>
  );
}

// Online indicator with pulse
function OnlineIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
      <span className="text-green-400 text-sm font-medium">En ligne</span>
    </div>
  );
}

// Mail Icon
function MailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Phone Icon
function PhoneIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.99C20.44 21.05 19.88 20.99 19.33 20.82C14.05 19.16 9.49 15.93 6.26 11.67C4.09 8.61 2.69 5.11 2.12 1.44C2.04 0.88 2.48 0.39 3.04 0.37L6.04 0.17C6.54 0.15 7 0.47 7.16 0.95L8.46 4.95C8.6 5.38 8.49 5.85 8.16 6.17L6.5 7.83C8.5 11.33 11.5 14.33 15 16.33L16.66 14.67C16.98 14.35 17.45 14.24 17.88 14.38L21.88 15.68C22.36 15.84 22.68 16.3 22.66 16.8L22 16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Location Icon
function LocationIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// Clock Icon
function ClockIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
      <GridBackground />
      <GlowingOrb className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" color="blue" size="lg" />
      <GlowingOrb className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" color="purple" size="lg" />

      <div className="container-content relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge with pulse */}
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0)",
                "0 0 0 8px rgba(59, 130, 246, 0.1)",
                "0 0 0 0 rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <OnlineIndicator />
            <span className="w-px h-4 bg-white/20" />
            <span className="text-primary-400 text-sm font-medium">Réponse sous 24h</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Parlons de votre <AnimatedGradientText>projet</AnimatedGradientText>
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Notre équipe d'experts est à votre écoute pour vous accompagner
            dans vos projets de Computer Vision.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// TRUST COLUMN
// ============================================================================

function ContactInfo() {
  const contactItems = [
    {
      icon: <MailIcon className="w-5 h-5" />,
      label: "Email",
      value: "contact@horama.ai",
      href: "mailto:contact@horama.ai",
    },
    {
      icon: <PhoneIcon className="w-5 h-5" />,
      label: "Téléphone",
      value: "+33 1 23 45 67 89",
      href: "tel:+33123456789",
    },
    {
      icon: <LocationIcon className="w-5 h-5" />,
      label: "Adresse",
      value: "Paris, France",
      href: null,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Contact direct</h3>
      {contactItems.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + idx * 0.1 }}
        >
          {item.href ? (
            <a
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500/30 transition-colors">
                {item.icon}
              </div>
              <div>
                <p className="text-neutral-400 text-xs">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            </a>
          ) : (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                {item.icon}
              </div>
              <div>
                <p className="text-neutral-400 text-xs">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function ResponseTime() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
          <ClockIcon className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <p className="text-green-400 font-semibold">Réponse garantie</p>
          <p className="text-green-300/70 text-sm">sous 24 heures ouvrées</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 h-1.5 rounded-full bg-green-900/50 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "95%" }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </div>
        <span className="text-green-400 text-xs font-medium">95%</span>
      </div>
      <p className="text-green-300/50 text-xs mt-2">Taux de réponse dans les délais</p>
    </motion.div>
  );
}

function Certifications() {
  const certs = [
    { icon: "🛡️", name: "SecNumCloud", desc: "Hébergement souverain" },
    { icon: "📋", name: "ISO 27001", desc: "Sécurité de l'information" },
    { icon: "🔒", name: "RGPD", desc: "Protection des données" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
      <div className="space-y-3">
        {certs.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
          >
            <span className="text-2xl">{cert.icon}</span>
            <div>
              <p className="text-white font-medium text-sm">{cert.name}</p>
              <p className="text-neutral-400 text-xs">{cert.desc}</p>
            </div>
            <CheckIcon className="w-5 h-5 text-green-400 ml-auto" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TrustColumn() {
  return (
    <div className="space-y-8">
      <ContactInfo />
      <ResponseTime />
      <Certifications />
    </div>
  );
}

// ============================================================================
// FORM COMPONENTS
// ============================================================================

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      {/* Steps labels */}
      <div className="flex justify-between mb-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`text-xs font-medium transition-colors ${
              step.number <= currentStep ? "text-primary-400" : "text-neutral-500"
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
              step.number < currentStep
                ? "bg-primary-500 text-white"
                : step.number === currentStep
                ? "bg-primary-500/20 text-primary-400 border border-primary-500"
                : "bg-neutral-800 text-neutral-500"
            }`}
          >
            {step.number < currentStep ? (
              <CheckIcon className="w-3 h-3" />
            ) : (
              step.number
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-neutral-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
          error ? "border-red-500/50" : "border-white/10"
        } text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500/50 transition-colors`}
      />
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-neutral-400 text-sm">{label}</span>
      <span className="text-white text-sm font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center"
      >
        <CheckIcon className="w-10 h-10 text-green-400" />
      </motion.div>

      <h2 className="text-2xl font-bold text-white mb-3">Message envoyé !</h2>
      <p className="text-neutral-400 mb-8 max-w-sm mx-auto">
        Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
      </p>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
      >
        Envoyer un autre message
      </button>
    </motion.div>
  );
}

// ============================================================================
// MAIN FORM SECTION
// ============================================================================

function ContactFormSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LeadCreateInput>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof LeadCreateInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.prenom?.trim()) newErrors.prenom = "Le prénom est requis";
      if (!formData.nom?.trim()) newErrors.nom = "Le nom est requis";
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

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

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
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setSubmitStatus("idle");
    setErrors({});
    setErrorMessage("");
  };

  return (
    <section className="py-16 relative">
      <div className="container-content">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left - Trust Column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TrustColumn />
          </motion.div>

          {/* Right - Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm">
              {submitStatus === "success" ? (
                <SuccessMessage onReset={handleReset} />
              ) : (
                <>
                  <ProgressBar currentStep={currentStep} />

                  {/* Step 1: Personal Info */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold text-white mb-6">
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
                    </motion.div>
                  )}

                  {/* Step 2: Contact Info */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold text-white mb-6">
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
                    </motion.div>
                  )}

                  {/* Step 3: Company Info */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold text-white mb-6">
                        Votre projet
                      </h2>
                      <FormInput
                        id="societe"
                        label="Société"
                        placeholder="Nom de votre entreprise"
                        value={formData.societe || ""}
                        onChange={(e) => updateField("societe", e.target.value)}
                        error={errors.societe}
                      />
                      <div className="mb-5">
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          placeholder="Décrivez votre projet ou votre besoin..."
                          value={formData.message || ""}
                          onChange={(e) => updateField("message", e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500/50 transition-colors resize-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Confirmation */}
                  {currentStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold text-white mb-6">
                        Confirmez vos informations
                      </h2>
                      <div className="p-5 rounded-xl bg-white/5 border border-white/10 mb-6">
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
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
                          {errorMessage}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 gap-4">
                    {currentStep > 1 ? (
                      <button
                        onClick={handleBack}
                        className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
                      >
                        Retour
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < TOTAL_STEPS ? (
                      <button
                        onClick={handleNext}
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                      >
                        Suivant
                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                        {!isSubmitting && <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CALENDLY SECTION
// ============================================================================

function CalendlySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 border-t border-neutral-800/50 relative overflow-hidden"
    >
      <GlowingOrb className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" color="blue" size="lg" />
      <GlowingOrb className="top-1/2 right-0 translate-x-1/2 -translate-y-1/2" color="purple" size="lg" />

      <div className="container-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6">
            <span className="text-secondary-400 text-sm font-medium">Rendez-vous</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ou prenez rendez-vous directement
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Choisissez un créneau qui vous convient pour un échange avec notre équipe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden bg-neutral-900/50 border border-white/10 backdrop-blur-sm p-2">
            <iframe
              src="https://calendly.com/horama"
              width="100%"
              height="630"
              frameBorder="0"
              title="Calendly - Prendre rendez-vous"
              className="rounded-xl bg-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-neutral-950 relative overflow-hidden">
      <GlowingOrb className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" color="blue" size="lg" />

      <div className="container-content relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Des questions ?
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10">
            Consultez nos pages services et cas d'usage pour en savoir plus
            sur nos solutions de Computer Vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/site_vitrine/services"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
            >
              Voir nos services
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/site_vitrine/cas-usage"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
            >
              Cas d'usage
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ContactPage() {
  return (
    <>
      <HeroSection />
      <ContactFormSection />
      <CalendlySection />
      <CTASection />
    </>
  );
}
