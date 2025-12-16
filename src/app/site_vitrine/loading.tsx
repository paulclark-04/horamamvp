// Loading skeleton for site_vitrine pages
export default function Loading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Hero Skeleton */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 container-content text-center py-32 md:py-40">
          {/* Badge Skeleton */}
          <div className="h-8 w-48 bg-neutral-800 rounded-full mx-auto mb-8" />

          {/* Title Skeleton */}
          <div className="h-12 md:h-16 w-3/4 bg-neutral-800 rounded-lg mx-auto mb-6" />
          <div className="h-12 md:h-16 w-1/2 bg-neutral-800 rounded-lg mx-auto mb-6" />

          {/* Subtitle Skeleton */}
          <div className="h-6 w-2/3 bg-neutral-800 rounded-lg mx-auto mb-4" />
          <div className="h-6 w-1/2 bg-neutral-800 rounded-lg mx-auto mb-10" />

          {/* Buttons Skeleton */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-14 w-48 bg-neutral-800 rounded-full" />
            <div className="h-14 w-48 bg-neutral-800 rounded-full" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="section-lg bg-background">
        <div className="container-content">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="h-4 w-24 bg-neutral-800 rounded mx-auto mb-4" />
            <div className="h-10 w-64 bg-neutral-800 rounded-lg mx-auto mb-4" />
            <div className="h-6 w-96 bg-neutral-800 rounded mx-auto" />
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card">
                <div className="w-12 h-12 bg-neutral-800 rounded-xl mb-4" />
                <div className="h-6 w-3/4 bg-neutral-800 rounded mb-3" />
                <div className="h-4 w-full bg-neutral-800 rounded mb-2" />
                <div className="h-4 w-2/3 bg-neutral-800 rounded mb-4" />
                <div className="h-4 w-24 bg-neutral-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
