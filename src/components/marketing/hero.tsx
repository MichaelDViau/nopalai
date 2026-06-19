"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { track, EVENTS } from "@/lib/analytics";
import { ChatPreview } from "@/components/marketing/chat-preview";
import { useLanguage } from "@/components/language-provider";

export function Hero() {
  const { t } = useLanguage();
  const [before, after] = t.hero.title.split(t.hero.highlight);

  // Force the title onto exactly two lines. The highlighted region and the word
  // that precedes it ("para" / "for") share the second line, so the heading
  // reads "La inteligencia artificial" / "para Latinoamérica."
  const lead = before.trimEnd();
  const splitAt = lead.lastIndexOf(" ");
  const firstLine = splitAt === -1 ? lead : lead.slice(0, splitAt);
  const secondLineLead = splitAt === -1 ? "" : `${lead.slice(splitAt + 1)} `;

  return (
    <section className="relative overflow-hidden bg-secondary/30">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/cactus-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-10 dark:opacity-20"
        />
      </div>
      <div className="container relative z-10 pb-14 pt-12 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Fluid size keeps each line on a single row across viewports, so the
              heading always reads as two lines (never wrapping to three). */}
          <h1 className="text-[clamp(1rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-foreground">
            <span className="block whitespace-nowrap">{firstLine}</span>
            <span className="block whitespace-nowrap">
              {secondLineLead}
              <span className="text-primary">{t.hero.highlight}</span>
              {after}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.body}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="w-full sm:w-auto" onClick={() => track(EVENTS.CTA_CLICKED, { cta: "hero_primary" })}>
              <Link href="/dashboard">{t.hero.primary}<ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="#demo">{t.hero.secondary}</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm font-medium text-primary">
            {t.hero.availability}
          </p>
        </div>
        <div id="demo" className="mx-auto mt-12 max-w-3xl scroll-mt-20 sm:mt-16">
          <ChatPreview />
        </div>
      </div>
    </section>
  );
}
