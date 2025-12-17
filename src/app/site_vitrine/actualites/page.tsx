"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon,
  CalendarIcon,
  NewspaperIcon,
} from "@/components/icons";
import { FadeIn, GlowingOrb } from "@/components/ui/MotionWrapper";

// ============================================================================
// HOOKS & UTILITIES
// ============================================================================

function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    setTimeout(scrollToHash, 300);
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
}

// ============================================================================
// COMPONENTS
// ============================================================================

function AnimatedGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, black 70%)",
        }}
      />
    </div>
  );
}

// ============================================================================
// FLOATING NEWS SNIPPETS - Unique to Actualités
// ============================================================================

interface NewsSnippet {
  title: string;
  category: string;
  color: string;
}

function FloatingNewsSnippet({
  snippet,
  position,
  delay,
}: {
  snippet: NewsSnippet;
  position: { x: string; y: string };
  delay: number;
}) {
  const categoryColors: Record<string, string> = {
    Événement: "bg-amber-500/20 border-amber-500/40 text-amber-400",
    Presse: "bg-blue-500/20 border-blue-500/40 text-blue-400",
    Partenariat: "bg-orange-500/20 border-orange-500/40 text-orange-400",
    Technologie: "bg-purple-500/20 border-purple-500/40 text-purple-400",
  };

  return (
    <motion.div
      className="absolute hidden lg:block max-w-[200px]"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1, 1, 0.9],
        y: [20, 0, -10, -30],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatDelay: 4,
        ease: "easeInOut",
      }}
    >
      <div className="p-3 rounded-xl bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-xl">
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 border ${
            categoryColors[snippet.category] || "bg-primary-500/20 border-primary-500/40 text-primary-400"
          }`}
        >
          {snippet.category}
        </span>
        <p className="text-white text-sm font-medium line-clamp-2">{snippet.title}</p>
      </div>
    </motion.div>
  );
}

// Live ticker animation
function NewsTicker() {
  const headlines = [
    "HORAMA sélectionnée pour le CES 2026",
    "Nouveau partenariat avec l'ECE Paris",
    "La France leader européen en IA",
    "Computer Vision : enjeu de souveraineté",
    "100% des étudiants ECE formés à l'IA",
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary-600/20 via-secondary-600/20 to-primary-600/20 border-t border-b border-white/10 backdrop-blur-sm overflow-hidden">
      <motion.div
        className="flex gap-12 py-3 whitespace-nowrap"
        animate={{ x: [0, -1500] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...headlines, ...headlines, ...headlines].map((headline, idx) => (
          <span key={idx} className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-white font-medium">{headline}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ============================================================================
// HERO SECTION - News Feed Style
// ============================================================================

function HeroSection() {
  const floatingSnippets = [
    { title: "HORAMA au CES 2026 Las Vegas", category: "Événement", color: "amber", position: { x: "2%", y: "15%" }, delay: 0 },
    { title: "Partenariat stratégique avec l'ECE", category: "Partenariat", color: "orange", position: { x: "78%", y: "10%" }, delay: 2 },
    { title: "IA souveraine : les enjeux 2025", category: "Technologie", color: "purple", position: { x: "5%", y: "60%" }, delay: 4 },
    { title: "Création officielle de HORAMA", category: "Presse", color: "blue", position: { x: "80%", y: "55%" }, delay: 6 },
  ];

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
      <GridBackground />
      <GlowingOrb className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" color="blue" size="lg" />
      <GlowingOrb className="bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2" color="purple" size="lg" />

      {/* Floating news snippets */}
      {floatingSnippets.map((snippet, idx) => (
        <FloatingNewsSnippet
          key={idx}
          snippet={snippet}
          position={snippet.position}
          delay={snippet.delay}
        />
      ))}

      <div className="container-content relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge with pulse */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0)",
                "0 0 0 8px rgba(59, 130, 246, 0.1)",
                "0 0 0 0 rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <NewspaperIcon className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">Actualités</span>
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            L'actualité <AnimatedGradientText>HORAMA</AnimatedGradientText>
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            Événements, partenariats, innovations en Computer Vision et IA souveraine.
            Restez informé de notre actualité.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                const element = document.getElementById("articles");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
            >
              Voir les articles
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <Link
              href="#newsletter"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
            >
              S'abonner
            </Link>
          </div>
        </motion.div>
      </div>

      {/* News ticker at bottom */}
      <NewsTicker />
    </section>
  );
}

// ============================================================================
// NAVIGATION STICKY
// ============================================================================

function CategoriesNav() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "Tous" },
    { id: "evenement", label: "Événements" },
    { id: "presse", label: "Presse" },
    { id: "partenariat", label: "Partenariats" },
    { id: "technologie", label: "Technologie" },
  ];

  return (
    <nav className="sticky top-16 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10">
      <div className="container-content py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === category.id
                  ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                  : "text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// FEATURED ARTICLE
// ============================================================================

function FeaturedArticle() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <Link href="/site_vitrine/actualites/ces-2026" className="group block">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
          {/* Background visual */}
          <div className="aspect-[21/9] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950 to-orange-950">
              {/* Abstract visual elements */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-amber-500/20 to-transparent" />
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />

              {/* Decorative lines */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 bg-gradient-to-t from-amber-400/60 to-transparent rounded-full"
                  style={{
                    left: `${15 + i * 18}%`,
                    width: `${2 + (i % 2)}px`,
                    height: `${40 + i * 20}px`,
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={isInView ? { height: `${40 + i * 20}px`, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />
              ))}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium">
                    À la une
                  </span>
                  <span className="flex items-center gap-2 text-neutral-400 text-sm">
                    <CalendarIcon className="w-4 h-4" />
                    24 Octobre 2025
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">
                  HORAMA sélectionnée pour le CES 2026 à Las Vegas
                </h2>

                <p className="text-neutral-300 mb-6 max-w-xl text-sm md:text-base">
                  HORAMA fait partie des startups françaises sélectionnées pour représenter
                  l'innovation tricolore au Consumer Electronics Show 2026. Une reconnaissance
                  de notre expertise en IA souveraine.
                </p>

                <span className="inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-3 transition-all">
                  Lire la suite
                  <ArrowRightIcon className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// NEWS CARDS
// ============================================================================

interface Article {
  category: string;
  date: string;
  title: string;
  description: string;
  gradient: string;
  borderColor: string;
  slug: string;
}

const articles: Article[] = [
  {
    category: "Presse",
    date: "01 Octobre 2025",
    title: "Création officielle de HORAMA",
    description:
      "Baptiste Huvelle annonce la création de HORAMA, startup spécialisée en Computer Vision souveraine pour les secteurs critiques.",
    gradient: "from-blue-900/50 to-blue-950/50",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    slug: "creation-horama",
  },
  {
    category: "Partenariat",
    date: "12 Octobre 2025",
    title: "L'ECE met en avant HORAMA",
    description:
      "L'ECE Paris, école d'ingénieurs, met en lumière le parcours de son ancien étudiant Baptiste Huvelle et sa startup HORAMA.",
    gradient: "from-orange-900/50 to-orange-950/50",
    borderColor: "border-orange-500/20 hover:border-orange-500/40",
    slug: "partenariat-ece",
  },
  {
    category: "Technologie",
    date: "05 Octobre 2025",
    title: "La France confirme son leadership européen en IA",
    description:
      "Analyse du positionnement de la France dans l'écosystème européen de l'intelligence artificielle et les enjeux de souveraineté.",
    gradient: "from-purple-900/50 to-purple-950/50",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
    slug: "france-leadership-ia",
  },
  {
    category: "Technologie",
    date: "28 Septembre 2025",
    title: "Computer Vision : un enjeu de souveraineté",
    description:
      "La vision par ordinateur devient un enjeu majeur de souveraineté numérique pour les entreprises françaises et européennes.",
    gradient: "from-slate-800/50 to-slate-900/50",
    borderColor: "border-slate-500/20 hover:border-slate-500/40",
    slug: "cv-souverainete",
  },
  {
    category: "Industrie",
    date: "15 Septembre 2025",
    title: "Computer Vision : applications industrielles",
    description:
      "Panorama des applications de la vision par ordinateur dans l'industrie : contrôle qualité, surveillance, maintenance prédictive.",
    gradient: "from-amber-900/50 to-amber-950/50",
    borderColor: "border-amber-500/20 hover:border-amber-500/40",
    slug: "cv-industrie",
  },
  {
    category: "Formation",
    date: "10 Septembre 2025",
    title: "L'ECE forme 100% de ses étudiants à l'IA",
    description:
      "L'ECE Paris annonce que tous ses étudiants seront désormais formés aux fondamentaux de l'intelligence artificielle.",
    gradient: "from-cyan-900/50 to-teal-950/50",
    borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
    slug: "ece-formation-ia",
  },
];

function NewsCard({ article, index }: { article: Article; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const categoryColors: Record<string, string> = {
    Presse: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Partenariat: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    Technologie: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Industrie: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Formation: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/site_vitrine/actualites/${article.slug}`} className="group block h-full">
        <div
          className={`h-full rounded-2xl overflow-hidden bg-gradient-to-br ${article.gradient} border ${article.borderColor} backdrop-blur-sm transition-all duration-300 hover:translate-y-[-4px]`}
        >
          {/* Visual header */}
          <div className="aspect-[16/9] relative bg-gradient-to-br from-neutral-900 to-neutral-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <NewspaperIcon className="w-8 h-8 text-white/40" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                  categoryColors[article.category] || "bg-primary-500/20 text-primary-400 border-primary-500/30"
                }`}
              >
                {article.category}
              </span>
              <span className="text-neutral-500 text-xs">{article.date}</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary-300 transition-colors">
              {article.title}
            </h3>

            <p className="text-neutral-400 text-sm line-clamp-2 mb-4">{article.description}</p>

            <span className="inline-flex items-center gap-2 text-primary-400 text-sm font-medium group-hover:gap-3 transition-all">
              Lire l'article
              <ArrowRightIcon className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ArticlesSection() {
  return (
    <section id="articles" className="py-16" style={{ scrollMarginTop: "180px" }}>
      <div className="container-content">
        <FadeIn className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Derniers articles
          </h2>
        </FadeIn>

        {/* Featured */}
        <FeaturedArticle />

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <NewsCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// NEWSLETTER SECTION
// ============================================================================

function NewsletterSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="newsletter"
      className="py-20 relative overflow-hidden"
      style={{ scrollMarginTop: "180px" }}
    >
      <GlowingOrb className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" color="blue" size="lg" />
      <GlowingOrb className="top-1/2 right-0 translate-x-1/2 -translate-y-1/2" color="purple" size="lg" />

      <div className="container-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6">
            <span className="text-secondary-400 text-sm font-medium">Newsletter</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Restez informé
          </h2>

          <p className="text-neutral-400 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités
            sur l'IA souveraine et la Computer Vision.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500/50 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 whitespace-nowrap"
            >
              S'inscrire
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-neutral-950 relative overflow-hidden border-t border-neutral-800/50">
      <GlowingOrb className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" color="blue" size="lg" />

      <div className="container-content relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Vous avez une actualité à partager ?
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10">
            Contactez notre équipe pour toute demande presse ou partenariat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/site_vitrine/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
            >
              Nous contacter
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/site_vitrine"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
            >
              Retour à l'accueil
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ActualitesPage() {
  useHashScroll();

  return (
    <>
      <HeroSection />
      <CategoriesNav />
      <ArticlesSection />
      <NewsletterSection />
      <CTASection />
    </>
  );
}
