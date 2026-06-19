import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  LANDING_CATEGORIES,
  LANDING_PAGES,
  type LandingCategoryId,
} from "@/lib/landing-pages";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Soluciones de IA — Estudiar, Crear, Traducir y Más",
  description:
    "Descubre todo lo que puedes hacer con NopalAI: IA para estudiantes, creación de contenido, traducción, negocios y la mejor alternativa a ChatGPT en español.",
  alternates: { canonical: "/soluciones" },
};

const CATEGORY_ORDER: LandingCategoryId[] = [
  "educacion",
  "contenido",
  "traduccion",
  "negocios",
  "comparativa",
];

export default function SolucionesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Soluciones", path: "/soluciones" },
        ])}
      />
      <Navbar />
      <main>
        <section className="border-b border-border bg-secondary/30">
          <div className="container py-16 sm:py-20">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Soluciones de inteligencia artificial para Latinoamérica
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Una sola plataforma para estudiar, crear contenido, traducir y hacer crecer
              tu negocio. Explora todo lo que NopalAI puede hacer por ti, en español.
            </p>
          </div>
        </section>

        <div className="container max-w-5xl space-y-14 py-16 sm:py-20">
          {CATEGORY_ORDER.map((categoryId) => {
            const category = LANDING_CATEGORIES[categoryId];
            const pages = LANDING_PAGES.filter((p) => p.category === categoryId);
            return (
              <section key={categoryId} aria-labelledby={`cat-${categoryId}`}>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  {category.label}
                </p>
                <h2
                  id={`cat-${categoryId}`}
                  className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  {category.title}
                </h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">{category.description}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}`}
                      className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                    >
                      <p className="font-semibold text-foreground">{page.h1}</p>
                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                        {page.metaDescription}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Explorar
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
