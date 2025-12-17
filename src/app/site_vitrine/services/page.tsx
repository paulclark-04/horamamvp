"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRightIcon,
  TargetIcon,
  SearchIcon,
  DocumentIcon,
  ChipIcon,
  ServerIcon,
  ShieldIcon,
  CheckIcon,
} from "@/components/icons";
import { FadeIn, GlowingOrb, StaggerContainer, staggerItem } from "@/components/ui/MotionWrapper";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

// Animated Gradient Text Component
function AnimatedGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
      {children}
    </span>
  );
}

// Grid Background Component
function GridBackground() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Radial gradient mask */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, black 70%)",
        }}
      />
    </div>
  );
}

// Floating Service Icon Component
interface FloatingIconProps {
  icon: React.ReactNode;
  label: string;
  color: "blue" | "purple" | "cyan";
  delay: number;
  position: { x: string; y: string };
}

function FloatingServiceIcon({ icon, label, color, delay, position }: FloatingIconProps) {
  const colorClasses = {
    blue: {
      bg: "from-primary-500/20 to-primary-600/5",
      border: "border-primary-500/30 hover:border-primary-400/50",
      icon: "text-primary-400",
      glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    },
    purple: {
      bg: "from-secondary-500/20 to-secondary-600/5",
      border: "border-secondary-500/30 hover:border-secondary-400/50",
      icon: "text-secondary-400",
      glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
    },
    cyan: {
      bg: "from-cyan-500/20 to-cyan-600/5",
      border: "border-cyan-500/30 hover:border-cyan-400/50",
      icon: "text-cyan-400",
      glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]",
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      className="absolute"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: 3 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.1 }}
    >
      <div
        className={`
          p-4 rounded-2xl bg-gradient-to-br ${colors.bg}
          border ${colors.border} backdrop-blur-sm
          transition-all duration-300 cursor-pointer
          ${colors.glow}
        `}
      >
        <div className={`w-8 h-8 ${colors.icon}`}>{icon}</div>
        <p className="text-white/80 text-xs mt-2 font-medium whitespace-nowrap">{label}</p>
      </div>
    </motion.div>
  );
}

// Floating Services Visual Component
function FloatingServicesVisual() {
  const services = [
    { icon: <TargetIcon className="w-full h-full" />, label: "Detection", color: "blue" as const, position: { x: "10%", y: "5%" }, delay: 0 },
    { icon: <SearchIcon className="w-full h-full" />, label: "Inspection", color: "purple" as const, position: { x: "60%", y: "0%" }, delay: 0.1 },
    { icon: <DocumentIcon className="w-full h-full" />, label: "OCR", color: "cyan" as const, position: { x: "35%", y: "35%" }, delay: 0.2 },
    { icon: <ChipIcon className="w-full h-full" />, label: "Edge AI", color: "blue" as const, position: { x: "5%", y: "60%" }, delay: 0.3 },
    { icon: <ServerIcon className="w-full h-full" />, label: "MLOps", color: "purple" as const, position: { x: "55%", y: "65%" }, delay: 0.4 },
  ];

  return (
    <div className="relative h-80 lg:h-96">
      {services.map((service, idx) => (
        <FloatingServiceIcon key={idx} {...service} />
      ))}
    </div>
  );
}

// Pulse Badge Component
function PulseBadge() {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(59, 130, 246, 0)",
          "0 0 0 8px rgba(59, 130, 246, 0.1)",
          "0 0 0 0 rgba(59, 130, 246, 0)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <ChipIcon className="w-4 h-4 text-primary-400" />
      <span className="text-primary-400 text-sm font-medium">Nos Services</span>
    </motion.div>
  );
}

// Page Header - Split Layout
function PageHeader() {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background */}
      <GridBackground />
      <GlowingOrb className="top-0 left-1/4 -translate-y-1/2" color="blue" size="lg" />
      <GlowingOrb className="bottom-0 right-1/4 translate-y-1/2" color="purple" size="md" />

      <div className="container-content relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left - Content (3 cols) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PulseBadge />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Solutions{" "}
              <AnimatedGradientText>Computer Vision</AnimatedGradientText>
              {" "}souveraines
            </h1>

            <p className="text-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
              De la conception a la production industrielle, une approche complete et securisee
              pour vos projets de vision par ordinateur.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/site_vitrine/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
              >
                Demander un diagnostic
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById("detection");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-all duration-300"
              >
                Voir nos services
              </button>
            </div>
          </motion.div>

          {/* Right - Floating Icons (2 cols) */}
          <motion.div
            className="lg:col-span-2 hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FloatingServicesVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Services Navigation (sticky)
function ServicesNav() {
  const services = [
    { id: "detection", label: "Detection" },
    { id: "inspection", label: "Inspection" },
    { id: "ocr", label: "OCR" },
    { id: "edge", label: "Edge AI" },
    { id: "mlops", label: "MLOps" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-16 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10">
      <div className="container-content py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              onClick={(e) => scrollToSection(e, service.id)}
              className="px-4 py-2 rounded-full text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
            >
              {service.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Service Card Component
interface ServiceCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  problems: string[];
  solutions: string[];
  results: { label: string; value: string }[];
  deployment: string[];
  color: "blue" | "purple" | "cyan";
  index: number;
}

function ServiceCard({
  id,
  icon,
  title,
  description,
  problems,
  solutions,
  results,
  deployment,
  color,
  index,
}: ServiceCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorClasses = {
    blue: {
      border: "border-primary-500/20 hover:border-primary-500/40",
      bg: "from-primary-500/10 to-transparent",
      icon: "text-primary-400 bg-primary-500/10",
      accent: "text-primary-400",
    },
    purple: {
      border: "border-secondary-500/20 hover:border-secondary-500/40",
      bg: "from-secondary-500/10 to-transparent",
      icon: "text-secondary-400 bg-secondary-500/10",
      accent: "text-secondary-400",
    },
    cyan: {
      border: "border-cyan-500/20 hover:border-cyan-500/40",
      bg: "from-cyan-500/10 to-transparent",
      icon: "text-cyan-400 bg-cyan-500/10",
      accent: "text-cyan-400",
    },
  };

  const colors = colorClasses[color];

  return (
    <section
      ref={ref}
      id={id}
      className="py-16 border-b border-neutral-800/50 last:border-b-0"
      style={{ scrollMarginTop: "180px" }}
    >
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-10"
        >
          {/* Left - Content */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.icon}`}>
                {icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
            </div>

            <p className="text-neutral-300 leading-relaxed mb-8">{description}</p>

            {/* Problems & Solutions Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* Problems */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                  Problematiques
                </h3>
                {problems.map((problem, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-red-400 mt-1">×</span>
                    <span className="text-neutral-400 text-sm">{problem}</span>
                  </motion.div>
                ))}
              </div>

              {/* Solutions */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                  Solutions
                </h3>
                {solutions.map((solution, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <CheckIcon className={`w-4 h-4 ${colors.accent} shrink-0 mt-0.5`} />
                    <span className="text-neutral-300 text-sm">{solution}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Deployment Tags */}
            <div>
              <h3 className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Deploiement</h3>
              <div className="flex flex-wrap gap-2">
                {deployment.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Results Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-sm`}
          >
            <h3 className="text-white font-semibold mb-6">Resultats mesures</h3>

            <div className="grid grid-cols-2 gap-6">
              {results.map((result, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  className="text-center p-4 rounded-xl bg-white/5"
                >
                  <div className={`text-2xl md:text-3xl font-bold ${colors.accent} mb-1`}>
                    {result.value}
                  </div>
                  <div className="text-neutral-400 text-sm">{result.label}</div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/site_vitrine/contact"
              className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border ${colors.border} text-white font-medium text-sm hover:bg-white/5 transition-all duration-300`}
            >
              En savoir plus
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Deployment Options Section
function DeploymentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const options = [
    {
      title: "Local / On-Premises",
      icon: <ServerIcon className="w-6 h-6" />,
      features: [
        "Controle total de l'infrastructure",
        "Maitrise complete des donnees",
        "Latence ultra-faible",
        "Conformite reglementaire maximale",
      ],
      color: "blue" as const,
    },
    {
      title: "Cloud Souverain",
      icon: <ShieldIcon className="w-6 h-6" />,
      features: [
        "Hebergement certifie europeen",
        "Certification SecNumCloud",
        "Chiffrement de bout en bout",
        "Traces d'audit completes",
      ],
      color: "purple" as const,
    },
  ];

  const colorClasses = {
    blue: "from-primary-500/20 to-primary-600/5 border-primary-500/20 hover:border-primary-500/40",
    purple: "from-secondary-500/20 to-secondary-600/5 border-secondary-500/20 hover:border-secondary-500/40",
  };

  const iconClasses = {
    blue: "text-primary-400",
    purple: "text-secondary-400",
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <GlowingOrb className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" color="blue" size="lg" />
      <GlowingOrb className="top-1/2 right-0 translate-x-1/2 -translate-y-1/2" color="purple" size="lg" />

      <div className="container-content relative z-10">
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6">
            <ShieldIcon className="w-4 h-4 text-secondary-400" />
            <span className="text-secondary-400 text-sm font-medium">Deploiement</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choisissez votre mode de deploiement
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Selon vos contraintes de securite et de performance, nous adaptons notre deploiement.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {options.map((option, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 md:p-8 rounded-2xl bg-gradient-to-br ${colorClasses[option.color]} border backdrop-blur-sm transition-all duration-300 hover:translate-y-[-4px]`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={iconClasses[option.color]}>{option.icon}</div>
                <h3 className="text-xl font-semibold text-white">{option.title}</h3>
              </div>
              <ul className="space-y-4">
                {option.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-neutral-950 relative overflow-hidden">
      <GlowingOrb className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" color="blue" size="lg" />

      <div className="container-content relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pret a deployer votre solution ?
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10">
            Contactez-nous pour un diagnostic gratuit de vos besoins en Computer Vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/site_vitrine/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
            >
              Demander un diagnostic
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/site_vitrine/expertise"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
            >
              Voir notre expertise
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Services Data
const services: Omit<ServiceCardProps, "index">[] = [
  {
    id: "detection",
    icon: <TargetIcon className="w-6 h-6" />,
    title: "Detection & Suivi d'Objets",
    description:
      "Solutions de detection, tracking et comptage pour applications industrielles et surveillance. Modeles optimises pour la performance temps reel.",
    problems: [
      "Surveillance de zones sensibles",
      "Comptage de personnes ou vehicules",
      "Suivi d'objets en mouvement",
      "Detection d'intrusions",
    ],
    solutions: [
      "Modeles YOLO optimises",
      "Multi-object tracking (DeepSORT)",
      "Detection temps reel",
      "Algorithmes de comptage precis",
    ],
    results: [
      { value: ">95%", label: "Precision" },
      { value: "<50ms", label: "Latence" },
      { value: "24/7", label: "Fiabilite" },
      { value: "-40%", label: "Couts" },
    ],
    deployment: ["Edge computing", "Serveurs on-prem", "Cameras IP", "IoT"],
    color: "blue",
  },
  {
    id: "inspection",
    icon: <SearchIcon className="w-6 h-6" />,
    title: "Inspection Visuelle & Controle Qualite",
    description:
      "Automatisation du controle qualite industriel avec detection de defauts microscopiques et classification en temps reel.",
    problems: [
      "Controle qualite manuel lent",
      "Defauts microscopiques",
      "Variabilite humaine",
      "Cadences industrielles elevees",
    ],
    solutions: [
      "Vision industrielle haute resolution",
      "IA de classification de defauts",
      "Inspection multi-spectrale",
      "Systemes d'eclairage adaptatifs",
    ],
    results: [
      { value: "0.1mm", label: "Detection" },
      { value: ">1000/h", label: "Cadence" },
      { value: "-90%", label: "Faux positifs" },
      { value: "<12 mois", label: "ROI" },
    ],
    deployment: ["Ligne de production", "Systemes PLC", "MES reporting", "Cameras industrielles"],
    color: "purple",
  },
  {
    id: "ocr",
    icon: <DocumentIcon className="w-6 h-6" />,
    title: "OCR & Lecture de Documents",
    description:
      "Extraction de texte multi-langues, reconnaissance d'ecriture manuscrite et traitement de documents degrades.",
    problems: [
      "Saisie manuelle de donnees",
      "Documents degrades ou varies",
      "Lecture de compteurs",
      "Texte manuscrit",
    ],
    solutions: [
      "OCR multi-langues avance",
      "Reconnaissance ecriture manuscrite",
      "Extraction donnees structurees",
      "Preprocessing adaptatif",
    ],
    results: [
      { value: ">99%", label: "Precision" },
      { value: "50+", label: "Langues" },
      { value: "Temps reel", label: "Traitement" },
      { value: "-95%", label: "Erreurs" },
    ],
    deployment: ["APIs REST", "Integration ERP/CRM", "Batch processing", "Mobile"],
    color: "cyan",
  },
  {
    id: "edge",
    icon: <ChipIcon className="w-6 h-6" />,
    title: "Edge AI & Embarque",
    description:
      "Deploiement de modeles IA directement sur cameras, appareils IoT et systemes embarques avec latence minimale.",
    problems: [
      "Latence reseau critique",
      "Bande passante limitee",
      "Confidentialite des donnees",
      "Fiabilite de la connexion",
    ],
    solutions: [
      "Optimisation ONNX/TensorRT",
      "Quantization et pruning",
      "Deploiement multi-plateforme",
      "Edge computing distribue",
    ],
    results: [
      { value: "<10ms", label: "Latence" },
      { value: "Optimisee", label: "Conso." },
      { value: "Offline", label: "Mode" },
      { value: "Renforcee", label: "Securite" },
    ],
    deployment: ["NVIDIA Jetson", "Intel NUC", "Google Coral TPU", "Raspberry Pi"],
    color: "blue",
  },
  {
    id: "mlops",
    icon: <ServerIcon className="w-6 h-6" />,
    title: "MLOps On-Prem",
    description:
      "Infrastructure complete pour le cycle de vie de vos modeles : CI/CD, monitoring, versioning et gouvernance IA.",
    problems: [
      "Derive des modeles",
      "Deploiement complexe",
      "Monitoring de performance",
      "Gouvernance IA",
    ],
    solutions: [
      "Pipeline MLOps automatise",
      "Monitoring de derive",
      "A/B testing de modeles",
      "Versioning donnees et modeles",
    ],
    results: [
      { value: "-70%", label: "Time-to-prod" },
      { value: ">99.9%", label: "Uptime" },
      { value: "Auto", label: "Detection" },
      { value: "Conforme", label: "Reglement." },
    ],
    deployment: ["Kubernetes", "Docker", "Infrastructure on-prem", "Cloud hybride"],
    color: "purple",
  },
];

// Main Page Component
export default function ServicesPage() {
  return (
    <>
      <PageHeader />
      <ServicesNav />

      <div id="services" className="bg-background">
        {services.map((service, index) => (
          <ServiceCard key={service.id} {...service} index={index} />
        ))}
      </div>

      <DeploymentSection />
      <CTASection />
    </>
  );
}
