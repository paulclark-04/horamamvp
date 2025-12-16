"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/MotionWrapper";
import { ShieldIcon, CheckIcon } from "@/components/icons";

const steps = [
  {
    number: "01",
    title: "Diagnostic",
    description: "Audit de vos besoins et contraintes techniques. Analyse de faisabilité et recommandations.",
  },
  {
    number: "02",
    title: "POC Local",
    description: "Développement et validation sur vos données réelles. Résultats mesurables en quelques semaines.",
  },
  {
    number: "03",
    title: "Industrialisation MLOps",
    description: "Pipeline de production, monitoring, A/B testing. Infrastructure scalable et maintenable.",
  },
  {
    number: "04",
    title: "Transfert & Accompagnement",
    description: "Formation de vos équipes, documentation complète. Support et maintenance continue.",
  },
];

const securityItems = [
  "Chiffrement au repos et en transit",
  "Isolation réseau stricte",
  "Zéro exfiltration de données",
  "Audits de sécurité réguliers",
];

const certifications = ["ISO 27001", "SOC 2", "RGPD", "SecNumCloud"];

export function MethodologySection() {
  return (
    <section className="section-lg bg-background relative overflow-hidden">
      <div className="container-content">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Steps */}
          <div>
            <FadeIn>
              <p className="text-accent text-sm font-medium mb-3">Notre Méthode</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
                Une approche éprouvée en 4 étapes
              </h2>
            </FadeIn>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="flex gap-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center text-accent font-bold text-lg shrink-0 border border-primary-500/30"
                    >
                      {step.number}
                    </motion.div>
                    <div>
                      <h3 className="text-primary font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-secondary text-sm">{step.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right - Security Card */}
          <div className="space-y-6">
            <FadeIn direction="left">
              <div className="card-glass p-8 glow-blue">
                <div className="flex items-center gap-4 mb-6">
                  <div className="icon-box icon-box-success">
                    <ShieldIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Sécurité & Conformité</h3>
                </div>
                <ul className="space-y-4 text-secondary">
                  {securityItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckIcon className="w-5 h-5 text-success shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="card-glass p-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Certifications</h3>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert, index) => (
                    <motion.span
                      key={cert}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="badge badge-primary"
                    >
                      {cert}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
