"use client";

import { Check, Zap } from "lucide-react";

import { PLANS } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UpgradeButton } from "@/components/billing/upgrade-button";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-5 w-5 fill-primary" />
          </div>
          <DialogTitle className="text-xl">
            {reason === "limit"
              ? "Llegaste a tu límite de hoy"
              : "Elige tu mejora"}
          </DialogTitle>
          <DialogDescription>
            {reason === "limit"
              ? "Usaste tus mensajes gratuitos de hoy. Elige Plus o Pro para seguir sin interrupciones."
              : "Selecciona el plan que mejor se adapte a tu ritmo de trabajo."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-2 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-semibold">Plus</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold">$69</span>
              <span className="text-xs text-muted-foreground">MXN / mes</span>
            </div>
            <ul className="mt-3 space-y-2">
              {PLANS.plus.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <UpgradeButton
              size="sm"
              className="mt-4 w-full"
              label="Plus — $69 MXN/month"
              plan="plus"
              source={reason === "limit" ? "limit_dialog_plus" : "dashboard_plus"}
            />
          </div>

          <div className="rounded-xl border-2 border-primary bg-primary/5 p-4">
            <div className="text-sm font-semibold text-primary">Pro</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold">$199</span>
              <span className="text-xs text-muted-foreground">MXN / mes</span>
            </div>
            <ul className="mt-3 space-y-2">
              {PLANS.pro.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <UpgradeButton
              size="sm"
              className="mt-4 w-full"
              label="Pro — $199 MXN/month"
              plan="pro"
              source={reason === "limit" ? "limit_dialog_pro" : "dashboard_pro"}
            />
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Cancela cuando quieras · Pago seguro con Stripe
        </p>
      </DialogContent>
    </Dialog>
  );
}
