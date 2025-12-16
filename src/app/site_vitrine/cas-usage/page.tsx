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
  title: "Cas d'usage",
  description:
    "Decouvrez nos cas d'usage en Computer Vision : industrie automobile, BTP, defense, nucleaire, sante. Resultats concrets et deploiements reussis.",
};

// Hero Section
function HeroSection() {
  return (
    <section className="relative pt-16 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="hero-glow" />

      <div className="relative z-10 container-content text-center py-32 md:py-40">
        <p className="text-accent text-sm font-medium mb-4">Cas d&apos;usage</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6 max-w-4xl mx-auto">
          Des resultats concrets dans les secteurs critiques
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-10">
          Decouvrez comment notre expertise en Computer Vision transforme
          les industries strategiques francaises.
        </p>
        <Link href="/site_vitrine/contact" className="btn-primary px-8 py-4">
          Discuter de votre projet
        </Link>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: "-35%", label: "Faux positifs", description: "Inspection qualite automobile" },
    { value: "+20%", label: "Cadence", description: "Surveillance perimetrique" },
    { value: "99.8%", label: "Precision", description: "OCR industriel" },
    { value: "<10ms", label: "Latence", description: "Edge AI embarque" },
  ];

  return (
    <section className="section-lg bg-background">
      <div className="container-content">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card text-center p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-primary font-semibold mb-1">{stat.label}</div>
              <div className="text-muted text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sector Card Component
interface SectorCardProps {
  title: string;
  icon: React.ReactNode;
  challenges: string[];
  solutions: string[];
  results: string[];
  color: string;
}

function SectorCard({ title, icon, challenges, solutions, results, color }: SectorCardProps) {
  return (
    <div className="card overflow-hidden">
      {/* Header with color */}
      <div className={`${color} p-6`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Challenges */}
        <div>
          <h4 className="text-primary font-semibold mb-3">Defis</h4>
          <ul className="space-y-2">
            {challenges.map((challenge, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-error mt-1">•</span>
                <span className="text-secondary text-sm">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="text-primary font-semibold mb-3">Solutions HORAMA</h4>
          <ul className="space-y-2">
            {solutions.map((solution, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span className="text-secondary text-sm">{solution}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Results */}
        <div>
          <h4 className="text-primary font-semibold mb-3">Resultats</h4>
          <div className="flex flex-wrap gap-2">
            {results.map((result, idx) => (
              <span key={idx} className="px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                {result}
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
  );
}

// Sectors Section
function SectorsSection() {
  const sectors: SectorCardProps[] = [
    {
      title: "Industrie Automobile",
      icon: <SearchIcon className="w-6 h-6 text-white" />,
      color: "bg-gradient-to-r from-blue-600 to-blue-800",
      challenges: [
        "Controle qualite manuel lent et couteux",
        "Detection de defauts microscopiques",
        "Cadences de production elevees",
      ],
      solutions: [
        "Inspection visuelle automatisee haute resolution",
        "Classification de defauts par deep learning",
        "Integration directe aux lignes de production",
      ],
      results: ["-35% faux positifs", "+1000 pieces/h", "ROI < 12 mois"],
    },
    {
      title: "BTP & Construction",
      icon: <TargetIcon className="w-6 h-6 text-white" />,
      color: "bg-gradient-to-r from-orange-600 to-orange-800",
      challenges: [
        "Securite des chantiers",
        "Suivi d'avancement en temps reel",
        "Detection des non-conformites",
      ],
      solutions: [
        "Detection d'EPI et zones dangereuses",
        "Suivi automatique de l'avancement",
        "Analyse d'images drone et satellite",
      ],
      results: ["-40% incidents", "Suivi temps reel", "Alertes automatiques"],
    },
    {
      title: "Defense & Securite",
      icon: <ShieldIcon className="w-6 h-6 text-white" />,
      color: "bg-gradient-to-r from-slate-700 to-slate-900",
      challenges: [
        "Surveillance perimetrique 24/7",
        "Detection d'intrusions",
        "Souverainete des donnees critique",
      ],
      solutions: [
        "Multi-object tracking temps reel",
        "Detection de comportements anormaux",
        "Deploiement 100% on-premise",
      ],
      results: ["+20% cadence", "Zero cloud", "Confidentialite totale"],
    },
    {
      title: "Nucleaire & Energie",
      icon: <ChipIcon className="w-6 h-6 text-white" />,
      color: "bg-gradient-to-r from-yellow-600 to-amber-700",
      challenges: [
        "Inspection de zones a risque",
        "Lecture de compteurs et capteurs",
        "Conformite reglementaire stricte",
      ],
      solutions: [
        "Vision robotisee pour zones inaccessibles",
        "OCR industriel haute precision",
        "Tracabilite complete des inspections",
      ],
      results: ["99.8% precision OCR", "ISO 27001", "Audits automatises"],
    },
    {
      title: "Sante & Medical",
      icon: <DocumentIcon className="w-6 h-6 text-white" />,
      color: "bg-gradient-to-r from-teal-600 to-teal-800",
      challenges: [
        "Analyse d'images medicales",
        "Confidentialite des donnees patients",
        "Aide au diagnostic",
      ],
      solutions: [
        "Detection assistee par IA",
        "Hebergement HDS (Hebergeur Donnees Sante)",
        "Integration aux systemes existants",
      ],
      results: ["RGPD conforme", "HDS certifie", "Tracabilite complete"],
    },
    {
      title: "Logistique & Transport",
      icon: <ServerIcon className="w-6 h-6 text-white" />,
      color: "bg-gradient-to-r from-purple-600 to-purple-800",
      challenges: [
        "Comptage et tri automatique",
        "Lecture de codes et etiquettes",
        "Optimisation des flux",
      ],
      solutions: [
        "Detection et classification temps reel",
        "OCR multi-formats",
        "Integration WMS/TMS",
      ],
      results: ["+30% productivite", "<50ms latence", "24/7 operationnel"],
    },
  ];

  return (
    <section className="section-lg bg-background border-t border-neutral-800">
      <div className="container-content">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium mb-3">Secteurs d&apos;application</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Une expertise multi-sectorielle
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Nos solutions s&apos;adaptent aux contraintes specifiques de chaque secteur critique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <SectorCard key={index} {...sector} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Use Cases Detail Section
function UseCasesDetailSection() {
  const useCases = [
    {
      title: "Detection & Suivi d'Objets",
      description:
        "Nos algorithmes YOLO optimises identifient, classifient et suivent des objets en temps reel avec une precision superieure a 95%.",
      icon: <TargetIcon className="w-8 h-8" />,
      features: ["Multi-object tracking", "Comptage precis", "Detection temps reel", "Alertes automatiques"],
    },
    {
      title: "Inspection Visuelle",
      description:
        "Automatisez le controle qualite avec une detection de defauts jusqu'a 0.1mm de precision sur vos lignes de production.",
      icon: <SearchIcon className="w-8 h-8" />,
      features: ["Defauts microscopiques", "Classification automatique", "Integration PLC", "Reporting MES"],
    },
    {
      title: "OCR & Documents",
      description:
        "Extrayez automatiquement les informations de documents varies avec une precision superieure a 99% en multi-langues.",
      icon: <DocumentIcon className="w-8 h-8" />,
      features: ["50+ langues", "Ecriture manuscrite", "Documents degrades", "Temps reel"],
    },
    {
      title: "Edge AI Embarque",
      description:
        "Deployez des modeles optimises directement sur vos equipements pour un traitement local avec moins de 10ms de latence.",
      icon: <ChipIcon className="w-8 h-8" />,
      features: ["Jetson / Intel NUC", "Fonctionnement offline", "Faible consommation", "Securite renforcee"],
    },
  ];

  return (
    <section className="section-lg hero-gradient">
      <div className="container-content">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium mb-3">Nos Solutions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Technologies deployees
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="card p-8">
              <div className="icon-box icon-box-primary mb-6">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{useCase.title}</h3>
              <p className="text-secondary mb-6">{useCase.description}</p>
              <div className="flex flex-wrap gap-2">
                {useCase.features.map((feature, fidx) => (
                  <span key={fidx} className="px-3 py-1 bg-neutral-800 rounded-full text-secondary text-sm">
                    {feature}
                  </span>
                ))}
              </div>
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
          Vous avez un projet similaire ?
        </h2>
        <p className="text-secondary text-lg max-w-2xl mx-auto mb-10">
          Contactez-nous pour un diagnostic gratuit et decouvrez comment
          la Computer Vision peut transformer votre activite.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/site_vitrine/contact" className="btn-primary px-8 py-4">
            Demander un diagnostic
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
export default function CasUsagePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <SectorsSection />
      <UseCasesDetailSection />
      <CTASection />
    </>
  );
}
