"use client";

import { MODE_LIST } from "@/lib/modes";
import { useLanguage } from "@/components/i18n/language-provider";

export function Assistants() {
  const { t } = useLanguage();

  return (
    <section id="assistants" className="scroll-mt-16 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t.assistants.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.assistants.subtitle}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {MODE_LIST.map((mode) => {
            const m = t.modes[mode.id];
            return (
              <div
                key={mode.id}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 sm:p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <mode.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {m.blurb}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
