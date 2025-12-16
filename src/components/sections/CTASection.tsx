"use client";

import Link from "next/link";
import { FadeIn, GlowingOrb } from "@/components/ui/MotionWrapper";
import { ArrowRightIcon } from "@/components/icons";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export function CTASection({
  title = "Prêt à déployer une IA souveraine ?",
  description = "Discutons de vos besoins en Computer Vision et trouvons ensemble la solution adaptée à vos contraintes.",
  primaryCta = {
    text: "Demander un diagnostic gratuit",
    href: "/site_vitrine/contact",
  },
  secondaryCta = {
    text: "Organiser une conférence",
    href: "/site_vitrine/conferences",
  },
}: CTASectionProps) {
  return (
    <section className="section-lg hero-gradient relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <GlowingOrb className="top-0 left-1/4" color="blue" size="lg" />
        <GlowingOrb className="bottom-0 right-1/4" color="purple" size="lg" />
      </div>

      <div className="container-content text-center relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            {title}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-secondary text-lg max-w-2xl mx-auto mb-10">
            {description}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={primaryCta.href} className="btn-primary px-8 py-4 glow-blue">
              {primaryCta.text}
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-outline px-8 py-4">
                {secondaryCta.text}
              </Link>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
