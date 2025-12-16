"use client";

import { motion } from "framer-motion";
import { CheckIcon, CancelIcon } from "@/components/icons";

interface ComparisonRow {
  feature: string;
  horama: boolean | string;
  cloudUS: boolean | string;
  highlight?: boolean;
}

const comparisonData: ComparisonRow[] = [
  { feature: "Souveraineté des données", horama: true, cloudUS: false, highlight: true },
  { feature: "Conformité RGPD native", horama: true, cloudUS: false },
  { feature: "Déploiement On-Premise", horama: true, cloudUS: false, highlight: true },
  { feature: "Latence Edge (<10ms)", horama: true, cloudUS: false },
  { feature: "Pas de dépendance cloud", horama: true, cloudUS: false },
  { feature: "Audit de sécurité complet", horama: true, cloudUS: "Partiel" },
  { feature: "Support en français", horama: true, cloudUS: false },
  { feature: "Transfert de compétences", horama: true, cloudUS: false },
  { feature: "Prix prévisible", horama: true, cloudUS: false },
  { feature: "Accès au code source", horama: "Sur demande", cloudUS: false },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-yellow-500 text-sm font-medium">{value}</span>;
  }
  return value ? (
    <CheckIcon className="w-6 h-6 text-success" />
  ) : (
    <CancelIcon className="w-6 h-6 text-neutral-600" />
  );
}

export function ComparisonSection() {
  return (
    <section className="section-lg bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary-950/10 to-background" />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            Comparatif
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            HORAMA vs Cloud US
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Pourquoi choisir une solution souveraine plutôt qu&apos;un cloud américain ?
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900/50 backdrop-blur-xl">
            {/* Header row */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-neutral-900 border-b border-neutral-800">
              <div className="text-neutral-400 font-medium">Fonctionnalité</div>
              <div className="text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm">
                  HORAMA
                </span>
              </div>
              <div className="text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-neutral-800 text-neutral-400 font-medium text-sm">
                  Cloud US
                </span>
              </div>
            </div>

            {/* Data rows */}
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-3 gap-4 p-4 md:p-6 border-b border-neutral-800/50 last:border-b-0 ${
                  row.highlight ? "bg-primary-500/5" : ""
                } hover:bg-white/[0.02] transition-colors`}
              >
                <div className={`text-sm md:text-base ${row.highlight ? "text-white font-medium" : "text-neutral-300"}`}>
                  {row.feature}
                </div>
                <div className="flex justify-center items-center">
                  <FeatureCell value={row.horama} />
                </div>
                <div className="flex justify-center items-center">
                  <FeatureCell value={row.cloudUS} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-neutral-500 text-sm mt-6"
          >
            * Comparaison basée sur les offres standard des principaux fournisseurs cloud US (AWS, GCP, Azure)
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
