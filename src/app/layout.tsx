import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://horama.ai"),
  title: {
    default: "HORAMA - Vision par Ordinateur Souveraine",
    template: "%s | HORAMA",
  },
  description:
    "Vision par Ordinateur souveraine, performante et responsable. Nous concevons, deployons et operons des modeles de Computer Vision en local et on-prem.",
  keywords: [
    "Computer Vision",
    "Vision par Ordinateur",
    "IA Souveraine",
    "MLOps",
    "Edge AI",
    "On-Premise",
    "Detection d'objets",
    "Controle qualite",
    "OCR",
    "Intelligence Artificielle",
    "France",
  ],
  authors: [{ name: "HORAMA", url: "https://horama.ai" }],
  creator: "HORAMA",
  publisher: "HORAMA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://horama.ai",
    siteName: "HORAMA",
    title: "HORAMA - Vision par Ordinateur Souveraine",
    description:
      "Vision par Ordinateur souveraine, performante et responsable. Solutions IA on-premise pour les secteurs critiques.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "HORAMA - Vision par Ordinateur Souveraine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HORAMA - Vision par Ordinateur Souveraine",
    description:
      "Vision par Ordinateur souveraine, performante et responsable.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
