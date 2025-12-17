"use client";

import { Header, Footer } from "@/components/layout";
import { AnnouncementProvider } from "@/contexts/AnnouncementContext";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <AnnouncementProvider initialVisible={false}>
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AnnouncementProvider>
  );
}
