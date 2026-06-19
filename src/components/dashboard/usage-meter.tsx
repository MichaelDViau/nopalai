"use client";

import { Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import type { UsageState } from "@/types/chat";

interface UsageMeterProps {
  usage: UsageState;
  onUpgrade: () => void;
}

export function UsageMeter({ usage, onUpgrade }: UsageMeterProps) {
  const { t } = useLanguage();

  if (usage.plan !== "free") {
    const planName = usage.plan === "pro" ? "Pro" : "Plus";
    return (
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Zap className="h-4 w-4 shrink-0 fill-primary" />
          <span>
            {planName} {t.dash.activeSuffix}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {t.dash.unlimitedDesc}
        </p>
      </div>
    );
  }

  const pct = Math.min(100, Math.round((usage.used / usage.limit) * 100));
  const low = usage.remaining <= 5;

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{t.dash.todayUsage}</span>
        <span className={cn("tabular-nums", low ? "text-destructive" : "text-muted-foreground")}>
          {Math.min(usage.used, usage.limit)}/{usage.limit}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            low ? "bg-destructive" : "bg-primary",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <Button
        size="sm"
        className="mt-3 w-full"
        onClick={onUpgrade}
        aria-label={t.dash.upgrade}
      >
        <Zap className="h-3.5 w-3.5 shrink-0" />
        <span>{t.dash.improve}</span>
      </Button>
    </div>
  );
}
