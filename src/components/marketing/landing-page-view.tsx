import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import {
  CTA_PRIMARY,
  CTA_SECONDARY,
  LANDING_CATEGORIES,
  getRelatedPages,
  type LandingPage,
} from "@/lib/landing-pages";

/**
 * Server-rendered landing-page template. Content (H1, sections, FAQ, links)
 * ships in the initial HTML so it is fully crawlable without JavaScript. Only
 * the Navbar/Footer chrome is interactive.
 */
export function LandingPageView({ page }: { page: LandingPage }) {
  const related = getRelatedPages(page);
  // Deep-link the primary CTA to the matching assistant so the landing intent
  // carries into the product.
  const startHref = `/dashboard?mode=${page.mode}`;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-secondary/30">
          <div className="container py-16 sm:py-24">
            <nav aria-label="Ruta de navegación" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-foreground">{page.h1}</li>
              </ol>
            </nav>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {page.eyebrow}
              </p>
              <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                {page.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {page.intro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href={startHref}>
                    {CTA_PRIMARY}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="/pricing">{CTA_SECONDARY}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <section className="py-16 sm:py-20">
          <div className="container max-w-3xl">
            <div className="space-y-12">
              {page.sections.map((section) => (
                <div key={section.h2}>
                  <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {section.h2}
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                  {section.bullets && (
                    <ul className="mt-5 space-y-2.5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                          <span className="text-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — native <details> for zero-JS, fully indexable accordions. */}
        <section className="border-t border-border py-16 sm:py-20">
          <div className="container max-w-2xl">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Preguntas frecuentes
            </h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {page.faqs.map((faq) => (
                <details key={faq.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[15px] font-medium text-foreground sm:text-base">
                    {faq.q}
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related pages — internal linking for topical authority. */}
        {related.length > 0 && (
          <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
            <div className="container max-w-4xl">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Sigue explorando
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/${rel.slug}`}
                    className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {LANDING_CATEGORIES[rel.category].label}
                    </p>
                    <p className="mt-2 font-semibold text-foreground">{rel.h1}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                      Ver más
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="px-4 py-16 sm:py-24">
          <div className="container">
            <div className="rounded-2xl bg-primary px-6 py-16 text-center shadow-2xl shadow-primary/20 sm:px-16 sm:py-20">
              <div className="mx-auto max-w-xl">
                <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Empieza gratis con NopalAI
                </h2>
                <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
                  La inteligencia artificial para Latinoamérica. Sin tarjeta de crédito.
                  Empieza en segundos.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button
                    size="lg"
                    asChild
                    className="w-full bg-card text-primary hover:bg-card/90 sm:w-auto"
                  >
                    <Link href={startHref}>
                      {CTA_PRIMARY}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                  >
                    <Link href="/pricing">{CTA_SECONDARY}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
