import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { SITE } from "@/lib/constants";

const COLS = [
  {
    title: "Producto",
    links: [
      { href: "/#features", label: "Funciones" },
      { href: "/#assistants", label: "Asistentes" },
      { href: "/pricing", label: "Precios" },
      { href: "/dashboard", label: "Panel" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/#testimonials", label: "Testimonios" },
      { href: "/#faq", label: "Preguntas frecuentes" },
      { href: "mailto:hola@nopalai.mx", label: "Contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacidad", label: "Privacidad" },
      { href: "/legal/terminos", label: "Términos" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline} El asistente de inteligencia artificial creado para
              México: respuestas, traducciones, tareas escolares y contenido
              para redes.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Hecho con orgullo para
            México 🇲🇽
          </p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
