import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-6 text-sm text-zinc-600">
      <Container className="flex items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} Horama. Tous droits réservés.</span>
        <div className="flex gap-4">
          <a className="hover:text-zinc-900" href="/mentions-legales">
            Mentions légales
          </a>
          <a className="hover:text-zinc-900" href="/privacy">
            Confidentialité
          </a>
        </div>
      </Container>
    </footer>
  );
}
