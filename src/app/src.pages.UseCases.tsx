```tsx
// src/pages/UseCases.tsx
import { GlassCard, PrimaryButton, SectionTitle } from "../components/ui";

type UseCase = {
  title: string;
  body: string;
  cta: string;
  imageSrc?: string;
  reverse?: boolean;
};

const useCases: UseCase[] = [
  {
    title: "Détection & Suivi d'Objets",
    body:
      "Nos algorithmes identifient, classifient et suivent des objets en temps réel pour optimiser la sécurité, la logistique et la gestion de flux.",
    cta: "En savoir plus",
    imageSrc: "/assets/usecase-detection.jpg",
  },
  {
    title: "Inspection Visuelle &\nContrôle Qualité",
    body:
      "Automatisez le contrôle qualité avec une précision inégalée pour détecter les défauts, anomalies et non-conformités sur vos lignes de production.",
    cta: "En savoir plus",
    imageSrc: "/assets/usecase-inspection.jpg",
    reverse: true,
  },
  {
    title: "OCR & Lecture de Document",
    body:
      "Extrayez et numérisez automatiquement les informations de documents variés (factures, formulaires, etc.) pour accélérer vos processus administratifs.",
    cta: "En savoir plus",
    imageSrc: "/assets/usecase-ocr.jpg",
  },
  {
    title: "Edge AI & Déploiement On-\nPremise",
    body:
      "Déployez des modèles d'IA directement sur vos équipements pour un traitement local, rapide et sécurisé, sans dépendance au cloud.",
    cta: "En savoir plus",
    imageSrc: "/assets/usecase-edge.jpg",
    reverse: true,
  },
  {
    title: "MLOps Industriel",
    body:
      "Nous industrialisons le cycle de vie de vos modèles de machine learning pour garantir leur performance, leur fiabilité et leur maintenabilité en production.",
    cta: "En savoir plus",
    imageSrc: "/assets/usecase-mlops.jpg",
  },
  {
    title: "Vision par Ordinateur\nSouveraine",
    body:
      "Maîtrisez vos données et votre infrastructure avec des solutions conçues pour opérer en circuit fermé, garantissant une confidentialité absolue.",
    cta: "En savoir plus",
    imageSrc: "/assets/usecase-sovereign.jpg",
    reverse: true,
  },
];

export default function UseCases() {
  return (
    <div>
      <div className="pt-14">
        <SectionTitle
          title="Nos cas d'usage"
          subtitle="Découvrez comment notre expertise en vision par ordinateur transforme les industries, de l'inspection qualité à l'intelligence embarquée."
        />
      </div>

      <div className="mt-16 space-y-8">
        {useCases.map((u) => (
          <UseCaseCard key={u.title} useCase={u} />
        ))}
      </div>
    </div>
  );
}

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <GlassCard className="p-6 md:p-10">
      <div
        className={[
          "grid items-center gap-8 md:grid-cols-2",
          useCase.reverse ? "md:[&>*:first-child]:order-2" : "",
        ].join(" ")}
      >
        <div>
          <h3 className="whitespace-pre-line text-2xl font-semibold leading-tight md:text-3xl">
            {useCase.title}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            {useCase.body}
          </p>
          <div className="mt-6">
            <PrimaryButton>{useCase.cta}</PrimaryButton>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-[420px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
            {useCase.imageSrc ? (
              <img
                src={useCase.imageSrc}
                alt={useCase.title}
                className="h-[240px] w-full object-cover md:h-[220px]"
                loading="lazy"
              />
            ) : (
              <div className="h-[220px] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.35),rgba(3,7,18,0)_70%)]" />
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
```