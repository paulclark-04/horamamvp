```tsx
// src/components/Navbar.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { EyeLogo } from "./icons";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/verticales", label: "Verticales" },
  { to: "/cas-usage", label: "Cas d'usage" },
  { to: "/actualites", label: "Actualités" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed left-0 right-0 top-0 z-20">
      <div className="backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-6 py-5">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => navigate("/")}
          >
            <EyeLogo className="h-6 w-6 text-sky-200" />
            <span className="text-sm font-semibold tracking-[0.35em] text-sky-200">
              HORAMA
            </span>
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  [
                    "text-sm transition",
                    isActive
                      ? "font-semibold text-white"
                      : "text-white/70 hover:text-white",
                  ].join(" ")
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => navigate("/contact")}
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-glass transition hover:bg-sky-400"
          >
            Parler à un expert
          </button>
        </div>

        <div className="h-px w-full bg-white/10" />
      </div>
    </header>
  );
}
```