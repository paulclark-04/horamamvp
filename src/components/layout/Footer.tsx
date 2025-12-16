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
              {/* Logo avec taille contrôlée */}
              <div className="relative w-12 h-12 overflow-hidden flex-shrink-0">
                <Image
                  src="/images/logo.svg"
                  alt="HORAMA Logo"
                  fill
                  sizes="48px"
                  className="object-contain scale-[1.85] translate-y-[5%] brightness-110 transition-transform duration-300 group-hover:scale-[1.95]"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-semibold text-xl tracking-tight">
                  HORAMA
                </span>
                <span className="text-primary-400/70 text-[11px] font-medium tracking-wide">
                  Vision Souveraine
                </span>
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
                href="https://linkedin.com/company/horama"
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
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted text-sm">
            &copy; {currentYear} HORAMA. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/mentions-legales" className="nav-link">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="nav-link">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
