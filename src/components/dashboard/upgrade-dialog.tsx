"use client";

import { Check, Sparkles, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
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

const TIERS = [
  {
    id: "plus" as const,
    icon: Zap,
    recommended: true,
    highlight: "Mensajes ilimitados en el modelo estándar, sin anuncios.",
  },
  {
    id: "pro" as const,
    icon: Sparkles,
    recommended: false,
    highlight: "Acceso a los modelos de IA premium para la mejor calidad.",
  },
];

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
              : "Mejora tu plan"}
          </DialogTitle>
          <DialogDescription>
            {reason === "limit"
              ? "Usaste tus 20 mensajes gratuitos de hoy. Elige un plan y sigue sin interrupciones."
              : "Desbloquea uso ilimitado y los mejores modelos de IA."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {TIERS.map((tier) => {
            const plan = PLANS[tier.id];
            return (
              <div
                key={tier.id}
                className={cn(
                  "rounded-xl border p-4",
                  tier.recommended
                    ? "border-primary bg-primary/5"
                    : "border-border",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <tier.icon className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{plan.name}</span>
                    {tier.recommended && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">${plan.priceMXN}</span>
                    <span className="text-muted-foreground"> MXN/mes</span>
                  </div>
                </div>
                <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {tier.highlight}
                </p>
                <UpgradeButton
                  size="sm"
                  variant={tier.recommended ? "default" : "outline"}
                  className="mt-3 w-full"
                  label={`Elegir ${plan.name}`}
                  plan={tier.id}
                  source={reason === "limit" ? "limit_dialog" : "dashboard"}
                />
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Cancela cuando quieras · Pago seguro con Stripe
        </p>
      </DialogContent>
    </Dialog>
  );
}
