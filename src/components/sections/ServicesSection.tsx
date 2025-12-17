"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState, useRef } from "react";
import {
  TargetIcon,
  SearchIcon,
  DocumentIcon,
  ServerIcon,
  ChipIcon,
  ShieldIcon,
  ArrowRightIcon,
} from "@/components/icons";

// Service data with categories
const services = [
  {
    id: "detection",
    icon: <TargetIcon className="w-8 h-8" />,
    title: "Détection & Suivi",
    description: "Détection d'objets en temps réel, tracking multi-cibles, comptage automatisé pour applications industrielles critiques.",
    stats: { value: 95, suffix: "%", label: "Précision" },
    category: "ia",
    featured: true,
    color: "blue",
    demo: "detection",
    tags: ["IA", "Temps réel", "Industrie"],
  },
  {
    id: "inspection",
    icon: <SearchIcon className="w-8 h-8" />,
    title: "Inspection Visuelle",
    description: "Contrôle qualité automatisé, détection de défauts microscopiques, classification en temps réel.",
    stats: { value: 0.1, suffix: "mm", label: "Détection" },
    category: "ia",
    color: "cyan",
    demo: "inspection",
    tags: ["Qualité", "Automatisé"],
  },
  {
    id: "ocr",
    icon: <DocumentIcon className="w-8 h-8" />,
    title: "OCR & Documents",
    description: "Extraction multi-langues, reconnaissance d'écriture manuscrite, traitement de formulaires.",
    stats: { value: 99, suffix: "%", label: "Précision" },
    category: "ia",
    color: "purple",
    demo: "ocr",
    tags: ["Multi-langues", "Documents"],
  },
  {
    id: "edge",
    icon: <ChipIcon className="w-8 h-8" />,
    title: "Edge AI & Embarqué",
    description: "Déploiement ultra-basse latence sur caméras, IoT et systèmes embarqués. Optimisation hardware.",
    stats: { value: 10, prefix: "<", suffix: "ms", label: "Latence" },
    category: "infra",
    featured: true,
    color: "green",
    demo: "edge",
    tags: ["IoT", "Basse latence", "Edge"],
  },
  {
    id: "mlops",
    icon: <ServerIcon className="w-8 h-8" />,
    title: "MLOps On-Prem",
    description: "CI/CD pour modèles IA, monitoring de drift, versioning de données, A/B testing automatisé.",
    stats: { value: 70, prefix: "-", suffix: "%", label: "Time-to-prod" },
    category: "infra",
    color: "orange",
    demo: "mlops",
    tags: ["DevOps", "Monitoring", "CI/CD"],
  },
  {
    id: "security",
    icon: <ShieldIcon className="w-8 h-8" />,
    title: "Sécurité & Conformité",
    description: "Chiffrement bout-en-bout, isolation réseau stricte, zéro exfiltration. Certifications ISO 27001.",
    stats: { value: 100, suffix: "%", label: "Souverain" },
    category: "security",
    color: "red",
    demo: "security",
    tags: ["ISO 27001", "Chiffrement", "Souverain"],
  },
];

const categories = [
  { id: "all", label: "Tous" },
  { id: "ia", label: "Intelligence Artificielle" },
  { id: "infra", label: "Infrastructure" },
  { id: "security", label: "Sécurité" },
];

const colorVariants: Record<string, { bg: string; border: string; glow: string; text: string; iconGlow: string }> = {
  blue: {
    bg: "from-blue-500/20 to-blue-600/5",
    border: "group-hover:border-blue-500/50",
    glow: "rgba(59, 130, 246, 0.4)",
    text: "text-blue-400",
    iconGlow: "bg-blue-500/40",
  },
  cyan: {
    bg: "from-cyan-500/20 to-cyan-600/5",
    border: "group-hover:border-cyan-500/50",
    glow: "rgba(34, 211, 238, 0.4)",
    text: "text-cyan-400",
    iconGlow: "bg-cyan-500/40",
  },
  purple: {
    bg: "from-purple-500/20 to-purple-600/5",
    border: "group-hover:border-purple-500/50",
    glow: "rgba(168, 85, 247, 0.4)",
    text: "text-purple-400",
    iconGlow: "bg-purple-500/40",
  },
  green: {
    bg: "from-emerald-500/20 to-emerald-600/5",
    border: "group-hover:border-emerald-500/50",
    glow: "rgba(16, 185, 129, 0.4)",
    text: "text-emerald-400",
    iconGlow: "bg-emerald-500/40",
  },
  orange: {
    bg: "from-orange-500/20 to-orange-600/5",
    border: "group-hover:border-orange-500/50",
    glow: "rgba(249, 115, 22, 0.4)",
    text: "text-orange-400",
    iconGlow: "bg-orange-500/40",
  },
  red: {
    bg: "from-red-500/20 to-red-600/5",
    border: "group-hover:border-red-500/50",
    glow: "rgba(239, 68, 68, 0.4)",
    text: "text-red-400",
    iconGlow: "bg-red-500/40",
  },
};

// Mini demo animations for each service (always visible, intensified on hover)
function ServiceDemo({ type, isHovered }: { type: string; isHovered: boolean }) {
  const demos: Record<string, React.ReactNode> = {
    detection: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Scanning line */}
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
          {/* Detection boxes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 left-4 w-8 h-10 border-2 border-green-500 rounded"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-6 right-6 w-10 h-8 border-2 border-blue-500 rounded"
          />
        </div>
      </div>
    ),
    inspection: (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-500/50"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-500"
          />
        </motion.div>
      </div>
    ),
    ocr: (
      <div className="absolute inset-0 p-4 flex flex-col gap-1.5 justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ width: "0%" }}
            animate={{ width: ["0%", `${60 + i * 15}%`, `${60 + i * 15}%`] }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="h-1.5 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full"
          />
        ))}
      </div>
    ),
    edge: (
      <div className="absolute inset-0 flex items-center justify-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ height: ["30%", "80%", "30%"] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            className="w-2 bg-emerald-500 rounded-full"
            style={{ height: "30%" }}
          />
        ))}
      </div>
    ),
    mlops: (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="relative w-14 h-14"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-orange-500"
              style={{
                top: `${50 + 40 * Math.sin((i * 2 * Math.PI) / 3)}%`,
                left: `${50 + 40 * Math.cos((i * 2 * Math.PI) / 3)}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </motion.div>
      </div>
    ),
    security: (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-4 rounded-full bg-red-500/20 blur-md"
          />
          <ShieldIcon className="w-10 h-10 text-red-500" />
        </motion.div>
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0.08 }}
      animate={{ opacity: isHovered ? 0.35 : 0.08 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute inset-0 pointer-events-none"
    >
      {demos[type]}
    </motion.div>
  );
}

// Interactive service card with mouse tracking glow
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const colors = colorVariants[service.color];
  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${colors.glow}, transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm overflow-hidden transition-all duration-500 ${colors.border} ${
        service.featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Mouse tracking glow */}
      <motion.div
        style={{ background }}
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Demo animation background */}
      <ServiceDemo type={service.demo} isHovered={isHovered} />

      {/* Content */}
      <div className={`relative z-10 p-6 ${service.featured ? "md:p-8" : ""} h-full flex flex-col`}>
        {/* Icon with animated glow */}
        <div className="relative mb-4 w-16 h-16">
          {/* Glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute inset-0 rounded-xl blur-xl ${colors.iconGlow}`}
          />
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`relative w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${colors.text} group-hover:border-current/30 transition-colors duration-300`}
          >
            {service.icon}
          </motion.div>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-semibold text-white mb-2 group-hover:${colors.text} transition-colors duration-300`}>
          {service.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 ${colors.text} group-hover:bg-current/10 transition-colors duration-300`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-neutral-400 text-sm leading-relaxed mb-4 flex-grow">
          {service.description}
        </p>

        {/* Stats with animation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span
              className={`text-2xl font-bold ${colors.text}`}
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
            >
              {service.stats.prefix}
              {service.stats.value}
              {service.stats.suffix}
            </motion.span>
            <span className="text-neutral-500 text-sm">{service.stats.label}</span>
          </div>

          {/* Arrow indicator */}
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
            className={`${colors.text}`}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: isHovered ? "200%" : "-100%", opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
      />
    </motion.div>
  );
}

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = activeCategory === "all"
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <section className="section-lg bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[128px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary-500/10 blur-[128px] translate-y-1/2 -translate-x-1/2" />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4"
          >
            Nos Services
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Solutions Computer Vision{" "}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              complètes
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            De la conception à la production industrielle, une approche souveraine et sécurisée.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "text-white"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Services grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/site_vitrine/services"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300"
          >
            <span>Explorer tous nos services</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </motion.span>
          </Link>
          <p className="text-neutral-500 text-sm mt-4">
            Diagnostic gratuit • Réponse sous 24h
          </p>
        </motion.div>
      </div>
    </section>
  );
}
