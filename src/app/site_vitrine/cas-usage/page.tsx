"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
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
import { FadeIn, GlowingOrb } from "@/components/ui/MotionWrapper";

// ============================================================================
// HOOKS & UTILITIES
// ============================================================================

function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    setTimeout(scrollToHash, 300);
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
}

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
    <div className="absolute inset-0 z-0">
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
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, black 70%)",
        }}
      />
    </div>
  );
}

// Floating Sector Badge for Hero
interface FloatingSectorBadgeProps {
  icon: string;
  label: string;
  color: string;
  position: { x: string; y: string };
  delay: number;
}

function FloatingSectorBadge({ icon, label, color, position, delay }: FloatingSectorBadgeProps) {
  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div
        className={`px-4 py-2 rounded-full ${color} backdrop-blur-sm border border-white/20 flex items-center gap-2 shadow-lg`}
      >
        <span className="text-lg">{icon}</span>
        <span className="text-white text-sm font-medium">{label}</span>
      </div>
    </motion.div>
  );
}

// ============================================================================
// HERO SECTION - Centered with floating sector badges
// ============================================================================

function HeroSection() {
  const sectorBadges = [
    { icon: "🚗", label: "Automobile", color: "bg-blue-600/80", position: { x: "5%", y: "20%" }, delay: 0 },
    { icon: "🏗️", label: "BTP", color: "bg-orange-600/80", position: { x: "85%", y: "15%" }, delay: 0.1 },
    { icon: "🛡️", label: "Défense", color: "bg-slate-700/80", position: { x: "0%", y: "60%" }, delay: 0.2 },
    { icon: "⚡", label: "Nucléaire", color: "bg-amber-600/80", position: { x: "88%", y: "55%" }, delay: 0.3 },
    { icon: "🏥", label: "Santé", color: "bg-teal-600/80", position: { x: "8%", y: "85%" }, delay: 0.4 },
    { icon: "📦", label: "Logistique", color: "bg-purple-600/80", position: { x: "82%", y: "80%" }, delay: 0.5 },
  ];

  return (
    <section className="pt-32 pb-32 md:pt-40 md:pb-40 relative overflow-hidden">
      <GridBackground />
      <GlowingOrb className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" color="blue" size="lg" />
      <GlowingOrb className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" color="purple" size="lg" />

      {/* Floating sector badges */}
      {sectorBadges.map((badge, idx) => (
        <FloatingSectorBadge key={idx} {...badge} />
      ))}

      <div className="container-content relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0)",
                "0 0 0 8px rgba(59, 130, 246, 0.1)",
                "0 0 0 0 rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <TargetIcon className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">Cas d'usage</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Des résultats <AnimatedGradientText>concrets</AnimatedGradientText> dans les secteurs critiques
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-10 max-w-3xl mx-auto">
            Découvrez comment notre expertise en Computer Vision transforme
            les industries stratégiques françaises.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/site_vitrine/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
            >
              Discuter de votre projet
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button
              onClick={() => {
                const element = document.getElementById("secteurs");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
            >
              Voir les secteurs
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// NAVIGATION STICKY
// ============================================================================

function SectorsNav() {
  const sectors = [
    { id: "automobile", label: "Automobile" },
    { id: "btp", label: "BTP" },
    { id: "defense", label: "Défense" },
    { id: "nucleaire", label: "Nucléaire" },
    { id: "sante", label: "Santé" },
    { id: "logistique", label: "Logistique" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-16 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10">
      <div className="container-content py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {sectors.map((sector) => (
            <a
              key={sector.id}
              href={`#${sector.id}`}
              onClick={(e) => scrollToSection(e, sector.id)}
              className="px-4 py-2 rounded-full text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
            >
              {sector.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// STATS SECTION
// ============================================================================

function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "-35%", label: "Faux positifs", description: "Inspection qualité automobile", color: "blue" },
    { value: "+20%", label: "Cadence", description: "Surveillance périmétrique", color: "purple" },
    { value: "99.8%", label: "Précision", description: "OCR industriel", color: "cyan" },
    { value: "<10ms", label: "Latence", description: "Edge AI embarqué", color: "blue" },
  ];

  const colorClasses = {
    blue: "from-primary-500/20 to-primary-600/5 border-primary-500/20",
    purple: "from-secondary-500/20 to-secondary-600/5 border-secondary-500/20",
    cyan: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20",
  };

  const textColors = {
    blue: "text-primary-400",
    purple: "text-secondary-400",
    cyan: "text-cyan-400",
  };

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      <div className="container-content">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} border backdrop-blur-sm text-center`}
            >
              <div className={`text-4xl md:text-5xl font-bold ${textColors[stat.color as keyof typeof textColors]} mb-2`}>
                {stat.value}
              </div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-neutral-400 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTORS SECTION
// ============================================================================

interface Sector {
  id: string;
  title: string;
  icon: string;
  color: string;
  borderColor: string;
  challenges: string[];
  solutions: string[];
  results: { value: string; label: string }[];
}

const sectors: Sector[] = [
  {
    id: "automobile",
    title: "Industrie Automobile",
    icon: "🚗",
    color: "from-blue-600 to-blue-800",
    borderColor: "border-blue-500/30 hover:border-blue-400/50",
    challenges: [
      "Contrôle qualité manuel lent et coûteux",
      "Détection de défauts microscopiques",
      "Cadences de production élevées",
    ],
    solutions: [
      "Inspection visuelle automatisée haute résolution",
      "Classification de défauts par deep learning",
      "Intégration directe aux lignes de production",
    ],
    results: [
      { value: "-35%", label: "Faux positifs" },
      { value: "+1000", label: "Pièces/h" },
      { value: "<12", label: "Mois ROI" },
    ],
  },
  {
    id: "btp",
    title: "BTP & Construction",
    icon: "🏗️",
    color: "from-orange-600 to-orange-800",
    borderColor: "border-orange-500/30 hover:border-orange-400/50",
    challenges: [
      "Sécurité des chantiers",
      "Suivi d'avancement en temps réel",
      "Détection des non-conformités",
    ],
    solutions: [
      "Détection d'EPI et zones dangereuses",
      "Suivi automatique de l'avancement",
      "Analyse d'images drone et satellite",
    ],
    results: [
      { value: "-40%", label: "Incidents" },
      { value: "24/7", label: "Monitoring" },
      { value: "Auto", label: "Alertes" },
    ],
  },
  {
    id: "defense",
    title: "Défense & Sécurité",
    icon: "🛡️",
    color: "from-slate-700 to-slate-900",
    borderColor: "border-slate-500/30 hover:border-slate-400/50",
    challenges: [
      "Surveillance périmétrique 24/7",
      "Détection d'intrusions",
      "Souveraineté des données critique",
    ],
    solutions: [
      "Multi-object tracking temps réel",
      "Détection de comportements anormaux",
      "Déploiement 100% on-premise",
    ],
    results: [
      { value: "+20%", label: "Cadence" },
      { value: "0", label: "Cloud" },
      { value: "100%", label: "Souverain" },
    ],
  },
  {
    id: "nucleaire",
    title: "Nucléaire & Énergie",
    icon: "⚡",
    color: "from-yellow-600 to-amber-700",
    borderColor: "border-amber-500/30 hover:border-amber-400/50",
    challenges: [
      "Inspection de zones à risque",
      "Lecture de compteurs et capteurs",
      "Conformité réglementaire stricte",
    ],
    solutions: [
      "Vision robotisée pour zones inaccessibles",
      "OCR industriel haute précision",
      "Traçabilité complète des inspections",
    ],
    results: [
      { value: "99.8%", label: "Précision" },
      { value: "ISO", label: "27001" },
      { value: "Auto", label: "Audits" },
    ],
  },
  {
    id: "sante",
    title: "Santé & Médical",
    icon: "🏥",
    color: "from-teal-600 to-teal-800",
    borderColor: "border-teal-500/30 hover:border-teal-400/50",
    challenges: [
      "Analyse d'images médicales",
      "Confidentialité des données patients",
      "Aide au diagnostic",
    ],
    solutions: [
      "Détection assistée par IA",
      "Hébergement HDS certifié",
      "Intégration aux systèmes existants",
    ],
    results: [
      { value: "RGPD", label: "Conforme" },
      { value: "HDS", label: "Certifié" },
      { value: "100%", label: "Traçable" },
    ],
  },
  {
    id: "logistique",
    title: "Logistique & Transport",
    icon: "📦",
    color: "from-purple-600 to-purple-800",
    borderColor: "border-purple-500/30 hover:border-purple-400/50",
    challenges: [
      "Comptage et tri automatique",
      "Lecture de codes et étiquettes",
      "Optimisation des flux",
    ],
    solutions: [
      "Détection et classification temps réel",
      "OCR multi-formats",
      "Intégration WMS/TMS",
    ],
    results: [
      { value: "+30%", label: "Productivité" },
      { value: "<50ms", label: "Latence" },
      { value: "24/7", label: "Opérationnel" },
    ],
  },
];

function SectorCard({ sector, index }: { sector: Sector; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      id={sector.id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-2xl overflow-hidden border ${sector.borderColor} backdrop-blur-sm transition-all duration-300 hover:translate-y-[-4px] h-full flex flex-col`}
      style={{ scrollMarginTop: "180px" }}
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${sector.color} p-6`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">
            {sector.icon}
          </div>
          <h3 className="text-2xl font-bold text-white">{sector.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-neutral-900/50 flex flex-col flex-1">
        <div className="space-y-6 flex-grow">
          {/* Challenges */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Défis</h4>
            <ul className="space-y-2">
              {sector.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">×</span>
                  <span className="text-neutral-400 text-sm">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Solutions HORAMA</h4>
            <ul className="space-y-2">
              {sector.solutions.map((solution, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-neutral-300 text-sm">{solution}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Résultats</h4>
            <div className="grid grid-cols-3 gap-3">
              {sector.results.map((result, idx) => (
                <div key={idx} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg font-bold text-white">{result.value}</div>
                  <div className="text-neutral-400 text-xs">{result.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/site_vitrine/contact"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-all duration-300 mt-6"
        >
          En savoir plus
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

function SectorsSection() {
  return (
    <section id="secteurs" className="py-20 relative overflow-hidden" style={{ scrollMarginTop: "180px" }}>
      <GlowingOrb className="top-1/3 left-0 -translate-x-1/2" color="blue" size="lg" />
      <GlowingOrb className="bottom-1/3 right-0 translate-x-1/2" color="purple" size="lg" />

      <div className="container-content relative z-10">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6">
            <ShieldIcon className="w-4 h-4 text-secondary-400" />
            <span className="text-secondary-400 text-sm font-medium">Secteurs d'application</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Une expertise multi-sectorielle
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Nos solutions s'adaptent aux contraintes spécifiques de chaque secteur critique.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <SectorCard key={sector.id} sector={sector} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SOLUTIONS SECTION
// ============================================================================

function SolutionsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const solutions = [
    {
      title: "Détection & Suivi d'Objets",
      icon: <TargetIcon className="w-8 h-8" />,
      description:
        "Nos algorithmes YOLO optimisés identifient, classifient et suivent des objets en temps réel avec une précision supérieure à 95%.",
      features: ["Multi-object tracking", "Comptage précis", "Détection temps réel", "Alertes automatiques"],
      color: "blue" as const,
    },
    {
      title: "Inspection Visuelle",
      icon: <SearchIcon className="w-8 h-8" />,
      description:
        "Automatisez le contrôle qualité avec une détection de défauts jusqu'à 0.1mm de précision sur vos lignes de production.",
      features: ["Défauts microscopiques", "Classification auto", "Intégration PLC", "Reporting MES"],
      color: "purple" as const,
    },
    {
      title: "OCR & Documents",
      icon: <DocumentIcon className="w-8 h-8" />,
      description:
        "Extrayez automatiquement les informations de documents variés avec une précision supérieure à 99% en multi-langues.",
      features: ["50+ langues", "Écriture manuscrite", "Documents dégradés", "Temps réel"],
      color: "cyan" as const,
    },
    {
      title: "Edge AI Embarqué",
      icon: <ChipIcon className="w-8 h-8" />,
      description:
        "Déployez des modèles optimisés directement sur vos équipements pour un traitement local avec moins de 10ms de latence.",
      features: ["Jetson / Intel NUC", "Mode offline", "Faible conso", "Sécurité renforcée"],
      color: "blue" as const,
    },
  ];

  const colorClasses = {
    blue: {
      icon: "text-primary-400 bg-primary-500/10",
      border: "border-primary-500/20 hover:border-primary-500/40",
    },
    purple: {
      icon: "text-secondary-400 bg-secondary-500/10",
      border: "border-secondary-500/20 hover:border-secondary-500/40",
    },
    cyan: {
      icon: "text-cyan-400 bg-cyan-500/10",
      border: "border-cyan-500/20 hover:border-cyan-500/40",
    },
  };

  return (
    <section ref={ref} className="py-20 border-t border-neutral-800/50">
      <div className="container-content">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <ChipIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Nos Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technologies déployées
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Des solutions éprouvées pour répondre à vos besoins spécifiques.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-2xl bg-neutral-900/50 border ${colorClasses[solution.color].border} backdrop-blur-sm transition-all duration-300`}
            >
              <div className={`w-16 h-16 rounded-2xl ${colorClasses[solution.color].icon} flex items-center justify-center mb-6`}>
                {solution.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
              <p className="text-neutral-400 mb-6">{solution.description}</p>
              <div className="flex flex-wrap gap-2">
                {solution.features.map((feature, fidx) => (
                  <span
                    key={fidx}
                    className="px-3 py-1 text-xs bg-white/5 text-neutral-300 rounded-full border border-white/10"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
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
            Vous avez un projet similaire ?
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10">
            Contactez-nous pour un diagnostic gratuit et découvrez comment
            la Computer Vision peut transformer votre activité.
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
              href="/site_vitrine/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
            >
              Voir nos services
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

export default function CasUsagePage() {
  useHashScroll();

  return (
    <>
      <HeroSection />
      <SectorsNav />
      <StatsSection />
      <SectorsSection />
      <SolutionsSection />
      <CTASection />
    </>
  );
}
