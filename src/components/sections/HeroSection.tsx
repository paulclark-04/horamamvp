"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TrustedBy } from "@/components/ui/LogoCarousel";
import { ArrowRightIcon, PlayIcon } from "@/components/icons";

// Animated gradient text component
function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="inline-block bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-[length:200%_auto] bg-clip-text text-transparent"
      animate={{ backgroundPosition: ["0% center", "200% center"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}

// Typing animation for subtitle
function TypewriterText({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.03, delay: index * 0.02 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Stats card component
function StatCard({ value, suffix, prefix, label, delay }: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex flex-col items-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
        <div className="text-3xl md:text-4xl font-bold text-white mb-1">
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </div>
        <div className="text-sm text-neutral-400">{label}</div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-background to-background" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

        {/* Glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary-500/20 blur-[128px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary-500/20 blur-[128px]"
        />
      </motion.div>

      {/* Main content */}
      <motion.div style={{ opacity }} className="relative z-10 container-content pt-40 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main headline - ÉNORME */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9] mb-8"
          >
            Computer Vision
            <br />
            <GradientText>100% Souveraine</GradientText>
          </motion.h1>

          {/* Subtitle with typing effect */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-neutral-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            <TypewriterText text="Déployez vos modèles de vision IA en local et on-prem. Zéro dépendance aux clouds non souverains. Performance maximale." />
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/site_vitrine/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105"
            >
              <span className="relative z-10">Parler à un expert</span>
              <ArrowRightIcon className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Parler à un expert
                <ArrowRightIcon className="w-5 h-5" />
              </span>
            </Link>

            <Link
              href="/site_vitrine/services"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium text-base backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              <PlayIcon className="w-5 h-5" />
              <span>Voir la démo</span>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
          >
            <StatCard value={35} prefix="-" suffix="%" label="Faux positifs" delay={0.9} />
            <StatCard value={99} suffix="%" label="Précision OCR" delay={1.0} />
            <StatCard value={10} prefix="<" suffix="ms" label="Latence Edge" delay={1.1} />
            <StatCard value={100} suffix="%" label="Souverain" delay={1.2} />
          </motion.div>

          {/* Trusted By */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <TrustedBy />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-neutral-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-neutral-500"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
