```tsx
// src/pages/Verticales.tsx
import { FeatureRow, SoftDivider, SectionTitle } from "../components/ui";

export default function Verticales() {
  return (
    <div>
      <div className="pt-10">
        <SectionTitle
          title="Nos Verticales"
          subtitle="Des solutions complètes et souveraines, de l'architecture à la formation, pour maîtriser l'ensemble de la chaîne de valeur de la vision par ordinateur."
        />
      </div>

      <SoftDivider />

      <div className="space-y-20">
        <FeatureRow
          title="Architecture sur-
mesure"
          body="Nous concevons et mettons en œuvre des architectures de vision par ordinateur entièrement personnalisées, optimisées pour vos contraintes matérielles et vos objectifs de performance, en garantissant une intégration transparente à votre infrastructure existante."
          cta={{ label: "En savoir plus" }}
          imageAlt="Architecture"
          imageSrc="/assets/verticale-architecture.jpg"
        />

        <div className="relative">
          <div className="absolute -inset-x-10 -inset-y-24 rounded-[48px] bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.38),rgba(3,7,18,0)_65%)] blur-2xl" />
          <div className="relative">
            <FeatureRow
              title="Socle
technologique
personnalisé"
              body="HORAMA développe et maintient votre propre socle technologique (MLOps) on-premise, vous offrant une autonomie complète, une reproductibilité parfaite de vos modèles et une maîtrise totale de vos pipelines de données et d'entraînement."
              cta={{ label: "Découvrir notre approche" }}
              imageAlt="Socle technologique"
              imageSrc="/assets/verticale-socle.jpg"
              reverse
            />
          </div>
        </div>

        <FeatureRow
          title="Formation /
Sensibilisation"
          body="Nous renforçons l'autonomie de vos équipes par des formations ciblées et des sessions de sensibilisation, couvrant les fondamentaux de la vision par ordinateur, les meilleures pratiques MLOps et l'utilisation de votre socle technologique."
          cta={{ label: "Parler à un expert" }}
          imageAlt="Formation"
          imageSrc="/assets/verticale-formation.jpg"
        />
      </div>
    </div>
  );
}
```