"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "@/components/ui/MotionWrapper";

interface Technology {
  name: string;
  slug: string;
  description: string;
  icon: string;
  useCase: string;
}

interface TechCategory {
  category: string;
  slug: string;
  items: Technology[];
}

const techs: TechCategory[] = [
  {
    category: "IA Frameworks",
    slug: "ia-frameworks",
    items: [
      {
        name: "PyTorch",
        slug: "pytorch",
        icon: "🔥",
        description: "Framework deep learning de Meta, leader pour la recherche et production.",
        useCase: "Entraînement de modèles custom de détection",
      },
      {
        name: "ONNX",
        slug: "onnx",
        icon: "🔄",
        description: "Format ouvert d'échange de modèles entre frameworks.",
        useCase: "Portabilité des modèles entre environnements",
      },
      {
        name: "OpenVINO",
        slug: "openvino",
        icon: "💎",
        description: "Toolkit Intel pour optimisation et déploiement edge.",
        useCase: "Inférence optimisée sur CPU Intel",
      },
      {
        name: "TensorRT",
        slug: "tensorrt",
        icon: "⚡",
        description: "SDK NVIDIA pour inférence haute performance.",
        useCase: "Accélération GPU pour latence < 10ms",
      },
    ],
  },
  {
    category: "Détection",
    slug: "detection",
    items: [
      {
        name: "YOLOv8/v9",
        slug: "yolo",
        icon: "🎯",
        description: "Détection d'objets temps réel state-of-the-art.",
        useCase: "Détection multi-objets en production",
      },
      {
        name: "RT-DETR",
        slug: "rt-detr",
        icon: "🔍",
        description: "Transformer temps réel pour détection précise.",
        useCase: "Cas nécessitant haute précision",
      },
      {
        name: "SAM",
        slug: "sam",
        icon: "✂️",
        description: "Segment Anything Model de Meta pour segmentation.",
        useCase: "Segmentation fine d'objets complexes",
      },
      {
        name: "DeepSORT",
        slug: "deepsort",
        icon: "📍",
        description: "Algorithme de tracking multi-objets robuste.",
        useCase: "Suivi d'objets en mouvement",
      },
    ],
  },
  {
    category: "Infrastructure",
    slug: "infrastructure",
    items: [
      {
        name: "Kubernetes",
        slug: "kubernetes",
        icon: "☸️",
        description: "Orchestration de conteneurs pour scalabilité.",
        useCase: "Déploiement scalable on-premise",
      },
      {
        name: "Docker",
        slug: "docker",
        icon: "🐳",
        description: "Conteneurisation pour environnements reproductibles.",
        useCase: "Packaging des solutions IA",
      },
      {
        name: "Triton",
        slug: "triton",
        icon: "🚀",
        description: "Serveur d'inférence NVIDIA haute performance.",
        useCase: "Serving de modèles à grande échelle",
      },
      {
        name: "FastAPI",
        slug: "fastapi",
        icon: "⚙️",
        description: "Framework Python moderne pour APIs rapides.",
        useCase: "APIs REST pour intégration client",
      },
    ],
  },
  {
    category: "MLOps",
    slug: "mlops",
    items: [
      {
        name: "MLflow",
        slug: "mlflow",
        icon: "📊",
        description: "Plateforme de gestion du cycle de vie ML.",
        useCase: "Tracking des expériences et modèles",
      },
      {
        name: "DVC",
        slug: "dvc",
        icon: "📁",
        description: "Versioning de données et modèles ML.",
        useCase: "Gestion des datasets volumineux",
      },
      {
        name: "Prometheus",
        slug: "prometheus",
        icon: "📈",
        description: "Monitoring et alerting temps réel.",
        useCase: "Surveillance des performances modèles",
      },
      {
        name: "Grafana",
        slug: "grafana",
        icon: "📉",
        description: "Dashboards de visualisation avancés.",
        useCase: "Tableaux de bord client custom",
      },
    ],
  },
];

function TechBadge({ tech, categorySlug }: { tech: Technology; categorySlug: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative" style={{ zIndex: isHovered ? 100 : 1 }}>
      <Link
        href={`/site_vitrine/expertise#${tech.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative inline-flex items-center gap-2 px-4 py-2 bg-neutral-800/50 hover:bg-neutral-700/50 border border-transparent hover:border-primary-500/30 rounded-full text-neutral-300 hover:text-white text-sm transition-all duration-300"
      >
        <span className="text-base">{tech.icon}</span>
        <span>{tech.name}</span>
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
          className="text-primary-400 overflow-hidden whitespace-nowrap"
        >
          →
        </motion.span>
      </Link>

      {/* Hover Card */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.95,
        }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full left-0 mb-2 z-50 pointer-events-none"
        style={{ minWidth: "280px" }}
      >
        <div className="p-4 rounded-xl bg-neutral-900/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/20">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{tech.icon}</span>
            <div>
              <h4 className="font-semibold text-white">{tech.name}</h4>
              <span className="text-xs text-primary-400">{categorySlug}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-400 mb-3">{tech.description}</p>

          {/* Use Case */}
          <div className="flex items-start gap-2 p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
            <span className="text-primary-400 text-xs mt-0.5">💡</span>
            <p className="text-xs text-primary-300">{tech.useCase}</p>
          </div>

          {/* CTA */}
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-neutral-500">Voir notre expertise</span>
            <span className="text-primary-400 text-sm">→</span>
          </div>
        </div>

        {/* Arrow pointer */}
        <div className="absolute -bottom-2 left-6 w-4 h-4 rotate-45 bg-neutral-900/95 border-r border-b border-white/10" />
      </motion.div>
    </div>
  );
}

export function TechnologiesSection() {
  return (
    <section className="section-lg bg-background border-t border-neutral-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container-content relative z-10">
        <FadeIn className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            Stack Technique
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Technologies de{" "}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              pointe
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Notre stack technique souveraine, optimisée pour la performance et la sécurité.
            Survolez pour découvrir, cliquez pour en savoir plus.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techs.map((tech, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                className="group relative p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-primary-500/20 backdrop-blur-sm transition-all duration-300 h-full"
                style={{ zIndex: 40 - index * 10 }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  {/* Category header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">{tech.category}</h3>
                    <Link
                      href={`/site_vitrine/expertise#${tech.slug}`}
                      className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      Voir tout →
                    </Link>
                  </div>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2">
                    {tech.items.map((item) => (
                      <TechBadge key={item.slug} tech={item} categorySlug={tech.category} />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.5} className="text-center mt-12">
          <Link
            href="/site_vitrine/expertise#stack"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300"
          >
            <span>Explorer toute notre stack</span>
            <span className="text-primary-400">→</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
