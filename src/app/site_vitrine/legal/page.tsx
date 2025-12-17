"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, ShieldIcon, DocumentIcon, LockIcon } from "@/components/icons";

// ============================================================================
// COMPONENTS
// ============================================================================

function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 grid-background-container">
      <div
        className="absolute inset-0 opacity-[0.02] grid-pattern"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0 grid-radial-mask"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, black 70%)",
        }}
      />
    </div>
  );
}

function SectionCard({
  id,
  icon,
  title,
  children
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="legal-card mb-12 p-8 md:p-10 rounded-2xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm"
      style={{ scrollMarginTop: "120px" }}
    >
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
        <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      </div>
      <div className="legal-content prose prose-invert max-w-none">
        {children}
      </div>
    </motion.section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="text-neutral-300 space-y-3">{children}</div>
    </div>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  return (
    <section className="legal-hero pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
      <GridBackground />

      <div className="container-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            Retour à l'accueil
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Informations légales
          </h1>

          <p className="text-lg text-neutral-300 mb-8">
            Mentions légales, politique de confidentialité et conditions d'utilisation du site HORAMA.
          </p>

          {/* Navigation rapide */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#mentions-legales"
              className="legal-nav-link px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              Mentions légales
            </a>
            <a
              href="#confidentialite"
              className="legal-nav-link px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              Confidentialité
            </a>
            <a
              href="#conditions"
              className="legal-nav-link px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              Conditions d'utilisation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// LEGAL CONTENT
// ============================================================================

function LegalContent() {
  return (
    <section className="legal-content-section pb-20">
      <div className="container-content max-w-4xl">

        {/* MENTIONS LÉGALES */}
        <SectionCard
          id="mentions-legales"
          icon={<DocumentIcon className="w-6 h-6" />}
          title="Mentions légales"
        >
          <SubSection title="Éditeur du site">
            <p><strong>Raison sociale :</strong> HORAMA</p>
            <p><strong>Forme juridique :</strong> SAS (Société par Actions Simplifiée)</p>
            <p><strong>Capital social :</strong> 100 000 €</p>
            <p><strong>SIREN :</strong> 123 456 789</p>
            <p><strong>Code APE :</strong> 6201Z - Programmation informatique</p>
            <p><strong>TVA Intracommunautaire :</strong> FR12345678901</p>
          </SubSection>

          <SubSection title="Siège social">
            <p>123 Avenue de l'Innovation<br />75001 Paris, France</p>
          </SubSection>

          <SubSection title="Contact">
            <p><strong>Email :</strong> <a href="mailto:contact@horama.ai" className="text-primary-400 hover:text-primary-300">contact@horama.ai</a></p>
            <p><strong>Téléphone :</strong> +33 (0)1 23 45 67 89</p>
          </SubSection>

          <SubSection title="Directeur de la publication">
            <p>M. Baptiste HUVELLE, Président de HORAMA</p>
          </SubSection>

          <SubSection title="Hébergement">
            <p><strong>Hébergeur :</strong> OVHcloud</p>
            <p><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</p>
            <p><strong>Téléphone :</strong> 1007</p>
          </SubSection>
        </SectionCard>

        {/* POLITIQUE DE CONFIDENTIALITÉ */}
        <SectionCard
          id="confidentialite"
          icon={<LockIcon className="w-6 h-6" />}
          title="Politique de confidentialité"
        >
          <p className="text-neutral-400 text-sm mb-8 italic">Dernière mise à jour : 1er janvier 2024</p>

          <SubSection title="Responsable du traitement">
            <p>HORAMA (SAS au capital de 100 000 €)<br />123 Avenue de l'Innovation, 75001 Paris</p>
          </SubSection>

          <SubSection title="Données collectées">
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li><strong>Données d'identification :</strong> nom, prénom, email</li>
              <li><strong>Données de contact :</strong> téléphone, adresse</li>
              <li><strong>Données professionnelles :</strong> entreprise, fonction, secteur d'activité</li>
              <li><strong>Données de navigation :</strong> adresse IP, cookies, pages visitées</li>
              <li><strong>Données de communication :</strong> messages via formulaires de contact</li>
            </ul>
          </SubSection>

          <SubSection title="Finalités du traitement">
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li>Répondre à vos demandes de contact et d'information</li>
              <li>Vous proposer nos services et solutions adaptés</li>
              <li>Améliorer notre site et nos services</li>
              <li>Respecter nos obligations légales</li>
              <li>Réaliser des statistiques de visite anonymisées</li>
            </ul>
          </SubSection>

          <SubSection title="Base légale">
            <p>Les traitements sont fondés sur votre consentement explicite, notre intérêt légitime commercial, ou l'exécution de mesures précontractuelles.</p>
          </SubSection>

          <SubSection title="Durée de conservation">
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
              <li><strong>Données de navigation :</strong> 13 mois maximum</li>
              <li><strong>Données contractuelles :</strong> 10 ans après la fin du contrat</li>
            </ul>
          </SubSection>

          <SubSection title="Vos droits (RGPD)">
            <p className="mb-4">Conformément au Règlement Général sur la Protection des Données, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li><strong>Droit d'accès :</strong> obtenir confirmation du traitement de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit d'effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
              <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
              <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
            </ul>
            <p className="mt-4">Pour exercer ces droits : <a href="mailto:privacy@horama.ai" className="text-primary-400 hover:text-primary-300">privacy@horama.ai</a></p>
          </SubSection>

          <SubSection title="Sécurité des données">
            <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre la destruction, la perte, l'altération, la divulgation ou l'accès non autorisé.</p>
          </SubSection>

          <SubSection title="Cookies">
            <p>Notre site utilise des cookies techniques nécessaires au fonctionnement et des cookies de mesure d'audience anonymisée. Vous pouvez configurer votre navigateur pour refuser les cookies.</p>
          </SubSection>

          <SubSection title="Délégué à la Protection des Données">
            <p>Contact DPO : <a href="mailto:dpo@horama.ai" className="text-primary-400 hover:text-primary-300">dpo@horama.ai</a></p>
          </SubSection>

          <SubSection title="Réclamation">
            <p>En cas de violation de vos droits, vous pouvez introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">CNIL</a>.</p>
          </SubSection>
        </SectionCard>

        {/* CONDITIONS D'UTILISATION */}
        <SectionCard
          id="conditions"
          icon={<ShieldIcon className="w-6 h-6" />}
          title="Conditions d'utilisation"
        >
          <SubSection title="Propriété intellectuelle">
            <p>L'ensemble du contenu présent sur ce site (textes, images, graphismes, logo, icônes, logiciels, etc.) est protégé par le droit d'auteur et appartient à HORAMA ou à ses partenaires. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans autorisation écrite préalable.</p>
          </SubSection>

          <SubSection title="Utilisation du site">
            <p>L'utilisation de ce site implique l'acceptation pleine et entière des présentes conditions d'utilisation. HORAMA se réserve le droit de modifier ces conditions à tout moment. Il appartient à l'utilisateur de les consulter régulièrement.</p>
          </SubSection>

          <SubSection title="Limitation de responsabilité">
            <p>HORAMA ne pourra être tenue responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site, résultant de l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises, ou de l'apparition d'un bug ou d'une incompatibilité.</p>
          </SubSection>

          <SubSection title="Liens hypertextes">
            <p>Le site peut contenir des liens hypertextes vers d'autres sites. HORAMA n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.</p>
          </SubSection>

          <SubSection title="Droit applicable">
            <p>Les présentes conditions sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </SubSection>
        </SectionCard>

        {/* CTA retour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/site_vitrine/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
          >
            Une question ? Contactez-nous
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function LegalPage() {
  return (
    <div className="legal-page">
      <HeroSection />
      <LegalContent />
    </div>
  );
}
