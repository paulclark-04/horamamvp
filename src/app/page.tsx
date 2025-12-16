"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  AnnouncementBanner,
  HeroSection,
  ProblemSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection,
  MethodologySection,
  ComparisonSection,
  TechnologiesSection,
  TeamSection,
  FAQSection,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Banner - Fixed at top */}
      <AnnouncementBanner
        badge="Nouveau"
        text="HORAMA sélectionné pour le CES 2026 Las Vegas"
        linkText="En savoir plus"
        href="/site_vitrine/actualites"
      />

      <Header />

      <main>
        {/* Hero - Impact immédiat */}
        <HeroSection />

        {/* Problem - Pourquoi nous ? */}
        <ProblemSection />

        {/* Services - Ce qu'on fait */}
        <ServicesSection />

        {/* Stats - Preuves chiffrées */}
        <StatsSection />

        {/* Testimonials - Social proof */}
        <TestimonialsSection />

        {/* Methodology - Comment on travaille */}
        <MethodologySection />

        {/* Comparison - vs Concurrence */}
        <ComparisonSection />

        {/* Technologies - Stack technique */}
        <TechnologiesSection />

        {/* Team - Qui sommes-nous */}
        <TeamSection />

        {/* FAQ - Questions fréquentes */}
        <FAQSection />

        {/* CTA Final - Conversion */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
