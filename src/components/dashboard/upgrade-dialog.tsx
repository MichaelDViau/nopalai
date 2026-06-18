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
              : "Desbloquea NopalAI Pro"}
          </DialogTitle>
          <DialogDescription>
            {reason === "limit"
              ? "Usaste tus 20 mensajes gratuitos de hoy. Mejora a Pro y sigue sin interrupciones."
              : "Lleva tu productividad al siguiente nivel por solo 199 MXN al mes."}
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2.5 py-2">
          {PLANS.pro.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">$199</span>
          <span className="text-sm text-muted-foreground">MXN / mes</span>
        </div>

        <UpgradeButton
          size="lg"
          className="w-full"
          label="Mejorar a Pro"
          source={reason === "limit" ? "limit_dialog" : "dashboard"}
        />
        <p className="text-center text-xs text-muted-foreground">
          Cancela cuando quieras · Pago seguro con Stripe
        </p>
      </DialogContent>
    </Dialog>
  );
}
