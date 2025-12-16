"use client";

import { motion } from "framer-motion";
import { ShieldIcon, LockIcon, ServerIcon } from "@/components/icons";

// Problem Card Component
interface ProblemCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

function ProblemCard({ title, description, icon, index }: ProblemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative"
    >
      {/* Card Container */}
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 md:p-8 backdrop-blur-xl transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_0_40px_rgba(239,68,68,0.1)]">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 via-orange-500/5 to-transparent blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition-all duration-300 group-hover:bg-red-500/20 group-hover:text-red-300">
            {icon}
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-semibold text-white md:text-2xl">
            {title}
          </h3>

          {/* Description */}
          <p className="text-base leading-relaxed text-neutral-400 md:text-lg">
            {description}
          </p>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-500/5 blur-2xl transition-all duration-500 group-hover:bg-red-500/10" />
      </div>
    </motion.div>
  );
}

// Animated Line Component
function AnimatedLine({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="hidden md:block absolute left-1/2 top-0 h-full w-px origin-top bg-gradient-to-b from-red-500/50 via-red-500/20 to-transparent"
    />
  );
}

// Main Problem Section Component
export function ProblemSection() {
  const problems = [
    {
      title: "Vos secrets ne sont plus les votres",
      description:
        "Vos donnees critiques transitent par des serveurs etrangers. Conformite RGPD / LPM devient impossible. Risque d'amendes, d'audits, de blocage reglementaire.",
      icon: <ShieldIcon className="h-6 w-6" />,
    },
    {
      title: "Performance sacrifiee",
      description:
        "Latence cloud de 200-500ms+ : chaque milliseconde perdue = defauts non detectes, decisions retardees, production ralentie.",
      icon: <ServerIcon className="h-6 w-6" />,
    },
    {
      title: "Vous etes otage",
      description:
        "Verrouillage fournisseur total. Tarifs qui grimpent. Migration impossible.",
      icon: <LockIcon className="h-6 w-6" />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Red glow at top */}
        <div className="absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-red-500/10 blur-[120px]" />
      </div>

      <div className="container-content relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:mb-20"
        >
          {/* Tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="text-sm font-medium text-red-400">
              Situation actuelle
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Le{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Probleme
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-lg text-neutral-400 md:text-xl">
            Les solutions cloud traditionnelles mettent votre entreprise en danger
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              title={problem.title}
              description={problem.description}
              icon={problem.icon}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center md:mt-20"
        >
          <p className="mb-2 text-sm text-neutral-500">
            Il existe une alternative
          </p>
          <div className="inline-flex items-center gap-2 text-lg font-medium text-white">
            <span>Decouvrez la souverainete numerique</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-primary-400"
            >
              &rarr;
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
