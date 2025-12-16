"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "@/components/icons";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Qu'est-ce que la Computer Vision souveraine ?",
    answer: "La Computer Vision souveraine désigne des solutions d'IA visuelle qui fonctionnent entièrement sur votre infrastructure (on-premise ou cloud privé), sans dépendance aux services cloud américains. Vos données restent 100% sous votre contrôle, conformément aux exigences RGPD et aux standards de sécurité les plus stricts.",
  },
  {
    question: "Quels types de projets accompagnez-vous ?",
    answer: "Nous accompagnons tout projet nécessitant de la vision par ordinateur : détection d'objets, inspection qualité, OCR industriel, surveillance intelligente, comptage et tracking, analyse vidéo temps réel. Nos clients opèrent dans l'industrie, la défense, la santé, le BTP et le nucléaire.",
  },
  {
    question: "Quelle est la durée typique d'un projet ?",
    answer: "Un POC (Proof of Concept) prend généralement 4 à 8 semaines. L'industrialisation complète avec intégration MLOps peut prendre de 3 à 6 mois selon la complexité. Nous livrons des résultats mesurables dès le POC pour valider la valeur ajoutée avant d'industrialiser.",
  },
  {
    question: "Comment garantissez-vous les performances en Edge AI ?",
    answer: "Nous optimisons nos modèles avec des techniques de quantification, pruning et distillation pour atteindre des latences inférieures à 10ms sur hardware embarqué. Nous utilisons des frameworks comme TensorRT, OpenVINO et ONNX Runtime pour maximiser les performances sur GPU, CPU ou accélérateurs dédiés.",
  },
  {
    question: "Quelles certifications de sécurité proposez-vous ?",
    answer: "Nos solutions sont conçues pour être compatibles ISO 27001, SOC 2 et RGPD. Nous proposons des audits de sécurité réguliers, du chiffrement au repos et en transit, une isolation réseau stricte, et une politique de zéro exfiltration de données. Nous accompagnons également vers la qualification SecNumCloud.",
  },
  {
    question: "Proposez-vous de la formation pour nos équipes ?",
    answer: "Oui, le transfert de compétences fait partie intégrante de notre méthodologie. Nous formons vos équipes sur l'utilisation, la maintenance et l'évolution des solutions déployées. Documentation complète, sessions de formation et support continu sont inclus.",
  },
];

function FAQItem({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      initial={false}
      className="border-b border-neutral-800 last:border-b-0"
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-white group-hover:text-primary-400 transition-colors pr-8">
          {item.question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 group-hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300">
          {isOpen ? (
            <MinusIcon className="w-4 h-4 text-primary-400" />
          ) : (
            <PlusIcon className="w-4 h-4 text-neutral-400 group-hover:text-primary-400" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-400 leading-relaxed pr-12">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-lg bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-background to-background" />

      <div className="container-content relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Questions fréquentes
            </h2>
            <p className="text-neutral-400 text-lg mb-8">
              Tout ce que vous devez savoir sur nos solutions de Computer Vision souveraine.
            </p>

            {/* Contact CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20">
              <p className="text-white font-medium mb-2">Vous avez d&apos;autres questions ?</p>
              <p className="text-neutral-400 text-sm mb-4">
                Notre équipe d&apos;experts est disponible pour répondre à toutes vos interrogations.
              </p>
              <a
                href="/site_vitrine/contact"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                Contactez-nous
                <span className="text-lg">→</span>
              </a>
            </div>
          </motion.div>

          {/* Right - FAQ Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-900/50 rounded-2xl border border-neutral-800 p-6 md:p-8"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                item={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
