import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Technologies | HORAMA",
  description:
    "Notre stack technique souveraine : PyTorch, YOLO, Kubernetes, MLflow et plus. Technologies de pointe pour la Computer Vision on-premise.",
};

interface Technology {
  name: string;
  slug: string;
  icon: string;
  description: string;
  features: string[];
  useCase: string;
  link?: string;
}

interface TechCategory {
  category: string;
  slug: string;
  description: string;
  items: Technology[];
}

const techCategories: TechCategory[] = [
  {
    category: "IA Frameworks",
    slug: "ia-frameworks",
    description: "Les fondations de nos modèles d'intelligence artificielle",
    items: [
      {
        name: "PyTorch",
        slug: "pytorch",
        icon: "🔥",
        description:
          "Framework deep learning open-source développé par Meta AI. Leader mondial pour la recherche et le déploiement en production de modèles d'IA.",
        features: [
          "Graphe de calcul dynamique",
          "Écosystème riche (TorchVision, TorchAudio)",
          "Support GPU natif avec CUDA",
          "Intégration facile avec ONNX",
        ],
        useCase:
          "Nous utilisons PyTorch pour l'entraînement de tous nos modèles custom de détection et classification, permettant une itération rapide et un déploiement flexible.",
        link: "https://pytorch.org/",
      },
      {
        name: "ONNX",
        slug: "onnx",
        icon: "🔄",
        description:
          "Open Neural Network Exchange - Format ouvert pour représenter les modèles de machine learning, permettant l'interopérabilité entre frameworks.",
        features: [
          "Format standardisé universel",
          "Conversion entre PyTorch, TensorFlow, etc.",
          "Optimisation automatique des graphes",
          "Large support runtime",
        ],
        useCase:
          "ONNX nous permet de convertir nos modèles PyTorch vers n'importe quel runtime cible (OpenVINO, TensorRT) sans réécriture de code.",
        link: "https://onnx.ai/",
      },
      {
        name: "OpenVINO",
        slug: "openvino",
        icon: "💎",
        description:
          "Toolkit Intel pour l'optimisation et le déploiement de modèles d'inférence sur matériel Intel (CPU, GPU, VPU, FPGA).",
        features: [
          "Optimisation automatique des modèles",
          "Support CPU, GPU Intel, Movidius",
          "Quantification INT8 automatique",
          "Faible latence sur edge devices",
        ],
        useCase:
          "Déploiement de nos modèles sur des serveurs CPU Intel avec des performances proches du GPU grâce à l'optimisation AVX-512.",
        link: "https://docs.openvino.ai/",
      },
      {
        name: "TensorRT",
        slug: "tensorrt",
        icon: "⚡",
        description:
          "SDK NVIDIA pour l'optimisation et le déploiement haute performance de modèles d'inférence sur GPU NVIDIA.",
        features: [
          "Optimisation kernel fusion",
          "Quantification FP16/INT8",
          "Latence sub-milliseconde",
          "Throughput maximal",
        ],
        useCase:
          "Pour nos clients nécessitant une latence < 10ms, TensorRT permet d'atteindre des performances inégalées sur GPU NVIDIA.",
        link: "https://developer.nvidia.com/tensorrt",
      },
    ],
  },
  {
    category: "Détection",
    slug: "detection",
    description: "Algorithmes state-of-the-art pour la détection et le suivi d'objets",
    items: [
      {
        name: "YOLOv8/v9",
        slug: "yolo",
        icon: "🎯",
        description:
          "You Only Look Once - Architecture de détection d'objets temps réel la plus populaire, offrant le meilleur compromis vitesse/précision.",
        features: [
          "Détection en une seule passe",
          "Temps réel > 100 FPS",
          "Multi-tâches (detect, segment, pose)",
          "Facilement customisable",
        ],
        useCase:
          "Notre choix par défaut pour 80% des projets de détection grâce à sa polyvalence et ses performances exceptionnelles.",
        link: "https://docs.ultralytics.com/",
      },
      {
        name: "RT-DETR",
        slug: "rt-detr",
        icon: "🔍",
        description:
          "Real-Time Detection Transformer - Premier transformer de détection temps réel, offrant une précision supérieure aux architectures CNN.",
        features: [
          "Architecture Transformer",
          "Pas besoin de NMS",
          "Meilleure précision que YOLO",
          "Scalable en taille",
        ],
        useCase:
          "Utilisé pour les cas nécessitant une précision maximale, comme l'inspection de défauts microscopiques.",
        link: "https://github.com/lyuwenyu/RT-DETR",
      },
      {
        name: "SAM",
        slug: "sam",
        icon: "✂️",
        description:
          "Segment Anything Model de Meta - Modèle de segmentation universel capable de segmenter n'importe quel objet sans entraînement spécifique.",
        features: [
          "Zero-shot segmentation",
          "Prompts point/box/texte",
          "Qualité production-ready",
          "Fine-tunable sur domaine",
        ],
        useCase:
          "Segmentation fine d'objets complexes ou nouveaux sans avoir besoin de créer un dataset d'entraînement.",
        link: "https://segment-anything.com/",
      },
      {
        name: "DeepSORT",
        slug: "deepsort",
        icon: "📍",
        description:
          "Deep Simple Online and Realtime Tracking - Algorithme de tracking multi-objets combinant Kalman filter et deep learning.",
        features: [
          "Tracking robuste aux occlusions",
          "Réidentification par apparence",
          "Temps réel",
          "Gestion des entrées/sorties",
        ],
        useCase:
          "Suivi de personnes ou véhicules dans des scènes complexes avec maintien d'identité malgré les occlusions.",
        link: "https://github.com/nwojke/deep_sort",
      },
    ],
  },
  {
    category: "Infrastructure",
    slug: "infrastructure",
    description: "Stack d'infrastructure pour un déploiement scalable et sécurisé",
    items: [
      {
        name: "Kubernetes",
        slug: "kubernetes",
        icon: "☸️",
        description:
          "Plateforme d'orchestration de conteneurs pour automatiser le déploiement, la mise à l'échelle et la gestion d'applications conteneurisées.",
        features: [
          "Auto-scaling horizontal",
          "Self-healing",
          "Rolling updates",
          "Service discovery",
        ],
        useCase:
          "Déploiement de nos solutions sur les infrastructures on-premise des clients avec haute disponibilité et scalabilité automatique.",
        link: "https://kubernetes.io/",
      },
      {
        name: "Docker",
        slug: "docker",
        icon: "🐳",
        description:
          "Plateforme de conteneurisation permettant de packager les applications avec leurs dépendances dans des environnements reproductibles.",
        features: [
          "Isolation des environnements",
          "Portabilité totale",
          "Images légères",
          "Écosystème riche",
        ],
        useCase:
          "Toutes nos solutions sont livrées en conteneurs Docker, garantissant un déploiement identique quel que soit l'environnement cible.",
        link: "https://www.docker.com/",
      },
      {
        name: "Triton",
        slug: "triton",
        icon: "🚀",
        description:
          "NVIDIA Triton Inference Server - Serveur d'inférence haute performance supportant tous les frameworks ML majeurs.",
        features: [
          "Multi-framework (PyTorch, TF, ONNX)",
          "Dynamic batching",
          "Model ensemble",
          "GPU sharing",
        ],
        useCase:
          "Serving de modèles à grande échelle avec optimisation automatique du throughput et gestion intelligente des ressources GPU.",
        link: "https://developer.nvidia.com/triton-inference-server",
      },
      {
        name: "FastAPI",
        slug: "fastapi",
        icon: "⚙️",
        description:
          "Framework Python moderne pour construire des APIs haute performance avec validation automatique et documentation OpenAPI.",
        features: [
          "Performance async native",
          "Validation Pydantic",
          "Documentation auto Swagger",
          "WebSocket support",
        ],
        useCase:
          "Construction des APIs REST pour l'intégration des modèles IA dans les systèmes clients existants.",
        link: "https://fastapi.tiangolo.com/",
      },
    ],
  },
  {
    category: "MLOps",
    slug: "mlops",
    description: "Outils pour industrialiser le cycle de vie des modèles ML",
    items: [
      {
        name: "MLflow",
        slug: "mlflow",
        icon: "📊",
        description:
          "Plateforme open-source pour gérer le cycle de vie complet du machine learning : expérimentation, reproductibilité et déploiement.",
        features: [
          "Tracking des expériences",
          "Model Registry",
          "Packaging standardisé",
          "Déploiement multi-cibles",
        ],
        useCase:
          "Suivi de toutes nos expériences d'entraînement et versioning des modèles pour garantir la reproductibilité.",
        link: "https://mlflow.org/",
      },
      {
        name: "DVC",
        slug: "dvc",
        icon: "📁",
        description:
          "Data Version Control - Outil de versioning pour les données et modèles ML, intégré avec Git.",
        features: [
          "Versioning de gros fichiers",
          "Pipelines reproductibles",
          "Storage agnostique",
          "Intégration Git native",
        ],
        useCase:
          "Gestion des datasets volumineux et des pipelines d'entraînement avec traçabilité complète.",
        link: "https://dvc.org/",
      },
      {
        name: "Prometheus",
        slug: "prometheus",
        icon: "📈",
        description:
          "Système de monitoring et d'alerting open-source, conçu pour la fiabilité et la scalabilité.",
        features: [
          "Métriques time-series",
          "Query language PromQL",
          "Alerting flexible",
          "Service discovery",
        ],
        useCase:
          "Monitoring en temps réel des performances des modèles en production : latence, throughput, drift.",
        link: "https://prometheus.io/",
      },
      {
        name: "Grafana",
        slug: "grafana",
        icon: "📉",
        description:
          "Plateforme de visualisation et d'analytics pour créer des dashboards interactifs à partir de données métriques.",
        features: [
          "Dashboards customisables",
          "Multi-sources de données",
          "Alerting intégré",
          "Partage et collaboration",
        ],
        useCase:
          "Création de tableaux de bord personnalisés pour nos clients, visualisant les KPIs de leurs modèles IA.",
        link: "https://grafana.com/",
      },
    ],
  },
];

function TechCard({ tech }: { tech: Technology }) {
  return (
    <div
      id={tech.slug}
      className="scroll-mt-24 p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-primary-500/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl">{tech.icon}</span>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{tech.name}</h3>
          {tech.link && (
            <a
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              Documentation officielle →
            </a>
          )}
        </div>
      </div>

      <p className="text-neutral-400 mb-4">{tech.description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-white mb-2">Fonctionnalités clés</h4>
        <div className="flex flex-wrap gap-2">
          {tech.features.map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs bg-neutral-800/50 text-neutral-300 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
        <h4 className="text-sm font-semibold text-primary-400 mb-2 flex items-center gap-2">
          <span>💡</span> Notre utilisation
        </h4>
        <p className="text-sm text-primary-300">{tech.useCase}</p>
      </div>
    </div>
  );
}

function CategorySection({ category }: { category: TechCategory }) {
  return (
    <section id={category.slug} className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{category.category}</h2>
        <p className="text-neutral-400">{category.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {category.items.map((tech) => (
          <TechCard key={tech.slug} tech={tech} />
        ))}
      </div>
    </section>
  );
}

export default function TechnologiesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[128px]" />

        <div className="relative z-10 container-content text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            Stack Technique
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Technologies de{" "}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              pointe
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-8">
            Notre stack technique souveraine, sélectionnée pour offrir performance maximale,
            sécurité et flexibilité de déploiement on-premise.
          </p>

          {/* Quick navigation */}
          <div className="flex flex-wrap justify-center gap-3">
            {techCategories.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="px-4 py-2 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50 border border-white/10 hover:border-primary-500/30 text-neutral-300 hover:text-white text-sm transition-all duration-300"
              >
                {cat.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-content py-16">
        {techCategories.map((category) => (
          <CategorySection key={category.slug} category={category} />
        ))}

        {/* CTA */}
        <section className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-white/10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Une question sur notre stack ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Nos experts sont disponibles pour discuter de vos besoins techniques et vous conseiller
            sur les meilleures solutions pour votre projet.
          </p>
          <Link
            href="/site_vitrine/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300"
          >
            <span>Parler à un expert</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </main>
  );
}
