import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

// Page Metadata
export const metadata: Metadata = {
  title: "Actualites",
  description:
    "Toute l'actualite de HORAMA : evenements, partenariats, innovations en Computer Vision et IA souveraine.",
};

// Featured Article Component
function FeaturedArticle() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-900/30 to-secondary-900/20 border border-neutral-800">
      <div className="aspect-[16/9] md:aspect-[21/9] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 to-secondary-950">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-orange-500/20 to-transparent" />
          <div className="absolute bottom-10 left-10 w-2 h-8 bg-orange-400/60 rounded-full blur-sm" />
          <div className="absolute bottom-8 left-20 w-1 h-12 bg-orange-300/50 rounded-full blur-sm" />
          <div className="absolute bottom-12 left-32 w-2 h-16 bg-yellow-400/40 rounded-full blur-sm" />
          <div className="absolute bottom-6 right-20 w-1 h-10 bg-orange-400/50 rounded-full blur-sm" />
          <div className="absolute bottom-10 right-32 w-2 h-14 bg-yellow-300/40 rounded-full blur-sm" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
              HORAMA selectionnee pour le CES 2026 a Las Vegas
            </h2>
            <div className="flex items-center gap-3 text-secondary text-sm mb-4">
              <span className="text-accent">Evenement</span>
              <span>-</span>
              <span>24 Octobre 2025</span>
            </div>
            <p className="text-secondary mb-4 max-w-xl">
              HORAMA fait partie des startups francaises selectionnees pour representer
              l&apos;innovation tricolore au Consumer Electronics Show 2026. Une reconnaissance
              de notre expertise en IA souveraine.
            </p>
            <Link href="/site_vitrine/actualites/ces-2026" className="btn-accent">
              Lire la suite
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// News Card Component
interface NewsCardProps {
  category: string;
  date: string;
  title: string;
  description: string;
  color: string;
  slug: string;
}

function NewsCard({ category, date, title, description, color, slug }: NewsCardProps) {
  return (
    <Link href={`/site_vitrine/actualites/${slug}`} className="group">
      <div className="card overflow-hidden hover:transform hover:scale-[1.02] transition-all">
        {/* Image Placeholder */}
        <div className={`aspect-[4/3] ${color} relative`}>
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted mb-2">
            <span className="text-accent">{category}</span>
            <span>-</span>
            <span>{date}</span>
          </div>
          <h3 className="text-primary font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}

// News Grid Section
function NewsGrid() {
  const articles = [
    {
      category: "Presse",
      date: "01 Octobre 2025",
      title: "Creation officielle de HORAMA",
      description:
        "Baptiste Huvelle annonce la creation de HORAMA, startup specialisee en Computer Vision souveraine pour les secteurs critiques.",
      color: "bg-gradient-to-br from-blue-900 to-blue-950",
      slug: "creation-horama",
    },
    {
      category: "Partenariat",
      date: "12 Octobre 2025",
      title: "L'ECE met en avant HORAMA",
      description:
        "L'ECE Paris, ecole d'ingenieurs, met en lumiere le parcours de son ancien etudiant Baptiste Huvelle et sa startup HORAMA.",
      color: "bg-gradient-to-br from-orange-600 to-orange-800",
      slug: "partenariat-ece",
    },
    {
      category: "Technologie",
      date: "05 Octobre 2025",
      title: "La France confirme son leadership europeen en IA",
      description:
        "Analyse du positionnement de la France dans l'ecosysteme europeen de l'intelligence artificielle et les enjeux de souverainete.",
      color: "bg-gradient-to-br from-blue-600 via-white to-red-600",
      slug: "france-leadership-ia",
    },
    {
      category: "Technologie",
      date: "28 Septembre 2025",
      title: "Computer Vision : un enjeu de souverainete technologique",
      description:
        "La vision par ordinateur devient un enjeu majeur de souverainete numerique pour les entreprises francaises et europeennes.",
      color: "bg-gradient-to-br from-zinc-700 to-zinc-900",
      slug: "cv-souverainete",
    },
    {
      category: "Industrie",
      date: "15 Septembre 2025",
      title: "Computer Vision : applications industrielles",
      description:
        "Panorama des applications de la vision par ordinateur dans l'industrie : controle qualite, surveillance, maintenance predictive.",
      color: "bg-gradient-to-br from-yellow-600 to-amber-800",
      slug: "cv-industrie",
    },
    {
      category: "Formation",
      date: "10 Septembre 2025",
      title: "L'ECE forme 100% de ses etudiants a l'IA",
      description:
        "L'ECE Paris annonce que tous ses etudiants seront desormais formes aux fondamentaux de l'intelligence artificielle.",
      color: "bg-gradient-to-br from-cyan-600 to-teal-800",
      slug: "ece-formation-ia",
    },
  ];

  return (
    <section className="section">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
    </section>
  );
}

// Newsletter Section
function NewsletterSection() {
  return (
    <section className="section-lg hero-gradient">
      <div className="container-content">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Restez informe
          </h2>
          <p className="text-secondary mb-8">
            Inscrivez-vous a notre newsletter pour recevoir les dernieres actualites
            sur l&apos;IA souveraine et la Computer Vision.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="form-input flex-1"
              required
            />
            <button type="submit" className="btn-accent whitespace-nowrap">
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function ActualitesPage() {
  return (
    <div className="pt-24 md:pt-28">
      <div className="container-content">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8">
          Toute l&apos;actualite de HORAMA
        </h1>

        {/* Featured Article */}
        <FeaturedArticle />

        {/* News Grid */}
        <NewsGrid />
      </div>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
