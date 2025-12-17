"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldIcon,
  ChipIcon,
  ServerIcon,
  LayersIcon,
} from "@/components/icons";
import { FadeIn, GlowingOrb } from "@/components/ui/MotionWrapper";

// Hook pour gérer le scroll vers les ancres
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

    // Délai pour laisser le DOM et les animations se charger
    setTimeout(scrollToHash, 300);

    // Écoute les changements de hash
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Animated Gradient Text
function AnimatedGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
      {children}
    </span>
  );
}

// Grid Background
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

// ============================================================================
// ORBITING TECH COMPONENTS
// ============================================================================

interface OrbitingTechItem {
  icon: string;
  label: string;
  color: "blue" | "purple" | "cyan";
}

// Single orbiting item
function OrbitingItem({
  icon,
  label,
  color,
  orbitRadius,
  duration,
  startAngle,
  reverse = false
}: OrbitingTechItem & {
  orbitRadius: number;
  duration: number;
  startAngle: number;
  reverse?: boolean;
}) {
  const colorClasses = {
    blue: "bg-primary-500/20 border-primary-500/40 shadow-primary-500/20",
    purple: "bg-secondary-500/20 border-secondary-500/40 shadow-secondary-500/20",
    cyan: "bg-cyan-500/20 border-cyan-500/40 shadow-cyan-500/20",
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
      }}
      animate={{
        rotate: reverse ? [startAngle, startAngle - 360] : [startAngle, startAngle + 360],
      }}
      transition={{
        rotate: {
          duration,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <motion.div
        className={`
          absolute px-3 py-2 rounded-xl backdrop-blur-md border
          ${colorClasses[color]} shadow-lg
          flex items-center gap-2
        `}
        style={{
          transform: `translateX(${orbitRadius}px) translateX(-50%) translateY(-50%)`,
        }}
        animate={{
          rotate: reverse ? [0, 360] : [0, -360],
        }}
        transition={{
          rotate: {
            duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        <span className="text-lg">{icon}</span>
        <span className="text-white text-xs font-medium whitespace-nowrap">{label}</span>
      </motion.div>
    </motion.div>
  );
}

// Orbit ring visual
function OrbitRing({ radius, opacity = 0.1 }: { radius: number; opacity?: number }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        opacity,
      }}
    />
  );
}

// Central element
function CentralElement() {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-2xl opacity-30 scale-150" />

      {/* Main circle */}
      <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary-600/80 to-secondary-600/80 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl">
        <div className="text-center">
          <div className="text-3xl md:text-4xl mb-1">🧠</div>
          <span className="text-white text-xs md:text-sm font-bold tracking-wider">EXPERTISE</span>
        </div>
      </div>

      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary-400/50"
        animate={{
          scale: [1, 1.4, 1.4],
          opacity: [0.5, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}

// Full orbiting visual
function OrbitingTechVisual() {
  // Inner orbit - 25s, clockwise
  const innerOrbit = [
    { icon: "🔥", label: "PyTorch", color: "blue" as const, startAngle: 0 },
    { icon: "🎯", label: "YOLO", color: "purple" as const, startAngle: 120 },
    { icon: "⚡", label: "TensorRT", color: "cyan" as const, startAngle: 240 },
  ];

  // Outer orbit - 35s, counter-clockwise
  const outerOrbit = [
    { icon: "☸️", label: "Kubernetes", color: "cyan" as const, startAngle: 45 },
    { icon: "🛡️", label: "SecNumCloud", color: "blue" as const, startAngle: 135 },
    { icon: "📊", label: "MLflow", color: "purple" as const, startAngle: 225 },
    { icon: "🐳", label: "Docker", color: "cyan" as const, startAngle: 315 },
  ];

  return (
    <div className="relative w-full h-[320px] md:h-[400px] lg:h-[450px]">
      {/* Orbit rings */}
      <OrbitRing radius={100} opacity={0.08} />
      <OrbitRing radius={170} opacity={0.05} />

      {/* Central element */}
      <CentralElement />

      {/* Inner orbit items */}
      {innerOrbit.map((item, idx) => (
        <OrbitingItem
          key={`inner-${idx}`}
          {...item}
          orbitRadius={100}
          duration={25}
          reverse={false}
        />
      ))}

      {/* Outer orbit items */}
      {outerOrbit.map((item, idx) => (
        <OrbitingItem
          key={`outer-${idx}`}
          {...item}
          orbitRadius={170}
          duration={35}
          reverse={true}
        />
      ))}
    </div>
  );
}

// Pulse Badge
function PulseBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
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
      {icon}
      <span className="text-primary-400 text-sm font-medium">{text}</span>
    </motion.div>
  );
}

// ============================================================================
// HERO SECTION - Orbiting Tech Style
// ============================================================================

function HeroSection() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      <GridBackground />
      <GlowingOrb className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" color="blue" size="lg" />
      <GlowingOrb className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" color="purple" size="lg" />

      <div className="container-content relative z-10">
        {/* Centered content */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PulseBadge
            icon={<LayersIcon className="w-4 h-4 text-primary-400" />}
            text="Notre Expertise"
          />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Un écosystème <AnimatedGradientText>technologique</AnimatedGradientText> complet
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Stack souveraine de pointe pour des solutions Computer Vision
            performantes, sécurisées et déployables on-premise.
          </p>
        </motion.div>

        {/* Orbiting visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:block"
        >
          <OrbitingTechVisual />
        </motion.div>

        {/* Mobile fallback - simple badges */}
        <div className="flex flex-wrap justify-center gap-3 md:hidden mb-8">
          {[
            { icon: "🔥", label: "PyTorch" },
            { icon: "🎯", label: "YOLO" },
            { icon: "☸️", label: "K8s" },
            { icon: "🛡️", label: "SecNum" },
            { icon: "📊", label: "MLOps" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2"
            >
              <span>{item.icon}</span>
              <span className="text-white text-sm">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/site_vitrine/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
          >
            Parler à un expert
            <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <button
            onClick={() => {
              const element = document.getElementById("stack");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
          >
            Explorer notre stack
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// NAVIGATION STICKY
// ============================================================================

function ExpertiseNav() {
  const sections = [
    { id: "stack", label: "Stack Technique" },
    { id: "certifications", label: "Certifications" },
    { id: "methodologie", label: "Methodologie" },
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
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => scrollToSection(e, section.id)}
              className="px-4 py-2 rounded-full text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// STACK TECHNIQUE SECTION
// ============================================================================

interface Technology {
  name: string;
  slug: string;
  icon: string;
  description: string;
  features: string[];
  useCase: string;
  link?: string;
}

interface TechCategory {
  category: string;
  slug: string;
  description: string;
  color: "blue" | "purple" | "cyan";
  items: Technology[];
}

const techCategories: TechCategory[] = [
  {
    category: "IA Frameworks",
    slug: "ia-frameworks",
    description: "Les fondations de nos modeles d'intelligence artificielle",
    color: "blue",
    items: [
      {
        name: "PyTorch",
        slug: "pytorch",
        icon: "🔥",
        description: "Framework deep learning leader pour la recherche et le deploiement de modeles IA.",
        features: ["Graphe dynamique", "Ecosysteme riche", "Support CUDA", "Integration ONNX"],
        useCase: "Entrainement de tous nos modeles custom de detection et classification.",
        link: "https://pytorch.org/",
      },
      {
        name: "ONNX",
        slug: "onnx",
        icon: "🔄",
        description: "Format ouvert pour l'interoperabilite des modeles ML entre frameworks.",
        features: ["Format universel", "Conversion multi-framework", "Optimisation auto", "Large support"],
        useCase: "Conversion de nos modeles PyTorch vers n'importe quel runtime cible.",
        link: "https://onnx.ai/",
      },
      {
        name: "TensorRT",
        slug: "tensorrt",
        icon: "⚡",
        description: "SDK NVIDIA pour l'inference haute performance sur GPU.",
        features: ["Kernel fusion", "Quantification FP16/INT8", "Latence sub-ms", "Throughput max"],
        useCase: "Pour les clients necessitant une latence < 10ms sur GPU NVIDIA.",
        link: "https://developer.nvidia.com/tensorrt",
      },
      {
        name: "OpenVINO",
        slug: "openvino",
        icon: "💎",
        description: "Toolkit Intel pour l'optimisation et le deploiement sur materiel Intel.",
        features: ["Optimisation auto", "Support CPU/GPU Intel", "Quantification INT8", "Edge devices"],
        useCase: "Deploiement sur serveurs CPU Intel avec performances proches du GPU.",
        link: "https://docs.openvino.ai/",
      },
    ],
  },
  {
    category: "Detection & Algorithmes",
    slug: "detection",
    description: "Algorithmes state-of-the-art pour la detection et le suivi",
    color: "purple",
    items: [
      {
        name: "YOLOv8/v9",
        slug: "yolo",
        icon: "🎯",
        description: "Architecture de detection d'objets temps reel la plus performante.",
        features: ["Detection une passe", "> 100 FPS", "Multi-taches", "Customisable"],
        useCase: "Notre choix par defaut pour 80% des projets de detection.",
        link: "https://docs.ultralytics.com/",
      },
      {
        name: "RT-DETR",
        slug: "rt-detr",
        icon: "🔍",
        description: "Premier transformer de detection temps reel avec precision superieure.",
        features: ["Architecture Transformer", "Pas de NMS", "Haute precision", "Scalable"],
        useCase: "Pour les cas necessitant une precision maximale comme l'inspection de defauts.",
      },
      {
        name: "DeepSORT",
        slug: "deepsort",
        icon: "📍",
        description: "Algorithme de tracking multi-objets robuste aux occlusions.",
        features: ["Tracking robuste", "Reidentification", "Temps reel", "Gestion entrees/sorties"],
        useCase: "Suivi de personnes ou vehicules dans des scenes complexes.",
      },
      {
        name: "SAM",
        slug: "sam",
        icon: "✂️",
        description: "Segment Anything Model de Meta pour segmentation universelle.",
        features: ["Zero-shot segmentation", "Prompts point/box/texte", "Production-ready", "Fine-tunable"],
        useCase: "Segmentation fine d'objets complexes sans dataset d'entrainement.",
        link: "https://segment-anything.com/",
      },
    ],
  },
  {
    category: "Infrastructure",
    slug: "infrastructure",
    description: "Stack d'infrastructure pour un deploiement scalable et securise",
    color: "cyan",
    items: [
      {
        name: "Kubernetes",
        slug: "kubernetes",
        icon: "☸️",
        description: "Plateforme d'orchestration de conteneurs pour le deploiement automatise.",
        features: ["Auto-scaling", "Self-healing", "Rolling updates", "Service discovery"],
        useCase: "Deploiement on-premise avec haute disponibilite et scalabilite automatique.",
        link: "https://kubernetes.io/",
      },
      {
        name: "Triton",
        slug: "triton",
        icon: "🚀",
        description: "NVIDIA Triton Inference Server pour le serving haute performance.",
        features: ["Multi-framework", "Dynamic batching", "Model ensemble", "GPU sharing"],
        useCase: "Serving de modeles a grande echelle avec optimisation automatique.",
        link: "https://developer.nvidia.com/triton-inference-server",
      },
      {
        name: "FastAPI",
        slug: "fastapi",
        icon: "⚙️",
        description: "Framework Python moderne pour APIs haute performance.",
        features: ["Async natif", "Validation Pydantic", "Swagger auto", "WebSocket"],
        useCase: "Construction des APIs REST pour l'integration des modeles IA.",
        link: "https://fastapi.tiangolo.com/",
      },
      {
        name: "Docker",
        slug: "docker",
        icon: "🐳",
        description: "Plateforme de conteneurisation pour environnements reproductibles.",
        features: ["Isolation", "Portabilite totale", "Images legeres", "Ecosysteme riche"],
        useCase: "Toutes nos solutions sont livrees en conteneurs Docker.",
        link: "https://www.docker.com/",
      },
    ],
  },
  {
    category: "MLOps & Monitoring",
    slug: "mlops",
    description: "Outils pour industrialiser le cycle de vie des modeles ML",
    color: "blue",
    items: [
      {
        name: "MLflow",
        slug: "mlflow",
        icon: "📊",
        description: "Plateforme pour gerer le cycle de vie complet du machine learning.",
        features: ["Tracking experiences", "Model Registry", "Packaging", "Multi-deploy"],
        useCase: "Suivi de toutes nos experiences et versioning des modeles.",
        link: "https://mlflow.org/",
      },
      {
        name: "Prometheus",
        slug: "prometheus",
        icon: "📈",
        description: "Systeme de monitoring et alerting pour la fiabilite en production.",
        features: ["Time-series", "PromQL", "Alerting flexible", "Service discovery"],
        useCase: "Monitoring temps reel des performances des modeles en production.",
        link: "https://prometheus.io/",
      },
      {
        name: "Grafana",
        slug: "grafana",
        icon: "📉",
        description: "Plateforme de visualisation pour dashboards interactifs.",
        features: ["Dashboards custom", "Multi-sources", "Alerting", "Collaboration"],
        useCase: "Tableaux de bord personnalises visualisant les KPIs des modeles IA.",
        link: "https://grafana.com/",
      },
      {
        name: "DVC",
        slug: "dvc",
        icon: "📁",
        description: "Data Version Control pour versioning de donnees et modeles ML.",
        features: ["Versioning gros fichiers", "Pipelines reproductibles", "Storage agnostique", "Integration Git"],
        useCase: "Gestion des datasets volumineux avec tracabilite complete.",
        link: "https://dvc.org/",
      },
    ],
  },
];

function TechCard({ tech, color }: { tech: Technology; color: "blue" | "purple" | "cyan" }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const colorClasses = {
    blue: {
      border: "border-primary-500/20 hover:border-primary-500/40",
      useCase: "bg-primary-500/10 border-primary-500/20",
      useCaseText: "text-primary-400",
      useCaseDesc: "text-primary-300",
    },
    purple: {
      border: "border-secondary-500/20 hover:border-secondary-500/40",
      useCase: "bg-secondary-500/10 border-secondary-500/20",
      useCaseText: "text-secondary-400",
      useCaseDesc: "text-secondary-300",
    },
    cyan: {
      border: "border-cyan-500/20 hover:border-cyan-500/40",
      useCase: "bg-cyan-500/10 border-cyan-500/20",
      useCaseText: "text-cyan-400",
      useCaseDesc: "text-cyan-300",
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      ref={ref}
      id={tech.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-2xl bg-neutral-900/50 border ${colors.border} backdrop-blur-sm transition-all duration-300`}
      style={{ scrollMarginTop: "180px" }}
    >
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl">{tech.icon}</span>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{tech.name}</h3>
          {tech.link && (
            <a
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              Documentation →
            </a>
          )}
        </div>
      </div>

      <p className="text-neutral-400 mb-4 text-sm">{tech.description}</p>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {tech.features.map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs bg-white/5 text-neutral-300 rounded-full border border-white/10"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className={`p-4 rounded-xl ${colors.useCase} border`}>
        <h4 className={`text-sm font-semibold ${colors.useCaseText} mb-2 flex items-center gap-2`}>
          <span>💡</span> Notre utilisation
        </h4>
        <p className={`text-sm ${colors.useCaseDesc}`}>{tech.useCase}</p>
      </div>
    </motion.div>
  );
}

function TechStackSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="stack"
      className="py-20 relative overflow-hidden"
      style={{ scrollMarginTop: "180px" }}
    >
      <div className="container-content">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <ChipIcon className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">Stack Technique</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technologies maitrisees
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Une selection rigoureuse des meilleures technologies pour chaque couche de la stack.
          </p>
        </FadeIn>

        {techCategories.map((category, catIdx) => (
          <div
            key={category.slug}
            id={category.slug}
            className="mb-16 last:mb-0"
            style={{ scrollMarginTop: "180px" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{category.category}</h3>
              <p className="text-neutral-400">{category.description}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((tech) => (
                <TechCard key={tech.name} tech={tech} color={category.color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// CERTIFICATIONS SECTION
// ============================================================================

const certifications = [
  {
    name: "SecNumCloud",
    icon: "🛡️",
    description: "Qualification ANSSI pour les services cloud souverains",
    features: ["Hebergement France", "Souverainete donnees", "Securite renforcee", "Audit ANSSI"],
    color: "blue" as const,
  },
  {
    name: "ISO 27001",
    icon: "📋",
    description: "Systeme de management de la securite de l'information",
    features: ["Gestion des risques", "Controles securite", "Amelioration continue", "Certification"],
    color: "purple" as const,
  },
  {
    name: "RGPD",
    icon: "🔒",
    description: "Conformite au reglement europeen sur les donnees personnelles",
    features: ["Privacy by design", "Droit a l'oubli", "Portabilite donnees", "DPO dedie"],
    color: "cyan" as const,
  },
  {
    name: "SOC 2",
    icon: "✅",
    description: "Securite, disponibilite et confidentialite des services",
    features: ["Controles d'acces", "Chiffrement", "Audit trails", "Disponibilite 99.9%"],
    color: "blue" as const,
  },
];

function CertificationCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const colorClasses = {
    blue: "from-primary-500/20 to-primary-600/5 border-primary-500/20 hover:border-primary-500/40",
    purple: "from-secondary-500/20 to-secondary-600/5 border-secondary-500/20 hover:border-secondary-500/40",
    cyan: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 hover:border-cyan-500/40",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`p-6 md:p-8 rounded-2xl bg-gradient-to-br ${colorClasses[cert.color]} border backdrop-blur-sm transition-all duration-300 hover:translate-y-[-4px]`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{cert.icon}</span>
        <h3 className="text-xl font-semibold text-white">{cert.name}</h3>
      </div>
      <p className="text-neutral-300 mb-6">{cert.description}</p>
      <ul className="space-y-3">
        {cert.features.map((feature, fidx) => (
          <li key={fidx} className="flex items-center gap-3">
            <CheckIcon className="w-5 h-5 text-green-400 shrink-0" />
            <span className="text-neutral-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="py-20 relative overflow-hidden"
      style={{ scrollMarginTop: "180px" }}
    >
      <GlowingOrb className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" color="blue" size="lg" />
      <GlowingOrb className="top-1/2 right-0 translate-x-1/2 -translate-y-1/2" color="purple" size="lg" />

      <div className="container-content relative z-10">
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6">
            <ShieldIcon className="w-4 h-4 text-secondary-400" />
            <span className="text-secondary-400 text-sm font-medium">Certifications</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Standards de securite
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Nous respectons les standards les plus exigeants pour garantir la securite
            et la conformite de vos projets.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, idx) => (
            <CertificationCard key={cert.name} cert={cert} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// METHODOLOGY SECTION
// ============================================================================

const principles = [
  {
    icon: "🔄",
    title: "Reproductibilite",
    description:
      "Chaque experience, chaque modele, chaque deploiement est versionne et reproductible. Tracabilite complete du lineage des donnees aux predictions.",
    color: "blue" as const,
  },
  {
    icon: "🛡️",
    title: "Securite by Design",
    description:
      "La securite n'est pas une couche ajoutee mais integree des la conception. Chiffrement, isolation, audits reguliers.",
    color: "purple" as const,
  },
  {
    icon: "⚡",
    title: "Performance Optimisee",
    description:
      "Optimisation systematique des modeles pour votre hardware cible. Quantization, pruning, compilation pour une inference ultra-rapide.",
    color: "cyan" as const,
  },
  {
    icon: "📚",
    title: "Documentation Complete",
    description:
      "Documentation technique exhaustive, guides d'utilisation, runbooks operationnels. Votre equipe est autonome.",
    color: "blue" as const,
  },
];

function MethodologySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorClasses = {
    blue: "from-primary-500/20 to-transparent border-primary-500/20",
    purple: "from-secondary-500/20 to-transparent border-secondary-500/20",
    cyan: "from-cyan-500/20 to-transparent border-cyan-500/20",
  };

  return (
    <section
      ref={ref}
      id="methodologie"
      className="py-20 border-t border-neutral-800/50"
      style={{ scrollMarginTop: "180px" }}
    >
      <div className="container-content">
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <ServerIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Notre Approche</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Principes fondamentaux
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Une methodologie rigoureuse pour garantir la qualite et la perennite de vos projets.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {principles.map((principle, idx) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[principle.color]} border backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{principle.icon}</span>
                <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed">{principle.description}</p>
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
            Besoin d'expertise technique ?
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10">
            Nos experts sont disponibles pour evaluer vos besoins et vous proposer
            une solution adaptee a vos contraintes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/site_vitrine/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
            >
              Parler a un expert
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

export default function ExpertisePage() {
  // Gère le scroll vers les ancres au chargement
  useHashScroll();

  return (
    <>
      <HeroSection />
      <ExpertiseNav />
      <TechStackSection />
      <CertificationsSection />
      <MethodologySection />
      <CTASection />
    </>
  );
}
