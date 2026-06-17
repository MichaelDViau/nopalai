"use client";

import { cn } from "@/lib/utils";
import { MODE_LIST, type ModeId } from "@/lib/modes";

interface ModeSelectorProps {
  value: ModeId;
  onChange: (mode: ModeId) => void;
  className?: string;
}

export function ModeSelector({ value, onChange, className }: ModeSelectorProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-4",
        className,
      )}
      role="radiogroup"
      aria-label="Tipo de asistente"
    >
      {MODE_LIST.map((mode) => {
        const active = mode.id === value;
        return (
          <button
            key={mode.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(mode.id)}
            className={cn(
              "flex items-center gap-2.5 rounded-2xl border p-3 text-left transition-all",
              active
                ? "border-primary/60 bg-primary/5 shadow-soft"
                : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft",
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              <mode.icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">
                {mode.shortName}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
