"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRightIcon,
  TeamIcon,
  RocketIcon,
  UploadIcon,
  CheckIcon,
  ChevronDownIcon,
  StarIcon,
  ShieldIcon,
  ChipIcon,
  UsersIcon,
  FlaskIcon,
  CloseIcon,
} from "@/components/icons";
import { FadeIn, GlowingOrb, StaggerContainer, staggerItem } from "@/components/ui/MotionWrapper";

// Page Header (simple, pas de hero)
function PageHeader() {
  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      <GlowingOrb className="top-0 left-1/4 -translate-y-1/2" color="blue" size="md" />

      <div className="container-content relative z-10">
        <FadeIn className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-primary-400 text-sm font-medium">Nous recrutons</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Rejoignez l&apos;aventure <span className="text-primary-400">HORAMA</span>
          </h1>

          <p className="text-lg text-neutral-300 leading-relaxed">
            Participez a la construction de l&apos;IA souveraine francaise.
            Nous recherchons des talents passionnes pour des projets a fort impact
            dans les secteurs critiques.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// Who Are We Section
function WhoAreWeSection() {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="container-content relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn direction="right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
              <TeamIcon className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 text-sm font-medium">Notre histoire</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Une startup deeptech <span className="text-primary-400">ambitieuse</span>
            </h2>

            <div className="space-y-3 text-neutral-300 leading-relaxed text-sm">
              <p>
                HORAMA est une startup deeptech fondee en 2025 par <strong className="text-white">Baptiste Huvelle</strong>,
                ingenieur diplome de l&apos;ECE en specialisation Defense &amp; Technologie.
              </p>
              <p>
                Selectionnes pour le <strong className="text-primary-400">CES 2026 a Las Vegas</strong>, nous ambitionnons de devenir
                le referent francais de l&apos;IA souveraine pour les secteurs critiques.
              </p>
            </div>

            <Link href="/site_vitrine/contact" className="btn-accent mt-6 inline-flex">
              Nous contacter
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl blur-xl" />
              <div className="relative aspect-[4/3] max-w-sm mx-auto overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/baptiste-huvelle.png"
                  alt="Baptiste Huvelle - Fondateur de HORAMA"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold text-sm">Baptiste Huvelle</p>
                  <p className="text-neutral-400 text-xs">Fondateur &amp; CEO</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Target icon component
function TargetIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  );
}

// Values Section
function ValuesSection() {
  const values = [
    {
      icon: <TargetIcon className="w-6 h-6" />,
      title: "Excellence technique",
      description: "Etat de l'art en IA avec des solutions pragmatiques et robustes.",
      color: "blue",
    },
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: "Souverainete",
      description: "Maitrise totale des donnees. Zero dependance etrangere.",
      color: "purple",
    },
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: "Impact reel",
      description: "Projets a fort impact pour la securite et l'industrie francaise.",
      color: "cyan",
    },
    {
      icon: <RocketIcon className="w-6 h-6" />,
      title: "Entrepreneuriat",
      description: "Autonomie et responsabilites des le premier jour.",
      color: "blue",
    },
    {
      icon: <FlaskIcon className="w-6 h-6" />,
      title: "Apprentissage",
      description: "Formation continue et R&D au coeur de l'ADN.",
      color: "purple",
    },
  ];

  const colorClasses = {
    blue: "from-primary-500/20 to-primary-600/5 border-primary-500/20 hover:border-primary-500/40",
    purple: "from-secondary-500/20 to-secondary-600/5 border-secondary-500/20 hover:border-secondary-500/40",
    cyan: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 hover:border-cyan-500/40",
  };

  const iconColorClasses = {
    blue: "text-primary-400",
    purple: "text-secondary-400",
    cyan: "text-cyan-400",
  };

  return (
    <section className="py-16 bg-background border-t border-neutral-800 relative overflow-hidden">
      <GlowingOrb className="bottom-0 left-0 translate-y-1/2 -translate-x-1/2" color="blue" size="md" />

      <div className="container-content relative z-10">
        <FadeIn className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-4">
            <StarIcon className="w-4 h-4 text-secondary-400" />
            <span className="text-secondary-400 text-sm font-medium">Nos valeurs</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ce qui nous definit
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className={`group relative p-4 rounded-xl bg-gradient-to-br ${colorClasses[value.color as keyof typeof colorClasses]} border backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px]`}
            >
              <div className={`${iconColorClasses[value.color as keyof typeof iconColorClasses]} mb-3`}>
                {value.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{value.title}</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Why Join Section
function WhyJoinSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    { icon: <ShieldIcon className="w-5 h-5" />, text: "Projets strategiques : Defense, nucleaire, sante" },
    { icon: <ChipIcon className="w-5 h-5" />, text: "Stack moderne : PyTorch, ONNX, TensorRT, Kubernetes" },
    { icon: <UsersIcon className="w-5 h-5" />, text: "Autonomie et confiance, pas de micro-management" },
    { icon: <StarIcon className="w-5 h-5" />, text: "Salaire competitif + BSPCE (stock-options)" },
    { icon: <FlaskIcon className="w-5 h-5" />, text: "Teletravail partiel et flexibilite horaires" },
    { icon: <RocketIcon className="w-5 h-5" />, text: "Startup en expansion, evolution rapide" },
  ];

  return (
    <section ref={ref} className="py-16 hero-gradient relative overflow-hidden">
      <div className="container-content relative z-10">
        <FadeIn className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <RocketIcon className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">Avantages</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Pourquoi nous rejoindre ?
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary-500/10 flex items-center justify-center text-primary-400">
                {reason.icon}
              </div>
              <p className="text-neutral-300 text-sm">{reason.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Job Card Component
interface JobCardProps {
  title: string;
  experience: string;
  type: string;
  location: string;
  description: string;
  skills: string[];
  index: number;
}

function JobCard({ title, experience, type, location, description, skills, index }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group card-glass overflow-hidden hover:border-primary-500/30 transition-all duration-300"
    >
      <div
        className="p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-white font-semibold group-hover:text-primary-400 transition-colors">
              {title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-0.5 text-xs rounded-md bg-primary-500/10 text-primary-400 border border-primary-500/20">
                {type}
              </span>
              <span className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-neutral-400">
                {experience}
              </span>
              <span className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-neutral-400">
                {location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="#candidature"
              className="btn-accent text-sm px-3 py-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              Postuler
            </Link>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-neutral-400"
            >
              <ChevronDownIcon className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 border-t border-neutral-800/50">
          <p className="text-neutral-400 text-sm mt-4 mb-3">{description}</p>
          <p className="text-neutral-500 text-xs mb-2 uppercase tracking-wider">Competences</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-white/5 rounded-full text-neutral-300 text-xs border border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Open Positions Section
function OpenPositionsSection() {
  const jobs: Omit<JobCardProps, "index">[] = [
    {
      title: "Ingenieur Machine Learning (H/F)",
      experience: "2-5 ans",
      type: "CDI",
      location: "Paris / Hybride",
      description:
        "Developpement de modeles IA (computer vision, detection, segmentation) pour nos clients defense, BTP et nucleaire. Entrainement, optimisation et deploiement de modeles en production on-premise.",
      skills: ["PyTorch", "Computer Vision", "YOLO", "Python", "MLOps"],
    },
    {
      title: "Ingenieur DevOps / MLOps (H/F)",
      experience: "3-7 ans",
      type: "CDI",
      location: "Paris / Hybride",
      description:
        "Mise en place et maintien des infrastructures on-premise et cloud souverain. Automatisation des pipelines ML (entrainement, deploiement, monitoring). Securisation des environnements.",
      skills: ["Kubernetes", "Docker", "Terraform", "CI/CD", "MLflow"],
    },
    {
      title: "Business Developer Secteurs Critiques (H/F)",
      experience: "3-5 ans",
      type: "CDI",
      location: "Paris / Hybride",
      description:
        "Developpement commercial aupres des clients defense, nucleaire, sante, BTP. Prospection, qualification leads, accompagnement avant-vente, fidelisation clients.",
      skills: ["Vente B2B", "Secteurs critiques", "Negociation", "CRM"],
    },
  ];

  return (
    <section id="postes" className="py-16 bg-background border-t border-neutral-800 relative overflow-hidden">
      <GlowingOrb className="top-0 right-1/4" color="purple" size="sm" />

      <div className="container-content relative z-10">
        <FadeIn className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-primary-400 text-sm font-medium">Postes ouverts</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Nos offres d&apos;emploi
          </h2>
        </FadeIn>

        <div className="space-y-3 max-w-3xl mx-auto">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// File icon
function FileIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Application Form Section avec upload CV fonctionnel
function ApplicationFormSection() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Verifier le type de fichier
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Format non accepte. Veuillez utiliser un fichier PDF, DOC ou DOCX.');
      return;
    }
    // Verifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Taille maximale : 5 Mo.');
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi (a remplacer par votre API)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset apres 3 secondes
    setTimeout(() => {
      setSubmitSuccess(false);
      setSelectedFile(null);
    }, 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' o';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
    return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
  };

  return (
    <section id="candidature" className="py-16 bg-neutral-950 relative overflow-hidden">
      <GlowingOrb className="bottom-0 right-0 translate-y-1/2 translate-x-1/2" color="purple" size="md" />

      <div className="container-content relative z-10">
        <div className="max-w-xl mx-auto">
          <FadeIn className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-4">
              <UploadIcon className="w-4 h-4 text-secondary-400" />
              <span className="text-secondary-400 text-sm font-medium">Candidature</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Postulez maintenant
            </h2>
            <p className="text-neutral-400 text-sm">
              Envoyez votre candidature et nous vous recontacterons rapidement.
            </p>
          </FadeIn>

          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Candidature envoyee !</h3>
              <p className="text-neutral-400 text-sm">
                Merci pour votre interet. Nous reviendrons vers vous tres rapidement.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="card-glass p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Nom complet *</label>
                    <input type="text" className="form-input" placeholder="NOM Prenom" required />
                  </div>
                  <div>
                    <label className="form-label">Email *</label>
                    <input type="email" className="form-input" placeholder="votre@email.com" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Telephone</label>
                    <input type="tel" className="form-input" placeholder="+33 6 12 34 56 78" />
                  </div>
                  <div>
                    <label className="form-label">Poste vise</label>
                    <input type="text" className="form-input" placeholder="ex: ML Engineer" />
                  </div>
                </div>

                <div>
                  <label className="form-label">Message (optionnel)</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Presentez-vous en quelques mots..."
                  />
                </div>

                {/* Zone d'upload CV */}
                <div>
                  <label className="form-label">CV *</label>

                  {selectedFile ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                        <FileIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{selectedFile.name}</p>
                        <p className="text-neutral-400 text-xs">{formatFileSize(selectedFile.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
                        isDragOver
                          ? "border-primary-500 bg-primary-500/10"
                          : "border-neutral-700 hover:border-primary-500/50 hover:bg-white/[0.02]"
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                      <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-3">
                        <UploadIcon className="w-5 h-5 text-primary-400" />
                      </div>
                      <p className="text-neutral-300 text-sm mb-1">
                        Cliquez ou glissez votre CV
                      </p>
                      <p className="text-neutral-500 text-xs">
                        PDF, DOC, DOCX (max 5 Mo)
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !selectedFile}
                  className={`w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                    isSubmitting || !selectedFile
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer ma candidature</span>
                      <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {!selectedFile && (
                  <p className="text-center text-neutral-500 text-xs">
                    * Veuillez joindre votre CV pour soumettre votre candidature
                  </p>
                )}
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function RecrutementPage() {
  return (
    <>
      <PageHeader />
      <WhoAreWeSection />
      <ValuesSection />
      <WhyJoinSection />
      <OpenPositionsSection />
      <ApplicationFormSection />
    </>
  );
}
