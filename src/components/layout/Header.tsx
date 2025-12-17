"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { useAnnouncement } from "@/contexts/AnnouncementContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`nav-link relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full
        ${
          isActive
            ? "nav-link-active text-white bg-white/10 backdrop-blur-sm"
            : "text-neutral-300 hover:text-white hover:bg-white/5"
        }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="nav-active-bg absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

interface HeaderProps {
  ctaText?: string;
  ctaHref?: string;
}

export function Header({
  ctaText = "Parler à un expert",
  ctaHref = "/site_vitrine/contact",
}: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isVisible, isAnimating } = useAnnouncement();

  // Hauteur du bandeau d'annonce (40px = top-10)
  const BANNER_HEIGHT = 40;

  // Le header doit être en haut si le bandeau n'est pas visible ou est en train de se fermer
  const shouldBeAtTop = !isVisible || isAnimating;

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/site_vitrine/services", label: "Services" },
    { href: "/site_vitrine/expertise", label: "Expertise" },
    { href: "/site_vitrine/cas-usage", label: "Cas d'usage" },
    { href: "/site_vitrine/actualites", label: "Actualités" },
    { href: "/site_vitrine/recrutement", label: "Recrutement" },
    { href: "/site_vitrine/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ top: isVisible ? BANNER_HEIGHT : 0 }}
      animate={{ top: shouldBeAtTop ? 0 : BANNER_HEIGHT }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 right-0 z-50"
    >
      {/* Glass background - hauteur standard */}
      <div className="absolute inset-x-0 top-0 h-16 lg:h-18 bg-black/80 dark:bg-black/80 light:bg-white/90 backdrop-blur-xl border-b border-white/10 light:border-navy-200/50 light:shadow-md light:shadow-navy-900/5" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 lg:h-18 bg-gradient-to-b from-white/[0.04] to-transparent" />

      <div className="container-wide relative px-4 md:px-10 lg:px-20">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo - grand, déborde du header sans affecter le layout */}
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative -my-4"
            >
              {/* Glow subtil au hover */}
              <div className="pointer-events-none absolute -inset-2 rounded-full bg-primary-500/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-80" />

              {/* Logo icon */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14">
                <Image
                  src="/images/horama_logo_trimmed.png"
                  alt="HORAMA"
                  fill
                  sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 56px"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Wordmark */}
            <div className="hidden sm:block relative h-8 lg:h-10 w-24 lg:w-32">
              <Image
                src="/images/horama_wordmark.png"
                alt="HORAMA"
                fill
                sizes="(max-width: 1024px) 96px, 128px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                isActive={pathname === link.href}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: CTA + Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* CTA Button - hidden on mobile */}
            <Link
              href={ctaHref}
              className="header-cta hidden md:inline-flex relative group items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:scale-105"
            >
              <span>{ctaText}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn lg:hidden p-2.5 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Theme Toggle - position fixe à droite */}
          <div className="fixed right-4 top-3 z-50">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden py-4 border-t border-white/5"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "text-white bg-white/10"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={ctaHref}
                className="mt-4 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium text-sm text-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {ctaText}
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
