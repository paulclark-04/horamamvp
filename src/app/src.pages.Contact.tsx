```tsx
// src/pages/Contact.tsx
import { useMemo, useState } from "react";
import { IconArrowRight, IconLinkedIn, IconMail, IconPin } from "../components/icons";
import { Accordion, GlassCard, Pill, PrimaryButton, SecondaryButton, SectionTitle } from "../components/ui";

const faqItems = [
  {
    q: "Quelle est la durée d’un rendez-vous ?",
    a: "Nos rendez-vous durent généralement entre 30 et 60 minutes, selon la complexité de votre projet et vos besoins spécifiques.",
  },
  {
    q: "Quels types de clients accompagnez-vous ?",
    a: "Nous travaillons principalement avec des entreprises des secteurs critiques comme la défense, le nucléaire, la construction et la recherche technologique.",
  },
  {
    q: "Que garantissez-vous en termes de souveraineté ?",
    a: "Nous assurons une totale confidentialité et souveraineté de vos données, avec des solutions entièrement développées et hébergées en France.",
  },
  {
    q: "Quel est votre délai de mise en œuvre ?",
    a: "Le délai varie selon la complexité du projet, mais nous visons généralement un déploiement initial entre 3 et 6 mois.",
  },
  {
    q: "Proposez-vous des audits de sécurité ?",
    a: "Oui, nous réalisons des audits complets de sécurité et de conformité pour chaque solution IA que nous développons.",
  },
];

export default function Contact() {
  return (
    <div>
      <div className="pt-10 text-center">
        <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Echangeons sur votre projet d&apos;IA souveraine
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60">
          Décrivez-nous vos enjeux, nous vous proposerons une solution adaptée à votre contexte et vos contraintes de souveraineté, conformité et performance
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <PrimaryButton onClick={() => window.scrollTo({ top: 520, behavior: "smooth" })}>
            C&apos;est parti
          </PrimaryButton>
          <SecondaryButton onClick={() => window.scrollTo({ top: 520, behavior: "smooth" })}>
            Contactez-nous
          </SecondaryButton>
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <ContactFormCard />
      </div>

      <div className="mt-20">
        <SectionTitle title="Questions Fréquentes avant de nous contacter" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={faqItems} />
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
        <Pill icon={<IconMail className="h-5 w-5" />}>
          <div className="text-sm text-white/90">Contact@horama.ai</div>
          <div className="text-xs text-white/55">Réponse garantie sous 48h</div>
        </Pill>

        <Pill icon={<IconLinkedIn className="h-5 w-5" />}>
          <div className="text-sm text-white/90">linkedin.com/in/baptiste</div>
          <div className="text-xs text-white/55">-huvelle</div>
        </Pill>

        <Pill icon={<IconPin className="h-5 w-5" />}>
          <div className="text-sm text-white/90">12 rue de la République,</div>
          <div className="text-xs text-white/55">75008, Paris, France</div>
        </Pill>
      </div>
    </div>
  );
}

function ContactFormCard() {
  const [profile, setProfile] = useState<string>("Secteur de la défense");

  return (
    <GlassCard className="w-full max-w-[760px] p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div className="text-xs text-white/55">Étape 1/4</div>
        <div className="text-xs text-white/55">Vos informations</div>
      </div>

      <div className="mt-3 h-0.5 w-full rounded-full bg-white/10">
        <div className="h-0.5 w-[28%] rounded-full bg-sky-500" />
      </div>

      <form className="mt-6 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Prénom" placeholder="" />
          <Input label="Nom" placeholder="" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Email professionnel" placeholder="" type="email" />
          <Input label="Numéro de téléphone" placeholder="" type="tel" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Select label="Sélectionnez un sujet" options={["", "Audit", "PoC", "Déploiement", "MLOps"]} />
          <Select label="Choisissez un domaine" options={["", "Défense", "Nucléaire", "Construction", "R&D", "Conseil", "Autre"]} />
        </div>

        <div>
          <div className="text-xs font-semibold text-white/70">Votre profile professionnel</div>
          <div className="mt-3 grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 md:grid-cols-2">
            {[
              "Secteur de la défense",
              "Secteur nucléaire",
              "Secteur de la construction",
              "Recherche et développement",
              "Conseil stratégique",
              "Autre",
            ].map((v) => (
              <label key={v} className="flex cursor-pointer items-center gap-3 text-sm text-white/75">
                <input
                  type="radio"
                  name="profile"
                  checked={profile === v}
                  onChange={() => setProfile(v)}
                  className="h-4 w-4 accent-sky-500"
                />
                {v}
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-white/70">Décrivez votre projet</div>
          <textarea
            className="mt-3 h-28 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80 outline-none placeholder:text-white/35 focus:border-sky-500/60"
            placeholder=""
          />
        </div>

        <label className="flex items-center gap-3 text-xs text-white/60">
          <input type="checkbox" className="h-4 w-4 accent-sky-500" />
          J&apos;accepte les conditions générales
        </label>

        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            Soumettre
            <IconArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </GlassCard>
  );
}

function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-white/70">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80 outline-none placeholder:text-white/35 focus:border-sky-500/60"
      />
    </label>
  );
}

function Select({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-white/70">{label}</div>
      <select className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80 outline-none focus:border-sky-500/60">
        {options.map((o, idx) => (
          <option key={idx} value={o} className="bg-[#05060A]">
            {o || " "}
          </option>
        ))}
      </select>
    </label>
  );
}
```