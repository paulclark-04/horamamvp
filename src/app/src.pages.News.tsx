```tsx
// src/pages/News.tsx
import { GlassCard, PrimaryButton, SectionTitle } from "../components/ui";

type NewsItem = {
  tag: string;
  date: string;
  title: string;
  imageSrc?: string;
  featured?: boolean;
};

const featured: NewsItem = {
  tag: "Événement",
  date: "24 Octobre 2023",
  title: "Horama sélectionnée pour le\nCES 2026 à Las Vegas",
  imageSrc: "/assets/news-hero.jpg",
  featured: true,
};

const items: NewsItem[] = [
  { tag: "Presse", date: "18 Octobre 2023", title: "Création officielle de Horama", imageSrc: "/assets/news-logo.jpg" },
  { tag: "Partenariat", date: "12 Octobre 2023", title: "L'ECE met en avant Horama", imageSrc: "/assets/news-ece.jpg" },
  { tag: "Technologie", date: "05 Octobre 2023", title: "La France confirme son leadership\neuropéen en IA", imageSrc: "/assets/news-france.jpg" },
  { tag: "Technologie", date: "28 Septembre 2023", title: "Computer Vision : un enjeu de\nsouveraineté technologique", imageSrc: "/assets/news-camera.jpg" },
  { tag: "Technologie", date: "21 Septembre 2023", title: "Computer Vision : applications et\nenjeux industriels", imageSrc: "/assets/news-robots.jpg" },
  { tag: "Partenariat", date: "15 Septembre 2023", title: "L'ECE forme 100% de ses étudiants à\nl'IA", imageSrc: "/assets/news-ai.jpg" },
];

export default function News() {
  return (
    <div>
      <div className="pt-12">
        <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
          Toute l&apos;actualité de Horama
        </h1>
      </div>

      <div className="mt-12">
        <FeaturedCard item={featured} />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <NewsCard key={it.title} item={it} />
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="relative h-[260px] md:h-[300px]">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover opacity-90"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.45),rgba(3,7,18,0)_75%)]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="text-xs text-sky-300">À LA UNE</div>
          <div className="mt-2 whitespace-pre-line text-3xl font-semibold leading-tight md:text-4xl">
            {item.title}
          </div>
          <div className="mt-2 text-xs text-white/70">
            {item.tag} • {item.date}
          </div>

          <div className="mt-5">
            <PrimaryButton className="px-6">Lire la suite</PrimaryButton>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="h-[140px] w-full bg-white/[0.03]">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="p-5">
        <div className="text-xs text-white/55">
          {item.tag} • {item.date}
        </div>
        <div className="mt-2 whitespace-pre-line text-sm font-semibold leading-snug text-white/90">
          {item.title}
        </div>
      </div>
    </GlassCard>
  );
}
```