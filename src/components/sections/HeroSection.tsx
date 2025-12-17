"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
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

// ============================================
// FLUID PARTICLES ANIMATION
// ============================================

// Particules fluides avec positions fixes
const FLUID_PARTICLES = [
  { id: 0, x: 8, y: 15, size: 3 },
  { id: 1, x: 15, y: 45, size: 2.5 },
  { id: 2, x: 22, y: 75, size: 3.5 },
  { id: 3, x: 28, y: 25, size: 2 },
  { id: 4, x: 35, y: 55, size: 4 },
  { id: 5, x: 42, y: 85, size: 2.5 },
  { id: 6, x: 48, y: 20, size: 3 },
  { id: 7, x: 55, y: 50, size: 3.5 },
  { id: 8, x: 62, y: 80, size: 2 },
  { id: 9, x: 68, y: 30, size: 4 },
  { id: 10, x: 75, y: 60, size: 2.5 },
  { id: 11, x: 82, y: 90, size: 3 },
  { id: 12, x: 88, y: 40, size: 3.5 },
  { id: 13, x: 92, y: 70, size: 2 },
  { id: 14, x: 12, y: 65, size: 2.5 },
  { id: 15, x: 25, y: 35, size: 3 },
  { id: 16, x: 38, y: 10, size: 2 },
  { id: 17, x: 52, y: 40, size: 3.5 },
  { id: 18, x: 65, y: 15, size: 2.5 },
  { id: 19, x: 78, y: 45, size: 4 },
  { id: 20, x: 85, y: 20, size: 2 },
  { id: 21, x: 95, y: 55, size: 3 },
  { id: 22, x: 5, y: 80, size: 3.5 },
  { id: 23, x: 18, y: 5, size: 2.5 },
  { id: 24, x: 32, y: 70, size: 2 },
  { id: 25, x: 45, y: 95, size: 3 },
  { id: 26, x: 58, y: 65, size: 4 },
  { id: 27, x: 72, y: 85, size: 2.5 },
  { id: 28, x: 80, y: 10, size: 3 },
  { id: 29, x: 90, y: 35, size: 2 },
];

function FluidParticles() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.02);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {FLUID_PARTICLES.map((particle) => {
        // Mouvement fluide sinusoïdal
        const offsetX = Math.sin(time + particle.id * 0.5) * 20 + Math.cos(time * 0.7 + particle.id * 0.3) * 15;
        const offsetY = Math.cos(time + particle.id * 0.4) * 25 + Math.sin(time * 0.5 + particle.id * 0.6) * 10;
        const scale = 1 + Math.sin(time * 0.8 + particle.id) * 0.3;
        const opacity = 0.3 + Math.sin(time + particle.id * 0.2) * 0.2;

        return (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-br from-primary-400/60 to-secondary-400/40"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size * scale,
              height: particle.size * scale,
              transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`,
              opacity: opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(var(--color-primary-500), 0.3)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        );
      })}

      {/* Grandes bulles floues en arrière-plan */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-primary-500/10 blur-[80px]"
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: "10%", top: "20%" }}
      />
      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full bg-secondary-500/10 blur-[60px]"
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ right: "15%", top: "40%" }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full bg-primary-400/8 blur-[50px]"
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -60, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: "40%", bottom: "20%" }}
      />
    </div>
  );
}

// Neural network animation - positions fixes pour éviter hydration mismatch
const NEURAL_NODES = [
  { id: 0, x: 15, y: 25, duration: 2.5, delay: 0 },
  { id: 1, x: 35, y: 15, duration: 3, delay: 0.5 },
  { id: 2, x: 55, y: 30, duration: 2.8, delay: 1 },
  { id: 3, x: 75, y: 20, duration: 3.2, delay: 0.3 },
  { id: 4, x: 85, y: 45, duration: 2.6, delay: 1.5 },
  { id: 5, x: 70, y: 65, duration: 3.5, delay: 0.8 },
  { id: 6, x: 45, y: 55, duration: 2.4, delay: 1.2 },
  { id: 7, x: 25, y: 70, duration: 3.1, delay: 0.2 },
  { id: 8, x: 10, y: 50, duration: 2.9, delay: 1.8 },
  { id: 9, x: 60, y: 80, duration: 3.3, delay: 0.6 },
  { id: 10, x: 90, y: 75, duration: 2.7, delay: 1.1 },
  { id: 11, x: 40, y: 85, duration: 3.4, delay: 0.4 },
];

const NEURAL_CONNECTIONS = [
  { from: 0, to: 1, duration: 3.5, delay: 0 },
  { from: 1, to: 2, duration: 4, delay: 0.5 },
  { from: 2, to: 3, duration: 3.8, delay: 1 },
  { from: 3, to: 4, duration: 4.2, delay: 0.3 },
  { from: 4, to: 5, duration: 3.6, delay: 1.5 },
  { from: 5, to: 6, duration: 4.5, delay: 0.8 },
  { from: 6, to: 7, duration: 3.9, delay: 1.2 },
  { from: 7, to: 8, duration: 4.1, delay: 0.2 },
  { from: 8, to: 0, duration: 3.7, delay: 1.8 },
  { from: 2, to: 6, duration: 4.3, delay: 0.6 },
  { from: 5, to: 9, duration: 3.4, delay: 1.1 },
  { from: 9, to: 10, duration: 4.4, delay: 0.4 },
  { from: 10, to: 4, duration: 3.3, delay: 1.4 },
  { from: 6, to: 11, duration: 4.6, delay: 0.9 },
  { from: 11, to: 9, duration: 3.2, delay: 1.6 },
];

function NeuralNetwork() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {/* Gradient definition */}
        <defs>
          <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--color-primary-500))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(var(--color-secondary-500))" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Connection lines */}
        {NEURAL_CONNECTIONS.map((conn, i) => (
          <motion.line
            key={i}
            x1={`${NEURAL_NODES[conn.from].x}%`}
            y1={`${NEURAL_NODES[conn.from].y}%`}
            x2={`${NEURAL_NODES[conn.to].x}%`}
            y2={`${NEURAL_NODES[conn.to].y}%`}
            stroke="url(#neural-gradient)"
            strokeWidth="1"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: conn.duration,
              repeat: Infinity,
              delay: conn.delay,
            }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {NEURAL_NODES.map((node) => (
        <motion.div
          key={node.id}
          className="absolute w-2 h-2 rounded-full bg-primary-500/50"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            delay: node.delay,
          }}
        />
      ))}
    </div>
  );
}

// Mouse follow glow effect
function MouseFollowGlow({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [containerRef, mouseX, mouseY]);

  return (
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(var(--color-primary-500), 0.15) 0%, transparent 70%)",
      }}
    />
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

        {/* Neural Network effect */}
        <NeuralNetwork />
      </motion.div>

      {/* Fluid particles animation */}
      <FluidParticles />

      {/* Mouse follow glow */}
      <MouseFollowGlow containerRef={containerRef} />

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
