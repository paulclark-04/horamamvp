"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Container } from "./Container";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/verticales", label: "Verticales" },
  { href: "/cas-usage", label: "Cas d'usage" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b border-zinc-200 bg-white text-sm">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="font-semibold tracking-tight text-zinc-900">
          Horama
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-700 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 lg:hidden"
          aria-expanded={isOpen}
          aria-label="Basculer la navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-zinc-900 ${
                isActive(link.href)
                  ? "text-zinc-900"
                  : "text-zinc-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>

      {isOpen && (
        <div className="border-t border-zinc-200 bg-white lg:hidden">
          <Container className="flex flex-col gap-2 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-2 py-2 transition-colors hover:bg-zinc-100 ${
                  isActive(link.href)
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-600"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
