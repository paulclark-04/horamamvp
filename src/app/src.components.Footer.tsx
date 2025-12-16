```tsx
// src/components/Footer.tsx
import { NavLink } from "react-router-dom";
import { EyeLogo } from "./icons";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/verticales", label: "Verticales" },
  { to: "/cas-usage", label: "Cas d'usage" },
  { to: "/actualites", label: "Actualités" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/20">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-8 px-6 py-10 md:flex-row md:justify-between md:gap-6">
        <div className="flex items-center gap-2">
          <EyeLogo className="h-5 w-5 text-sky-200" />
          <span className="text-xs font-semibold tracking-[0.35em] text-sky-200">
            HORAMA
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="text-xs text-white/70 hover:text-white"
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="text-xs text-white/40">© 2025 Horama. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
```