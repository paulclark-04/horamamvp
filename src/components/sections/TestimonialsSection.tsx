"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { QuoteIcon, StarIcon, ArrowRightIcon } from "@/components/icons";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  rating: number;
  metric?: string;
  metricLabel?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "HORAMA a transformé notre chaîne de production. La détection de défauts est passée de 85% à 99.2% de précision, tout en gardant nos données 100% on-premise.",
    author: "Marie Dupont",
    role: "Directrice Qualité",
    company: "Automobile Industrie SA",
    rating: 5,
    metric: "-35%",
    metricLabel: "Faux positifs",
  },
  {
    id: 2,
    quote: "L'équipe a déployé notre solution OCR en moins de 6 semaines. La souveraineté des données était non-négociable pour nous, HORAMA l'a compris immédiatement.",
    author: "Jean-Pierre Martin",
    role: "DSI",
    company: "Banque Nationale",
    rating: 5,
    metric: "99.8%",
    metricLabel: "Précision OCR",
  },
  {
    id: 3,
    quote: "La latence de 8ms sur notre système de surveillance périmétrique dépasse toutes nos attentes. Une vraie prouesse technique en Edge AI.",
    author: "Sophie Laurent",
    role: "Responsable Sécurité",
    company: "Infrastructure Critique",
    rating: 5,
    metric: "<10ms",
    metricLabel: "Latence",
  },
];

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.5 }}
      className={`relative ${isActive ? "z-10" : "z-0"}`}
    >
      <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border border-white/10 backdrop-blur-xl overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />

        {/* Quote icon */}
        <div className="absolute top-6 right-6 text-primary-500/20">
          <QuoteIcon className="w-16 h-16" />
        </div>

        <div className="relative z-10">
          {/* Rating */}
          <div className="flex gap-1 mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-8">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                {testimonial.author.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-sm text-neutral-400">
                  {testimonial.role} · {testimonial.company}
                </div>
              </div>
            </div>

            {/* Metric */}
            {testimonial.metric && (
              <div className="hidden sm:block text-right">
                <div className="text-2xl font-bold text-primary-400">{testimonial.metric}</div>
                <div className="text-xs text-neutral-500">{testimonial.metricLabel}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-lg bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-500/5 blur-[128px]" />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ce que nos clients disent
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Des entreprises de secteurs critiques nous font confiance pour leur transformation IA souveraine.
          </p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={testimonials[activeIndex].id}
              testimonial={testimonials[activeIndex]}
              isActive={true}
            />
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-primary-500 w-8"
                  : "bg-neutral-700 hover:bg-neutral-600"
              }`}
            >
              {index === activeIndex && (
                <motion.div
                  layoutId="activeTestimonial"
                  className="absolute inset-0 rounded-full bg-primary-500"
                  transition={{ type: "spring", bounce: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Company logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-neutral-800"
        >
          <span className="text-neutral-500 text-sm">Ils nous font confiance :</span>
          <div className="flex items-center gap-8 text-neutral-600">
            {["Automobile SA", "Banque Nationale", "Infrastructure Critique", "Défense Tech"].map((company) => (
              <span key={company} className="text-sm font-medium hover:text-neutral-400 transition-colors cursor-default">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
