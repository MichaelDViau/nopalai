"use client";

import { Check, Zap } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UpgradeButton } from "@/components/billing/upgrade-button";
import { useLanguage } from "@/components/i18n/language-provider";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason?: "limit" | "manual";
}

export function UpgradeDialog({
  open,
  onOpenChange,
  reason = "manual",
}: UpgradeDialogProps) {
  const { t } = useLanguage();
  const plan =
    t.pricing.plans.find((p) => p.id === "pro") ?? t.pricing.plans[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-5 w-5 fill-primary" />
          </div>
          <DialogTitle className="text-xl">
            {reason === "limit"
              ? t.dashboard.upgrade.limitTitle
              : t.dashboard.upgrade.manualTitle}
          </DialogTitle>
          <DialogDescription>
            {reason === "limit"
              ? t.dashboard.upgrade.limitDesc
              : t.dashboard.upgrade.manualDesc}
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2.5 py-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-sm text-muted-foreground">
            {t.pricing.perMonth}
          </span>
        </div>

        <UpgradeButton
          size="lg"
          className="w-full"
          label={t.dashboard.upgrade.cta}
          source={reason === "limit" ? "limit_dialog" : "dashboard"}
        />
        <p className="text-center text-xs text-muted-foreground">
          {t.dashboard.upgrade.secure}
        </p>
      </DialogContent>
    </Dialog>
  );
}
