import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { SITE } from "@/lib/constants";

const LINKS = [
  { href: "/#assistants", label: "Asistentes" },
  { href: "/pricing", label: "Precios" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/terminos", label: "Términos" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <Link href="/" aria-label="NopalAI inicio">
            <Logo />
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} {SITE.name} · {SITE.tagline} · Hecho para
          México 🇲🇽
        </p>
      </div>
    </footer>
  );
}
