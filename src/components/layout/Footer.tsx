import Link from "next/link";
import Image from "next/image";
import { LinkedInIcon, TwitterIcon } from "@/components/icons";

export function Footer() {

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/site_vitrine/services", label: "Services" },
    { href: "/site_vitrine/expertise", label: "Expertise" },
    { href: "/site_vitrine/cas-usage", label: "Cas d'usage" },
    { href: "/site_vitrine/actualites", label: "Actualités" },
    { href: "/site_vitrine/recrutement", label: "Recrutement" },
    { href: "/site_vitrine/contact", label: "Contact" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-content">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              {/* Logo icon */}
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/horama_logo_trimmed.png"
                  alt="HORAMA Logo"
                  fill
                  sizes="40px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* Wordmark */}
              <div className="relative h-8 w-24">
                <Image
                  src="/images/horama_wordmark.png"
                  alt="HORAMA"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-secondary text-sm leading-relaxed max-w-md">
              Vision par Ordinateur souveraine, performante et responsable.
              Nous concevons, déployons et opérons des modèles de Computer Vision
              en local et on-prem.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link text-sm">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <p className="text-secondary">
                <a href="mailto:contact@horama.ai" className="nav-link">
                  contact@horama.ai
                </a>
              </p>
              <p className="text-secondary">
                <a href="tel:+33123456789" className="nav-link">
                  +33 (0)1 23 45 67 89
                </a>
              </p>
              <p className="text-muted">Paris, France</p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.linkedin.com/in/baptiste-huvelle/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/horama_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted text-sm">
            &copy; {currentYear} HORAMA. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/site_vitrine/legal#mentions-legales" className="nav-link">
              Mentions légales
            </Link>
            <Link href="/site_vitrine/legal#confidentialite" className="nav-link">
              Confidentialité
            </Link>
            <Link href="/site_vitrine/legal#conditions" className="nav-link">
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
