import Link from "next/link";
import { Check } from "lucide-react";

import { Logo, LogoMark } from "@/components/brand/logo";

const HIGHLIGHTS = [
  "4 asistentes de IA especializados",
  "Respuestas en tu español, al instante",
  "Gratis para empezar, sin tarjeta",
];

/**
 * Split-screen auth layout: the form sits on a calm cream column on the
 * left, with a deep-sage brand panel on the right (hidden on small
 * screens). Shared by the sign-in and sign-up pages.
 */
export function AuthShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh lg:grid lg:grid-cols-2">
      {/* Left — the form */}
      <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12 lg:min-h-0">
        <Link href="/" className="mb-8 inline-flex" aria-label="NopalAI inicio">
          <Logo />
        </Link>
        {children}
        <p className="mt-8 text-sm text-muted-foreground">{footer}</p>
      </div>

      {/* Right — brand panel */}
      <aside className="relative hidden overflow-hidden bg-sidebar px-14 text-sidebar-foreground lg:flex lg:flex-col lg:justify-center">
        {/* Soft decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sidebar-active/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-sidebar-active/5 blur-3xl"
        />

        <div className="relative max-w-md">
          <LogoMark className="h-12 w-12" />
          <h2 className="mt-8 text-balance text-4xl font-bold leading-tight tracking-tight">
            La IA que entiende Latinoamérica.
          </h2>
          <p className="mt-4 text-lg text-sidebar-foreground/75">
            Respuestas, traducciones, tareas y contenido para redes — en el
            español de tu región.
          </p>

          <ul className="mt-10 space-y-4">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sidebar-active/15">
                  <Check className="h-3.5 w-3.5 text-sidebar-active" />
                </span>
                <span className="text-sidebar-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
