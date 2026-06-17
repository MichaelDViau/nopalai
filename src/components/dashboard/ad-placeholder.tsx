"use client";

import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Ad slot shown to Free users. Replace the inner content with a real ad
 * network unit (e.g. AdSense) — the surrounding card keeps layout stable.
 */
export function AdPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border bg-secondary/40 p-3 text-center",
        className,
      )}
      aria-label="Espacio publicitario"
      data-ad-slot="dashboard-sidebar"
    >
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
        Publicidad
      </p>
      <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Zap className="h-3.5 w-3.5 text-primary" />
        Quita los anuncios con Plus
      </div>
    </div>
  );
}
