import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "@/components/icons";

// Page Metadata
export const metadata: Metadata = {
  title: "Conferences",
  description:
    "Keynotes, workshops et formations sur l'IA responsable, la souverainete numerique et la Computer Vision industrielle.",
};

// Hero Section
function HeroSection() {
  return (
    <section className="relative pt-16 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="hero-glow" />

      <div className="relative z-10 container-content text-center py-32 md:py-40">
        <p className="text-accent text-sm font-medium mb-4">Conferences & Formations</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6 max-w-4xl mx-auto">
          Sensibilisation a l&apos;IA responsable
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-10">
          Formats d&apos;intervention personnalises pour partager notre expertise
          en IA souveraine et Computer Vision.
        </p>
        <Link href="#demande" className="btn-primary px-8 py-4">
          Demander une intervention
        </Link>
      </div>
    </section>
  );
}

// Intervention Formats Section
function FormatsSection() {
  const formats = [
    {
      title: "Keynote & Conferences",
      duration: "45-60 minutes",
      audience: "50-500 personnes",
      description:
        "Presentation inspirante sur les enjeux de l'IA responsable et la souverainete numerique.",
      topics: [
        "Ethique de l'IA",
        "Alternatives souveraines",
        "Demystification de la Computer Vision",
        "Innovation responsable",
      ],
    },
    {
      title: "Workshops Pratiques",
      duration: "2-4 heures",
      audience: "10-30 participants",
      description:
        "Exploration pratique des technologies de Computer Vision et des pipelines MLOps.",
      topics: [
        "Hands-on Computer Vision",
        "Pipelines MLOps",
        "Solutions on-premises",
        "Strategie IA",
      ],
    },
    {
      title: "Audit & Sensibilisation",
      duration: "1-2 jours",
      audience: "Equipes dirigeantes",
      description:
        "Diagnostic complet de votre maturite IA et recommandations strategiques.",
      topics: [
        "Evaluation maturite IA",
        "Feuille de route",
        "Recommandations strategiques",
        "Plan d'action",
      ],
    },
  ];

  return (
    <section className="section-lg bg-background">
      <div className="container-content">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium mb-3">Formats d&apos;Intervention</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Choisissez votre format
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {formats.map((format, idx) => (
            <div key={idx} className="card p-8 flex flex-col">
              <h3 className="text-xl font-semibold text-primary mb-4">{format.title}</h3>

              <div className="flex gap-6 mb-4 text-sm">
                <div>
                  <span className="text-muted">Duree</span>
                  <p className="text-secondary">{format.duration}</p>
                </div>
                <div>
                  <span className="text-muted">Audience</span>
                  <p className="text-secondary">{format.audience}</p>
                </div>
              </div>

              <p className="text-secondary text-sm mb-6 flex-1">{format.description}</p>

              <div>
                <p className="text-muted text-sm mb-3">Sujets couverts</p>
                <ul className="space-y-2">
                  {format.topics.map((topic, tidx) => (
                    <li key={tidx} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-success shrink-0" />
                      <span className="text-secondary text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Topics Section
function TopicsSection() {
  const topics = [
    {
      emoji: "🎯",
      title: "IA Responsable & Ethique",
      description: "Les enjeux ethiques de l'intelligence artificielle et les bonnes pratiques.",
    },
    {
      emoji: "🇫🇷",
      title: "Souverainete Numerique",
      description: "Protection des donnees et independance technologique pour les entreprises francaises.",
    },
    {
      emoji: "🏭",
      title: "Computer Vision Industrielle",
      description: "Applications concretes de la vision par ordinateur en environnement industriel.",
    },
    {
      emoji: "⚡",
      title: "Edge AI & Embarque",
      description: "Deploiement de l'IA sur des systemes embarques et en edge computing.",
    },
    {
      emoji: "🔧",
      title: "MLOps & Gouvernance",
      description: "Gestion du cycle de vie des modeles et gouvernance de l'IA en entreprise.",
    },
    {
      emoji: "🔒",
      title: "Securite & Confidentialite",
      description: "Protection des modeles et des donnees dans les projets d'IA.",
    },
    {
      emoji: "📊",
      title: "ROI & Mesure d'Impact",
      description: "Evaluer et mesurer le retour sur investissement des projets IA.",
    },
    {
      emoji: "🌱",
      title: "Transformation Responsable",
      description: "Accompagner la transformation numerique de maniere ethique et durable.",
    },
  ];

  return (
    <section className="section-lg hero-gradient">
      <div className="container-content">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium mb-3">Thematiques</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Nos domaines d&apos;expertise
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            8 thematiques cles pour comprendre et maitriser l&apos;IA responsable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, idx) => (
            <div key={idx} className="card card-interactive">
              <span className="text-3xl mb-4 block">{topic.emoji}</span>
              <h3 className="text-primary font-semibold mb-2">{topic.title}</h3>
              <p className="text-muted text-sm">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Request Form Section
function RequestSection() {
  return (
    <section id="demande" className="section-lg bg-background border-t border-neutral-800">
      <div className="container-content">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-medium mb-3">Demande d&apos;Intervention</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Organisez une conference
            </h2>
            <p className="text-secondary">
              Remplissez ce formulaire et nous vous recontacterons pour discuter de votre evenement.
            </p>
          </div>

          <div className="card p-8">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Nom *</label>
                  <input type="text" className="form-input" placeholder="Votre nom" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Organisation *</label>
                  <input type="text" className="form-input" placeholder="Votre entreprise" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input type="email" className="form-input" placeholder="votre@email.com" required />
              </div>

              <div className="form-group">
                <label className="form-label">Format souhaite</label>
                <select className="form-input">
                  <option value="">Selectionnez un format</option>
                  <option value="keynote">Keynote & Conference</option>
                  <option value="workshop">Workshop Pratique</option>
                  <option value="audit">Audit & Sensibilisation</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Taille de l&apos;audience</label>
                  <input type="text" className="form-input" placeholder="ex: 50 personnes" />
                </div>
                <div className="form-group">
                  <label className="form-label">Date souhaitee</label>
                  <input type="text" className="form-input" placeholder="ex: Juin 2026" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Decrivez votre evenement et vos attentes..."
                />
              </div>

              <button type="submit" className="btn-accent w-full justify-center py-4">
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function ConferencesPage() {
  return (
    <>
      <HeroSection />
      <FormatsSection />
      <TopicsSection />
      <RequestSection />
    </>
  );
}
