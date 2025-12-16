import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, ShieldIcon } from "@/components/icons";

// Page Metadata
export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Notre expertise technique en Computer Vision : PyTorch, ONNX, TensorRT, YOLO, Kubernetes, MLOps. Certifications ISO 27001, SOC 2, RGPD.",
};

// Hero Section
function HeroSection() {
  return (
    <section className="relative pt-16 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="hero-glow" />

      <div className="relative z-10 container-content text-center py-32 md:py-40">
        <p className="text-accent text-sm font-medium mb-4">Notre Expertise</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6 max-w-4xl mx-auto">
          Technologies de pointe pour la Computer Vision
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto">
          Une stack technique moderne et eprouvee pour des solutions performantes et securisees.
        </p>
      </div>
    </section>
  );
}

// Technology Stack Section
function TechStackSection() {
  const stacks = [
    {
      category: "IA Frameworks",
      description: "Frameworks de pointe pour le developpement de modeles",
      items: [
        { name: "PyTorch", desc: "Developpement de modeles principal" },
        { name: "ONNX", desc: "Interoperabilite des modeles" },
        { name: "OpenVINO", desc: "Optimisation Intel" },
        { name: "TensorRT", desc: "Acceleration GPU NVIDIA" },
        { name: "OpenCV", desc: "Traitement d'images" },
      ],
    },
    {
      category: "Detection & Algorithmes",
      description: "Algorithmes de detection et segmentation",
      items: [
        { name: "YOLOv8/v9", desc: "Detection temps reel" },
        { name: "RT-DETR", desc: "Detection Transformer temps reel" },
        { name: "SAM", desc: "Segmentation universelle" },
        { name: "CLIP", desc: "Vision-langage" },
        { name: "DeepSORT", desc: "Multi-object tracking" },
      ],
    },
    {
      category: "Infrastructure & Deploiement",
      description: "Infrastructure scalable et conteneurisee",
      items: [
        { name: "Kubernetes", desc: "Orchestration conteneurs" },
        { name: "Docker", desc: "Conteneurisation" },
        { name: "Triton", desc: "Serveur d'inference" },
        { name: "FastAPI", desc: "APIs performantes" },
        { name: "Nginx", desc: "Load balancing" },
      ],
    },
    {
      category: "MLOps & Monitoring",
      description: "Cycle de vie et observabilite des modeles",
      items: [
        { name: "MLflow", desc: "Tracking d'experiences" },
        { name: "DVC", desc: "Versioning donnees" },
        { name: "Weights & Biases", desc: "Monitoring" },
        { name: "Prometheus", desc: "Metriques" },
        { name: "Grafana", desc: "Dashboards" },
      ],
    },
    {
      category: "Securite",
      description: "Securite et gestion des acces",
      items: [
        { name: "Vault", desc: "Gestion des secrets" },
        { name: "Keycloak", desc: "Identity management" },
        { name: "Falco", desc: "Detection d'anomalies runtime" },
        { name: "OPA", desc: "Policy as Code" },
      ],
    },
    {
      category: "Hardware Edge",
      description: "Plateformes embarquees supportees",
      items: [
        { name: "NVIDIA Jetson", desc: "GPU embarque" },
        { name: "Intel NUC", desc: "Edge computing" },
        { name: "Google Coral TPU", desc: "Inference ML" },
        { name: "Raspberry Pi", desc: "IoT" },
      ],
    },
  ];

  return (
    <section className="section-lg bg-background">
      <div className="container-content">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium mb-3">Stack Technique</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Technologies maitrisees
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stacks.map((stack, idx) => (
            <div key={idx} className="card">
              <h3 className="text-xl font-semibold text-primary mb-2">{stack.category}</h3>
              <p className="text-muted text-sm mb-6">{stack.description}</p>
              <ul className="space-y-3">
                {stack.items.map((item, iidx) => (
                  <li key={iidx} className="flex items-center justify-between">
                    <span className="text-secondary">{item.name}</span>
                    <span className="text-muted text-sm">{item.desc}</span>
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

// Certifications Section
function CertificationsSection() {
  const certifications = [
    {
      name: "ISO 27001",
      description: "Systeme de management de la securite de l'information",
      features: ["Gestion des risques", "Controles de securite", "Amelioration continue"],
    },
    {
      name: "SOC 2",
      description: "Securite, disponibilite et confidentialite des services",
      features: ["Controles d'acces", "Chiffrement", "Audit trails"],
    },
    {
      name: "RGPD",
      description: "Conformite au reglement europeen sur les donnees",
      features: ["Privacy by design", "Droit a l'oubli", "Portabilite donnees"],
    },
    {
      name: "SecNumCloud",
      description: "Qualification ANSSI pour les services cloud",
      features: ["Hebergement France", "Souverainete", "Securite renforcee"],
    },
  ];

  return (
    <section className="section-lg hero-gradient">
      <div className="container-content">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium mb-3">Certifications & Conformite</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Standards de securite
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Nous respectons les standards les plus exigeants pour garantir la securite et
            la conformite de vos projets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, idx) => (
            <div key={idx} className="card p-8">
              <div className="flex items-center gap-3 mb-4">
                <ShieldIcon className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-semibold text-primary">{cert.name}</h3>
              </div>
              <p className="text-secondary mb-6">{cert.description}</p>
              <ul className="space-y-2">
                {cert.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3">
                    <CheckIcon className="w-4 h-4 text-success shrink-0" />
                    <span className="text-muted text-sm">{feature}</span>
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

// Methodology Section
function MethodologySection() {
  const principles = [
    {
      title: "Reproductibilite",
      description:
        "Chaque experience, chaque modele, chaque deploiement est versionne et reproductible. Tracabilite complete du lineage des donnees aux predictions.",
    },
    {
      title: "Securite by Design",
      description:
        "La securite n'est pas une couche ajoutee mais integree des la conception. Chiffrement, isolation, audits reguliers.",
    },
    {
      title: "Performance Optimisee",
      description:
        "Optimisation systematique des modeles pour votre hardware cible. Quantization, pruning, compilation pour une inference ultra-rapide.",
    },
    {
      title: "Documentation Complete",
      description:
        "Documentation technique exhaustive, guides d'utilisation, runbooks operationnels. Votre equipe est autonome.",
    },
  ];

  return (
    <section className="section-lg bg-background border-t border-neutral-800">
      <div className="container-content">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium mb-3">Notre Approche</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Principes fondamentaux
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {principles.map((principle, idx) => (
            <div key={idx} className="card">
              <h3 className="text-lg font-semibold text-primary mb-3">{principle.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{principle.description}</p>
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
          Besoin d&apos;expertise technique ?
        </h2>
        <p className="text-secondary text-lg max-w-2xl mx-auto mb-10">
          Nos experts sont disponibles pour evaluer vos besoins et vous proposer
          une solution adaptee a vos contraintes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/site_vitrine/contact" className="btn-primary px-8 py-4">
            Parler a un expert
          </Link>
          <Link href="/site_vitrine/services" className="btn-outline px-8 py-4">
            Voir nos services
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function ExpertisePage() {
  return (
    <>
      <HeroSection />
      <TechStackSection />
      <CertificationsSection />
      <MethodologySection />
      <CTASection />
    </>
  );
}
