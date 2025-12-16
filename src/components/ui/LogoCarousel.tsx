"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Defense", abbr: "DEF" },
  { name: "Nucleaire", abbr: "NUC" },
  { name: "Sante", abbr: "SAN" },
  { name: "BTP", abbr: "BTP" },
  { name: "Automobile", abbr: "AUTO" },
  { name: "Logistique", abbr: "LOG" },
  { name: "Securite", abbr: "SEC" },
  { name: "Industrie", abbr: "IND" },
];

export function LogoCarousel() {
  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient masks for smooth fade */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-12"
        animate={{ x: [0, -1200] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {/* Double the logos for seamless loop */}
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-900/50 border border-neutral-800"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
              <span className="text-accent text-xs font-bold">{logo.abbr}</span>
            </div>
            <span className="text-secondary text-sm whitespace-nowrap">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TrustedBy() {
  return (
    <div className="text-center">
      <p className="text-muted text-sm mb-6">
        Secteurs d&apos;excellence
      </p>
      <LogoCarousel />
    </div>
  );
}
