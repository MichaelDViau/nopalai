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
import { useLanguage } from "@/components/language-provider";

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
  const p = t.pricing;
  const d = t.dash;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-5 w-5 fill-primary" />
          </div>
          <DialogTitle className="text-xl">
            {reason === "limit" ? d.limitTitle : d.chooseTitle}
          </DialogTitle>
          <DialogDescription>
            {reason === "limit" ? d.limitDesc : d.chooseDesc}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-2 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-semibold">{p.plusName}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold">$69</span>
              <span className="text-xs text-muted-foreground">{d.perMonth}</span>
            </div>
            <ul className="mt-3 space-y-2">
              {p.plusFeatures.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <UpgradeButton
              size="sm"
              className="mt-4 w-full"
              label={`${p.plusName} — $69`}
              plan="plus"
              source={reason === "limit" ? "limit_dialog_plus" : "dashboard_plus"}
            />
          </div>

          <div className="rounded-xl border-2 border-primary bg-primary/5 p-4">
            <div className="text-sm font-semibold text-primary">{p.proName}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold">$199</span>
              <span className="text-xs text-muted-foreground">{d.perMonth}</span>
            </div>
            <ul className="mt-3 space-y-2">
              {p.proFeatures.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <UpgradeButton
              size="sm"
              className="mt-4 w-full"
              label={`${p.proName} — $199`}
              plan="pro"
              source={reason === "limit" ? "limit_dialog_pro" : "dashboard_pro"}
            />
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          {d.secureNote}
        </p>
      </DialogContent>
    </Dialog>
  );
}
