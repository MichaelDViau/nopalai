"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { track, EVENTS } from "@/lib/analytics";
import { useLanguage } from "@/components/i18n/language-provider";
import { ChatPreview } from "@/components/marketing/chat-preview";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="bg-secondary/30">
      <div className="container pb-14 pt-12 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-[2.5rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {t.hero.titleLead}{" "}
            <span className="text-primary">{t.hero.titleHighlight}</span>.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto"
              onClick={() => track(EVENTS.CTA_CLICKED, { cta: "hero_primary" })}
            >
              <Link href="/dashboard">
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="#demo">{t.hero.ctaSecondary}</Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground sm:text-sm">
            {t.hero.note}
          </p>
        </div>

        <div id="demo" className="mx-auto mt-12 max-w-3xl scroll-mt-20 sm:mt-16">
          <ChatPreview />
        </div>
      </div>
    </section>
  );
}
