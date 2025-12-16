import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  TargetIcon,
  SearchIcon,
  DocumentIcon,
  ChipIcon,
  ServerIcon,
  ShieldIcon,
  CheckIcon,
} from "@/components/icons";

// Page Metadata
export const metadata: Metadata = {
  title: "Services",
  description:
    "Solutions Computer Vision completes : Detection, Inspection Visuelle, OCR, Edge AI, MLOps On-Prem. Deploiement souverain et securise.",
};

// Hero Section
function HeroSection() {
  return (
    <section className="relative pt-16 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="hero-glow" />

      <div className="relative z-10 container-content text-center py-32 md:py-40">
        <p className="text-accent text-sm font-medium mb-4">Nos Services</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6 max-w-4xl mx-auto">
          Solutions Computer Vision souveraines
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-10">
          De la conception a la production industrielle, une approche complete et securisee
          pour vos projets de vision par ordinateur.
        </p>
        <Link href="/site_vitrine/contact" className="btn-primary px-8 py-4">
          Demander un diagnostic gratuit
        </Link>
      </div>
    </section>
  );
}

// Service Detail Component
interface ServiceDetailProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  problems: string[];
  solutions: string[];
  results: { label: string; value: string }[];
  deployment: string[];
  reversed?: boolean;
}

function ServiceDetail({
  id,
  icon,
  title,
  description,
  problems,
  solutions,
  results,
  deployment,
  reversed = false,
}: ServiceDetailProps) {
  return (
    <section id={id} className="section-lg bg-background border-t border-neutral-800">
      <div className="container-content">
        <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-20`}>
          {/* Left - Content */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="icon-box icon-box-primary">
                {icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
            </div>
            <p className="text-secondary leading-relaxed mb-8">{description}</p>

            {/* Problems */}
            <div className="mb-8">
              <h3 className="text-primary font-semibold mb-4">Problematiques adressees</h3>
              <ul className="space-y-2">
                {problems.map((problem, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-error mt-1">•</span>
                    <span className="text-secondary text-sm">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="mb-8">
              <h3 className="text-primary font-semibold mb-4">Nos solutions</h3>
              <ul className="space-y-2">
                {solutions.map((solution, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-secondary text-sm">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Results & Deployment */}
          <div className="flex-1 space-y-6">
            {/* Results Card */}
            <div className="card p-8">
              <h3 className="text-primary font-semibold mb-6">Resultats</h3>
              <div className="grid grid-cols-2 gap-6">
                {results.map((result, idx) => (
                  <div key={idx}>
                    <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{result.value}</div>
                    <div className="text-muted text-sm">{result.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment Card */}
            <div className="card p-8">
              <h3 className="text-primary font-semibold mb-4">Deploiement</h3>
              <div className="flex flex-wrap gap-2">
                {deployment.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 bg-neutral-800 rounded-full text-secondary text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <Link href="/site_vitrine/contact" className="btn-accent w-full justify-center">
              En savoir plus
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Deployment Options Section
function DeploymentSection() {
  const options = [
    {
      title: "Local / On-Premises",
      features: [
        "Controle total de l'infrastructure",
        "Maitrise complete des donnees",
        "Latence ultra-faible",
        "Conformite reglementaire maximale",
      ],
    },
    {
      title: "Cloud Souverain",
      features: [
        "Hebergement certifie europeen",
        "Certification SecNumCloud",
        "Chiffrement de bout en bout",
        "Traces d'audit completes",
      ],
    },
  ];

  return (
    <section className="section-lg hero-gradient">
      <div className="container-content">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-medium mb-3">Options de Deploiement</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Choisissez votre mode de deploiement
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Selon vos contraintes de securite et de performance, nous adaptons notre deploiement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {options.map((option, idx) => (
            <div key={idx} className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldIcon className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-semibold text-primary">{option.title}</h3>
              </div>
              <ul className="space-y-4">
                {option.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-success shrink-0" />
                    <span className="text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="section-lg bg-background border-t border-neutral-800">
      <div className="container-content text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Pret a deployer votre solution ?
        </h2>
        <p className="text-secondary text-lg max-w-2xl mx-auto mb-10">
          Contactez-nous pour un diagnostic gratuit de vos besoins en Computer Vision.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/site_vitrine/contact" className="btn-primary px-8 py-4">
            Demander un diagnostic
          </Link>
          <Link href="/site_vitrine/expertise" className="btn-outline px-8 py-4">
            Voir notre expertise
          </Link>
        </div>
      </div>
    </section>
  );
}

// Services Data
const services: ServiceDetailProps[] = [
  {
    id: "detection",
    icon: <TargetIcon className="w-6 h-6" />,
    title: "Detection & Suivi d'Objets",
    description:
      "Solutions de detection, tracking et comptage pour applications industrielles et surveillance. Modeles optimises pour la performance temps reel.",
    problems: [
      "Surveillance de zones sensibles",
      "Comptage de personnes ou vehicules",
      "Suivi d'objets en mouvement",
      "Detection d'intrusions",
    ],
    solutions: [
      "Modeles YOLO optimises",
      "Multi-object tracking (DeepSORT)",
      "Detection temps reel",
      "Algorithmes de comptage precis",
    ],
    results: [
      { value: ">95%", label: "Precision" },
      { value: "<50ms", label: "Latence" },
      { value: "24/7", label: "Fiabilite" },
      { value: "-40%", label: "Couts surveillance" },
    ],
    deployment: ["Edge computing", "Serveurs on-prem", "Cameras IP", "IoT"],
  },
  {
    id: "inspection",
    icon: <SearchIcon className="w-6 h-6" />,
    title: "Inspection Visuelle & Controle Qualite",
    description:
      "Automatisation du controle qualite industriel avec detection de defauts microscopiques et classification en temps reel.",
    problems: [
      "Controle qualite manuel lent",
      "Defauts microscopiques",
      "Variabilite humaine",
      "Cadences industrielles elevees",
    ],
    solutions: [
      "Vision industrielle haute resolution",
      "IA de classification de defauts",
      "Inspection multi-spectrale",
      "Systemes d'eclairage adaptatifs",
    ],
    results: [
      { value: "0.1mm", label: "Detection defauts" },
      { value: ">1000/h", label: "Pieces inspectees" },
      { value: "-90%", label: "Faux positifs" },
      { value: "<12 mois", label: "ROI" },
    ],
    deployment: ["Ligne de production", "Systemes PLC", "MES reporting", "Cameras industrielles"],
    reversed: true,
  },
  {
    id: "ocr",
    icon: <DocumentIcon className="w-6 h-6" />,
    title: "OCR & Lecture de Documents",
    description:
      "Extraction de texte multi-langues, reconnaissance d'ecriture manuscrite et traitement de documents degrades.",
    problems: [
      "Saisie manuelle de donnees",
      "Documents degrades ou varies",
      "Lecture de compteurs",
      "Texte manuscrit",
    ],
    solutions: [
      "OCR multi-langues avance",
      "Reconnaissance d'ecriture manuscrite",
      "Extraction de donnees structurees",
      "Preprocessing d'image adaptatif",
    ],
    results: [
      { value: ">99%", label: "Precision texte" },
      { value: "50+", label: "Langues supportees" },
      { value: "Temps reel", label: "Traitement" },
      { value: "-95%", label: "Erreurs saisie" },
    ],
    deployment: ["APIs REST", "Integration ERP/CRM", "Batch processing", "Mobile"],
  },
  {
    id: "edge",
    icon: <ChipIcon className="w-6 h-6" />,
    title: "Edge AI & Embarque",
    description:
      "Deploiement de modeles IA directement sur cameras, appareils IoT et systemes embarques avec latence minimale.",
    problems: [
      "Latence reseau critique",
      "Bande passante limitee",
      "Confidentialite des donnees",
      "Fiabilite de la connexion",
    ],
    solutions: [
      "Optimisation de modeles (ONNX/TensorRT)",
      "Quantization et pruning",
      "Deploiement multi-plateforme",
      "Edge computing distribue",
    ],
    results: [
      { value: "<10ms", label: "Latence" },
      { value: "Optimisee", label: "Consommation" },
      { value: "Offline", label: "Fonctionnement" },
      { value: "Renforcee", label: "Securite" },
    ],
    deployment: ["NVIDIA Jetson", "Intel NUC", "Google Coral TPU", "Raspberry Pi"],
    reversed: true,
  },
  {
    id: "mlops",
    icon: <ServerIcon className="w-6 h-6" />,
    title: "MLOps On-Prem",
    description:
      "Infrastructure complete pour le cycle de vie de vos modeles : CI/CD, monitoring, versioning et gouvernance IA.",
    problems: [
      "Derive des modeles",
      "Deploiement complexe",
      "Monitoring de performance",
      "Gouvernance IA",
    ],
    solutions: [
      "Pipeline MLOps automatise",
      "Monitoring de derive",
      "A/B testing de modeles",
      "Versioning donnees et modeles",
    ],
    results: [
      { value: "-70%", label: "Time-to-production" },
      { value: ">99.9%", label: "Uptime" },
      { value: "Auto", label: "Detection derive" },
      { value: "Conforme", label: "Reglementation" },
    ],
    deployment: ["Kubernetes", "Docker", "Infrastructure on-prem", "Cloud hybride"],
  },
];

// Main Page Component
export default function ServicesPage() {
  return (
    <>
      <HeroSection />

      {/* Services Navigation */}
      <nav className="sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b border-neutral-800">
        <div className="container-content py-4">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="nav-link whitespace-nowrap px-4 py-2 rounded-full hover:bg-neutral-800/50 transition-colors"
              >
                {service.title.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Service Details */}
      {services.map((service) => (
        <ServiceDetail key={service.id} {...service} />
      ))}

      <DeploymentSection />
      <CTASection />
    </>
  );
}
