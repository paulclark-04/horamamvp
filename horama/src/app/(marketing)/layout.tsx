import { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900">
      <Navbar />
      <main className="flex-1">
        <Container className="py-10 md:py-16">{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
