"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeIn, GlowingOrb } from "@/components/ui/MotionWrapper";

const stats = [
  { value: 35, prefix: "-", suffix: "%", label: "Faux positifs", description: "Inspection qualité automobile" },
  { value: 20, prefix: "+", suffix: "%", label: "Cadence", description: "Surveillance périmétrique" },
  { value: 99.8, suffix: "%", label: "Précision", description: "OCR industriel" },
  { value: 10, prefix: "<", suffix: "ms", label: "Latence", description: "Edge AI embarqué" },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-lg hero-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <GlowingOrb className="top-0 left-1/4" color="purple" size="lg" />
      <GlowingOrb className="bottom-0 right-1/4" color="blue" size="md" />

      <div className="container-content relative z-10">
        <FadeIn className="text-center mb-12">
          <p className="text-accent text-sm font-medium mb-3">Résultats Clients</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Des résultats mesurables
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-glass text-center p-8"
            >
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                {isInView && (
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <div className="text-primary font-semibold mb-2">{stat.label}</div>
              <div className="text-muted text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
