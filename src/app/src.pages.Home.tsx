```tsx
// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import { IconBadge, IconCheck, IconLock } from "../components/icons";
import {
  GlassCard,
  PrimaryButton,
  SecondaryButton,
  SectionTitle,
  SoftDivider,
} from "../components/ui";

const problemsLeft = [
  { icon: "⛔", label: "Souveraineté compromise" },
  { icon: "⛔", label: "Performance sacrifiée" },
  { icon: "⛔", label: "Vous êtes piégé" },
];

const problemsRight = [
  {
    lines: [
      "Vos données critiques sur des serveurs US",
      "Conformité RGPD/LPM impossible",
      "Vos secrets industriels ne vous appartiennent plus vraiment",
    ],
  },
  {
    lines: [
      "Latence cloud 200–500ms+",
      "Inspection temps réel impossible",
      "Production industrielle ralentie",
    ],
  },
  {
    lines: [
      "Verrouillage fournisseur total",
      "Tarifs qui grimpent",
      "Migration impossible",
      "Vous êtes otage",
    ],
  },
];

const solutions = [
  { title: "Détection &\nsuivi d’objets", icon: "⤢" },
  { title: "Inspection visuelle &\ncontrôle qualité", icon: "⦿" },
  { title: "OCR & lecture\nde documents", icon: "▦" },
  { title: "MLOps\non-premise", icon: "⛭" },
  { title: "Edge AI &\nembarqué", icon: "⌁" },
  { title: "Vision par Ordinateur\nSouveraine", icon: "◈" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <div className="pt-10 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/75 backdrop-blur-md">
          <IconBadge className="h-4 w-4 text-yellow-300" />
          <span>Sélectionné pour le CES 2026 Las Vegas</span>
        </div>

        <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          L&apos;IA que les Secteurs Critiques Attendaient.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60">
          Déployez de l&apos;IA de pointe sans perdre le contrôle.
          <br />
          Vos données, vos serveurs, votre souveraineté.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <PrimaryButton onClick={() => navigate("/contact")}>
            Parler à un expert
          </PrimaryButton>
          <SecondaryButton onClick={() => window.scrollTo({ top: 900, behavior: "smooth" })}>
            Notre approche
          </SecondaryButton>
        </div>
      </div>

      <SoftDivider />

      {/* PROBLEME */}
      <SectionTitle title="Le Problème" className="mb-10" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {problemsLeft.map((p) => (
            <GlassCard key={p.label} className="px-8 py-9">
              <div className="flex items-center justify-center gap-3">
                <span className="text-red-500">{p.icon}</span>
                <span className="text-sm font-semibold text-white/85">
                  {p.label}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-6">
          {problemsRight.map((p, idx) => (
            <GlassCard key={idx} className="px-8 py-8">
              <div className="space-y-1 text-center text-sm font-semibold text-white/80">
                {p.lines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <SoftDivider />

      {/* SOLUTIONS */}
      <SectionTitle title="Nos Solutions" className="mb-10" />
      <div className="grid gap-6 md:grid-cols-3">
        {solutions.map((s) => (
          <GlassCard
            key={s.title}
            className="grid place-items-center px-6 py-10 text-center"
          >
            <div className="text-sky-400">{s.icon}</div>
            <div className="mt-3 whitespace-pre-line text-sm font-semibold text-white/85">
              {s.title}
            </div>
          </GlassCard>
        ))}
      </div>

      <SoftDivider />

      {/* APPROCHE */}
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Notre approche souveraine
          </h2>

          <div className="mt-8 space-y-5">
            {[
              "Expression du besoin & audit",
              "Preuve de concept (PoC)",
              "Développement et intégration",
              "Maintien en condition opérationnelle",
            ].map((t, i) => (
              <div key={t} className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-sky-500 text-sm font-semibold">
                  {i + 1}
                </div>
                <div className="text-sm font-semibold text-white/85">{t}</div>
              </div>
            ))}
          </div>
        </div>

        <GlassCard className="p-7">
          <div className="flex items-center gap-3 text-white/90">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04] text-sky-300">
              <IconLock className="h-5 w-5" />
            </div>
            <div className="text-sm font-semibold">Souveraineté & confidentialité</div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Vos données restent sur votre infrastructure, garantissant une confidentialité
            totale et une conformité avec les régulations les plus strictes.
          </p>
        </GlassCard>
      </div>

      <SoftDivider />

      {/* METRICS */}
      <GlassCard className="mx-auto max-w-3xl px-8 py-10 text-center">
        <h3 className="text-xl font-semibold text-white/90">
          Des résultats qui parlent d&apos;eux même.
        </h3>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <Metric value="99.5%" label="Précision de détection" />
          <Metric value="x10" label="Vitesse d'inspection" />
          <Metric value="-80%" label="Erreurs humaines" />
        </div>
      </GlassCard>

      <SoftDivider />

      {/* POURQUOI */}
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Pourquoi HORAMA
          </h2>

          <div className="mt-7 space-y-4">
            {[
              "Expertise pointue en vision par ordinateur et MLOps on-premise.",
              "Approche souveraine garantissant la sécurité et la confidentialité de vos données.",
              "Solutions sur-mesure adaptées à vos contraintes et à votre infrastructure.",
              "Accompagnement de bout-en-bout, du PoC à la maintenance.",
            ].map((t) => (
              <div key={t} className="flex gap-3">
                <IconCheck className="mt-0.5 h-5 w-5 text-sky-300" />
                <div className="text-sm leading-relaxed text-white/70">{t}</div>
              </div>
            ))}
          </div>
        </div>

        <GlassCard className="p-7">
          <div className="flex items-center justify-end">
            <div className="h-20 w-20 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.45),rgba(34,197,94,0.15),rgba(3,7,18,0)_70%)]" />
          </div>
          <p className="mt-6 text-sm italic leading-relaxed text-white/65">
            “Notre mission est de rendre la vision par ordinateur accessible, performante et
            souveraine, pour que chaque entreprise puisse en maîtriser le potentiel.”
          </p>
          <div className="mt-6 text-sm font-semibold text-white/85">Nom du Fondateur</div>
          <div className="text-xs text-white/50">Fondateur de HORAMA</div>
        </GlassCard>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-semibold text-sky-400">{value}</div>
      <div className="mt-1 text-xs text-white/50">{label}</div>
    </div>
  );
}
```