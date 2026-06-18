"use client";

import { type ModeId } from "@/lib/modes";
import { LogoMark } from "@/components/brand/logo";
import { ModeSelector } from "@/components/dashboard/mode-selector";
import { useLanguage } from "@/components/i18n/language-provider";

interface EmptyStateProps {
  mode: ModeId;
  onModeChange: (mode: ModeId) => void;
  onPick: (suggestion: string) => void;
}

export function EmptyState({ mode, onModeChange, onPick }: EmptyStateProps) {
  const { t } = useLanguage();
  const suggestions = t.modes[mode].suggestions;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-10 text-center">
      <LogoMark className="h-12 w-12" />
      <h1 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
        {t.dashboard.emptyState.title}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {t.dashboard.emptyState.subtitle}
      </p>

      <ModeSelector
        value={mode}
        onChange={onModeChange}
        className="mt-8 w-full"
      />

      <div className="mt-8 w-full">
        <p className="mb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t.dashboard.emptyState.tryWith}
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onPick(s)}
              className="rounded-xl border border-border bg-card p-3 text-left text-sm text-foreground transition-all hover:border-primary/40 hover:bg-accent/50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
