"use client";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRightIcon,
  TeamIcon,
  ValuesIcon,
  RocketIcon,
  UploadIcon,
  CheckIcon,
} from "@/components/icons";

// Hero Section
function HeroSection() {
  return (
    <section className="relative pt-16 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="hero-glow" style={{ width: "1000px", height: "600px" }} />

      <div className="relative z-10 container-content text-center py-24 md:py-32">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
          Rejoignez l&apos;aventure HORAMA
        </h1>
        <p className="text-base md:text-lg text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
          HORAMA construit l&apos;avenir de l&apos;IA souveraine pour les secteurs critiques.
          Nous developpons des solutions de Computer Vision sur-mesure, deployees en toute
          souverainete, pour la defense, la sante, l&apos;industrie, le BTP et le nucleaire.
        </p>
        <p className="text-base md:text-lg text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
          Rejoindre HORAMA, c&apos;est travailler sur des projets a fort impact,
          aux enjeux strategiques pour la France et l&apos;Europe. C&apos;est aussi
          participer a une aventure entrepreneuriale portee par l&apos;excellence
          technique, l&apos;ethique et la souverainete numerique.
        </p>
        <Link href="#postes" className="btn-accent">
          Voir les offres
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* Team Gallery */}
      <div className="relative z-10 container-content pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="aspect-video bg-gradient-to-br from-primary-600 via-white to-red-600 rounded-xl" />
          <div className="aspect-video bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-xl" />
          <div className="aspect-video bg-gradient-to-br from-cyan-600 to-teal-800 rounded-xl hidden md:block" />
        </div>
      </div>
    </section>
  );
}

// Who Are We Section
function WhoAreWeSection() {
  return (
    <section className="section-lg bg-background">
      <div className="container-content">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <TeamIcon className="w-12 h-12 text-accent" />
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Qui sommes-nous ?
              </h2>
            </div>
            <p className="text-secondary leading-relaxed mb-6">
              HORAMA est une startup deeptech fondee en 2025 par Baptiste Huvelle,
              ingenieur diplome de l&apos;ECE en specialisation Defense &amp; Technologie.
            </p>
            <p className="text-secondary leading-relaxed mb-6">
              Selectionnes pour le CES 2026 a Las Vegas, nous ambitionnons de devenir
              le referent francais de l&apos;IA souveraine pour les secteurs critiques.
            </p>
            <p className="text-secondary leading-relaxed">
              Notre mission : rendre la Computer Vision accessible, performante et souveraine,
              pour que chaque entreprise francaise puisse en maitriser le potentiel sans
              compromettre la securite de ses donnees.
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl" />
            <Image
              src="/images/baptiste-huvelle.png"
              alt="Baptiste Huvelle - Fondateur de HORAMA"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Values Section
function ValuesSection() {
  const values = [
    {
      emoji: "🎯",
      title: "Excellence technique",
      description:
        "Nous recherchons l'etat de l'art en IA, tout en privilegiant des solutions pragmatiques et robustes. Pas de buzzword, que du code qui fonctionne.",
    },
    {
      emoji: "🇫🇷",
      title: "Souverainete & ethique",
      description:
        "Nos solutions garantissent la maitrise totale des donnees par nos clients. Nous refusons toute dependance aux geants americains ou chinois.",
    },
    {
      emoji: "🤝",
      title: "Impact reel",
      description:
        "Nous travaillons sur des projets a fort impact pour la securite, la sante et l'industrie francaise. Chaque ligne de code compte.",
    },
    {
      emoji: "🚀",
      title: "Entrepreneuriat",
      description:
        "Startup en forte croissance, nous donnons de l'autonomie et des responsabilites des le premier jour. Votre contribution est visible et valorisee.",
    },
    {
      emoji: "🧠",
      title: "Apprentissage continu",
      description:
        "IA, securite, secteurs critiques : nous evoluons dans des domaines complexes. Formation continue, R&D, veille technologique font partie de l'ADN.",
    },
  ];

  return (
    <section className="section-lg bg-background border-t border-neutral-800">
      <div className="container-content">
        <div className="flex flex-col items-center text-center mb-12">
          <ValuesIcon className="w-12 h-12 text-accent mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Nos valeurs
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="card">
              <span className="text-3xl mb-4 block">{value.emoji}</span>
              <h3 className="text-primary font-semibold mb-2">{value.title}</h3>
              <p className="text-secondary text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Join Section
function WhyJoinSection() {
  const reasons = [
    "Projets strategiques : Defense, nucleaire, sante... des secteurs a enjeux",
    "Stack tech moderne : PyTorch, ONNX, TensorRT, Kubernetes, Docker",
    "Autonomie & responsabilites : Pas de micro-management, confiance et liberte",
    "Remuneration attractive : Salaire competitif + BSPCE (stock-options)",
    "Equilibre vie pro/perso : Teletravail partiel, flexibilite horaires",
    "Croissance rapide : Startup en pleine expansion, evolution de carriere possible",
    "Sens du travail : Contribuer a la souverainete numerique francaise",
  ];

  return (
    <section className="section-lg bg-background border-t border-neutral-800">
      <div className="container-content">
        <div className="flex flex-col items-center text-center mb-12">
          <RocketIcon className="w-12 h-12 text-accent mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Pourquoi rejoindre HORAMA ?
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <div key={index} className="flex gap-3 items-start">
                <CheckIcon className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <p className="text-secondary">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Job Card Component
interface JobCardProps {
  title: string;
  experience: string;
  type: string;
  location: string;
  description: string;
  skills: string[];
}

function JobCard({ title, experience, type, location, description, skills }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card overflow-hidden">
      <div
        className="p-6 cursor-pointer hover:bg-neutral-800/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-primary font-semibold text-lg">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-muted">Experience</span>
              <p className="text-primary">{experience}</p>
            </div>
            <div>
              <span className="text-muted">Type</span>
              <p className="text-primary">{type}</p>
            </div>
            <div>
              <span className="text-muted">Localisation</span>
              <p className="text-primary">{location}</p>
            </div>
          </div>
          <Link
            href="/site_vitrine/contact"
            className="btn-accent"
            onClick={(e) => e.stopPropagation()}
          >
            Postuler
          </Link>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-neutral-800">
          <p className="text-muted text-sm mt-4">Description de la mission :</p>
          <p className="text-secondary mt-2 mb-4">{description}</p>
          <p className="text-muted text-sm mb-2">Competences recherchees :</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-neutral-800 rounded-full text-secondary text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Open Positions Section
function OpenPositionsSection() {
  const jobs: JobCardProps[] = [
    {
      title: "Ingenieur Machine Learning (H/F)",
      experience: "2-5 ans",
      type: "CDI",
      location: "Paris / Hybride",
      description:
        "Developpement de modeles IA (computer vision, detection, segmentation) pour nos clients defense, BTP et nucleaire. Entrainement, optimisation et deploiement de modeles en production on-premise.",
      skills: ["PyTorch", "Computer Vision", "YOLO", "Python", "MLOps"],
    },
    {
      title: "Ingenieur DevOps / MLOps (H/F)",
      experience: "3-7 ans",
      type: "CDI",
      location: "Paris / Hybride",
      description:
        "Mise en place et maintien des infrastructures on-premise et cloud souverain. Automatisation des pipelines ML (entrainement, deploiement, monitoring). Securisation des environnements.",
      skills: ["Kubernetes", "Docker", "Terraform", "CI/CD", "MLflow"],
    },
    {
      title: "Business Developer Secteurs Critiques (H/F)",
      experience: "3-5 ans",
      type: "CDI",
      location: "Paris / Hybride",
      description:
        "Developpement commercial aupres des clients defense, nucleaire, sante, BTP. Prospection, qualification leads, accompagnement avant-vente, fidelisation clients.",
      skills: ["Vente B2B", "Secteurs critiques", "Negociation", "CRM"],
    },
  ];

  return (
    <section id="postes" className="section-lg bg-background border-t border-neutral-800">
      <div className="container-content">
        <div className="text-center mb-12">
          <p className="text-accent text-sm mb-2">Rejoignez-nous</p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Postes ouverts actuellement
          </h2>
          <p className="text-secondary max-w-xl mx-auto">
            Nous sommes toujours a la recherche de personnes creatives,
            talentueuses et autonomes pour rejoindre la famille HORAMA.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Application Form Section
function ApplicationFormSection() {
  return (
    <section className="section-lg bg-neutral-950">
      <div className="container-content">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Candidature Spontanee
            </h2>
            <p className="text-secondary">
              Vous ne trouvez pas le poste ideal ? Envoyez-nous votre candidature
              spontanee et nous vous recontacterons des qu&apos;une opportunite
              correspondra a votre profil.
            </p>
          </div>

          <div className="card p-8">
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Nom complet *</label>
                  <input type="text" className="form-input" placeholder="NOM Prenom" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input type="email" className="form-input" placeholder="votre@email.com" required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Telephone</label>
                  <input type="tel" className="form-input" placeholder="+33 6 12 34 56 78" />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn</label>
                  <input type="url" className="form-input" placeholder="linkedin.com/in/..." />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Poste recherche</label>
                <input type="text" className="form-input" placeholder="ex: Data Scientist, DevOps" />
              </div>

              <div className="form-group">
                <label className="form-label">Lettre de motivation</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  placeholder="Parlez-nous de vous et de votre motivation..."
                />
              </div>

              {/* File Upload */}
              <div className="border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center hover:border-primary-500/50 transition-colors cursor-pointer">
                <UploadIcon className="w-8 h-8 text-muted mx-auto mb-3" />
                <p className="text-secondary text-sm">
                  Cliquez ou glissez votre CV dans cette zone
                </p>
                <p className="text-muted text-xs mt-1">
                  (Formats acceptes: .pdf, .doc, .docx)
                </p>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full btn-accent py-4 justify-center">
                  Envoyer ma candidature
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function RecrutementPage() {
  return (
    <>
      <HeroSection />
      <WhoAreWeSection />
      <ValuesSection />
      <WhyJoinSection />
      <OpenPositionsSection />
      <ApplicationFormSection />
    </>
  );
}
