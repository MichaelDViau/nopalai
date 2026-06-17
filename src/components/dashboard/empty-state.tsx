"use client";

import { getMode, type ModeId } from "@/lib/modes";
import { LogoMark } from "@/components/brand/logo";
import { ModeSelector } from "@/components/dashboard/mode-selector";

interface EmptyStateProps {
  mode: ModeId;
  onModeChange: (mode: ModeId) => void;
  onPick: (suggestion: string) => void;
}

export function EmptyState({ mode, onModeChange, onPick }: EmptyStateProps) {
  const active = getMode(mode);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-10 text-center">
      <LogoMark className="h-12 w-12" />
      <h1 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
        ¿En qué te ayudo hoy?
      </h1>
      <p className="mt-2 text-muted-foreground">
        Elige un asistente y empieza a escribir.
      </p>

      <ModeSelector
        value={mode}
        onChange={onModeChange}
        className="mt-8 w-full"
      />

      <div className="mt-8 w-full">
        <p className="mb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Prueba con
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {active.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onPick(s)}
              className="rounded-2xl border border-border bg-card p-4 text-left text-sm text-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
