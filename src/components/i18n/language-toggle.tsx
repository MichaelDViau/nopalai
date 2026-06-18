"use client";

import { Languages } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/i18n/language-provider";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <button
      type="button"
      aria-label={t.nav.language}
      title={t.nav.language}
      onClick={toggleLang}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className,
      )}
    >
      <Languages className="h-[1.05rem] w-[1.05rem]" />
      <span className="tabular-nums">{lang === "es" ? "EN" : "ES"}</span>
    </button>
  );
}
