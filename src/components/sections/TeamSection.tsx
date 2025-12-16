"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn, GlowingOrb } from "@/components/ui/MotionWrapper";
import { ArrowRightIcon } from "@/components/icons";

export function TeamSection() {
  return (
    <section className="section-lg bg-background border-t border-neutral-800 relative overflow-hidden">
      <GlowingOrb className="-bottom-32 -left-32" color="purple" size="lg" />

      <div className="container-content relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <FadeIn direction="right">
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Glow effect behind image */}
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute -inset-4 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl blur-xl"
                />
                {/* Image container with explicit dimensions */}
                <div className="relative w-full h-full">
                  <Image
                    src="/images/baptiste-huvelle.png"
                    alt="Baptiste Huvelle - Fondateur & CEO de HORAMA"
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right - Content */}
          <div>
            <FadeIn>
              <p className="text-accent text-sm font-medium mb-3">Notre Équipe</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Baptiste Huvelle
              </h2>
              <p className="text-accent font-medium mb-4">Fondateur & CEO</p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-secondary leading-relaxed mb-6">
                Expert en Computer Vision et IA souveraine, Baptiste a fondé HORAMA avec la conviction
                que les entreprises françaises méritent des solutions d&apos;IA performantes sans compromis
                sur la souveraineté de leurs données.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-secondary leading-relaxed mb-8">
                Fort d&apos;une expérience en industrie et recherche, il accompagne les secteurs critiques
                (défense, santé, industrie, BTP, nucléaire) dans leur transformation numérique responsable.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Link href="/site_vitrine/contact" className="btn-accent">
                Prendre rendez-vous
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
