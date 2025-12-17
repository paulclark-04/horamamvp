"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { QuoteIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

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

const AUTOPLAY_DURATION = 6000; // 6 secondes par témoignage

type CardPosition = "prev" | "active" | "next" | "hidden";

function getCardStyle(position: CardPosition) {
  const styles = {
    prev: {
      x: "-75%",
      scale: 0.75,
      rotateY: 25,
      opacity: 0.4,
      zIndex: 1,
      filter: "blur(2px)",
    },
    active: {
      x: "0%",
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 10,
      filter: "blur(0px)",
    },
    next: {
      x: "75%",
      scale: 0.75,
      rotateY: -25,
      opacity: 0.4,
      zIndex: 1,
      filter: "blur(2px)",
    },
    hidden: {
      x: "0%",
      scale: 0.5,
      rotateY: 0,
      opacity: 0,
      zIndex: 0,
      filter: "blur(4px)",
    },
  };
  return styles[position];
}

function TestimonialCard3D({
  testimonial,
  position,
  onClick,
}: {
  testimonial: Testimonial;
  position: CardPosition;
  onClick?: () => void;
}) {
  const style = getCardStyle(position);
  const isClickable = position === "prev" || position === "next";

  return (
    <motion.div
      initial={false}
      animate={{
        x: style.x,
        scale: style.scale,
        rotateY: style.rotateY,
        opacity: style.opacity,
        zIndex: style.zIndex,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        position: "absolute",
        width: "100%",
        transformStyle: "preserve-3d",
        perspective: "1000px",
        filter: style.filter,
      }}
      onClick={isClickable ? onClick : undefined}
      className={isClickable ? "cursor-pointer" : ""}
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
                {testimonial.author.split(" ").map((n) => n[0]).join("")}
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
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  }, []);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  // Calculer les positions des cards
  const getPosition = (index: number): CardPosition => {
    const diff = index - activeIndex;
    const length = testimonials.length;

    // Gérer le wrap-around
    const normalizedDiff = ((diff + length + 1) % length) - 1;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1 || (activeIndex === 0 && index === length - 1)) return "prev";
    if (normalizedDiff === 1 || (activeIndex === length - 1 && index === 0)) return "next";
    return "hidden";
  };

  // Auto-play avec progression
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + (100 / (AUTOPLAY_DURATION / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

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

        {/* 3D Carousel */}
        <div
          className="relative max-w-4xl mx-auto mb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ perspective: "1200px" }}
        >
          {/* Left arrow */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-20 z-30 w-12 h-12 rounded-full bg-neutral-800/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-primary-500/20 hover:border-primary-500/50 transition-all duration-300 group shadow-lg"
            aria-label="Témoignage précédent"
          >
            <ChevronLeftIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* 3D Cards Container */}
          <div className="relative h-[320px] md:h-[280px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => {
              const position = getPosition(index);
              return (
                <TestimonialCard3D
                  key={testimonial.id}
                  testimonial={testimonial}
                  position={position}
                  onClick={() => {
                    if (position === "prev") goToPrev();
                    if (position === "next") goToNext();
                  }}
                />
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-20 z-30 w-12 h-12 rounded-full bg-neutral-800/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-primary-500/20 hover:border-primary-500/50 transition-all duration-300 group shadow-lg"
            aria-label="Témoignage suivant"
          >
            <ChevronRightIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </div>
        </div>

        {/* Avatar navigation */}
        <div className="flex justify-center gap-4 mb-12">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToIndex(index)}
              className={`relative group transition-all duration-300 ${
                index === activeIndex ? "scale-110" : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`Voir le témoignage de ${testimonial.author}`}
            >
              {/* Avatar */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-gradient-to-br from-primary-500 to-secondary-500 ring-2 ring-primary-500 ring-offset-2 ring-offset-neutral-950"
                    : "bg-neutral-700 group-hover:bg-neutral-600"
                }`}
              >
                {testimonial.author.split(" ").map((n) => n[0]).join("")}
              </div>

              {/* Name tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="text-xs text-neutral-400 whitespace-nowrap">
                  {testimonial.author.split(" ")[0]}
                </span>
              </div>
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
