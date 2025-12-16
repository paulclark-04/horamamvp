```tsx
// src/components/SiteLayout.tsx
import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AmbientBackground from "./AmbientBackground";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen text-white">
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10 mx-auto w-full max-w-[1120px] px-6 pb-24 pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```