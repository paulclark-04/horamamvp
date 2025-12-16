"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/MotionWrapper";
import {
  TargetIcon,
  SearchIcon,
  DocumentIcon,
  ServerIcon,
  ChipIcon,
  ShieldIcon,
  ArrowRightIcon,
} from "@/components/icons";

const services = [
  {
    icon: <TargetIcon className="w-7 h-7" />,
    title: "Détection & Suivi",
    description: "Détection d'objets, tracking, comptage pour applications industrielles.",
    stats: ">95% précision",
    featured: true,
    span: "bento-span-2",
  },
  {
    icon: <SearchIcon className="w-7 h-7" />,
    title: "Inspection Visuelle",
    description: "Contrôle qualité automatisé, détection de défauts microscopiques.",
    stats: "0.1mm détection",
  },
  {
    icon: <DocumentIcon className="w-7 h-7" />,
    title: "OCR & Documents",
    description: "Extraction multi-langues, reconnaissance d'écriture manuscrite.",
    stats: ">99% précision",
  },
  {
    icon: <ChipIcon className="w-7 h-7" />,
    title: "Edge AI & Embarqué",
    description: "Déploiement ultra-basse latence sur caméras, IoT et systèmes embarqués.",
    stats: "<10ms latence",
    featured: true,
    span: "bento-span-2",
  },
  {
    icon: <ServerIcon className="w-7 h-7" />,
    title: "MLOps On-Prem",
    description: "CI/CD, monitoring, versioning de données pour vos modèles CV.",
    stats: "-70% time-to-prod",
  },
  {
    icon: <ShieldIcon className="w-7 h-7" />,
    title: "Sécurité & Conformité",
    description: "Chiffrement, isolation réseau, zéro exfiltration. ISO 27001.",
    stats: "100% souverain",
  },
];

export function ServicesSection() {
  return (
    <section className="section-lg bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb glow-orb-blue w-96 h-96 -top-48 -right-48" />

      <div className="container-content relative z-10">
        <FadeIn className="text-center mb-16">
          <p className="text-accent text-sm font-medium mb-3">Nos Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Solutions Computer Vision complètes
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            De la conception à la production industrielle, une approche souveraine et sécurisée.
          </p>
        </FadeIn>

        <div className="bento-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bento-item border-glow ${service.span || ""} ${service.featured ? "bento-featured" : ""}`}
            >
              <div className="icon-box icon-box-primary mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">{service.title}</h3>
              <p className="text-secondary text-sm mb-4">{service.description}</p>
              <span className="text-accent text-sm font-medium">{service.stats}</span>
            </motion.div>
          ))}
        </div>

        <FadeIn className="text-center mt-12">
          <Link href="/site_vitrine/services" className="btn-accent">
            Voir tous nos services
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
