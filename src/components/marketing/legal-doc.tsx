"use client";

import { useLanguage } from "@/components/i18n/language-provider";

/** Renders the localized Terms or Privacy document from the dictionary. */
export function LegalDoc({ doc }: { doc: "terms" | "privacy" }) {
  const { t } = useLanguage();
  const content = t.legal[doc];

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
      <p className="text-sm text-muted-foreground">{t.legal.updated}</p>

      {content.sections.map((section) => (
        <div key={section.h}>
          <h2>{section.h}</h2>
          <p>{section.p}</p>
        </div>
      ))}
    </>
  );
}
