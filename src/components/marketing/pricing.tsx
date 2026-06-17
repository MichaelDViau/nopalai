import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpgradeButton } from "@/components/billing/upgrade-button";

const TIERS = [PLANS.free, PLANS.plus, PLANS.pro] as const;

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 bg-secondary/30 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Simple y transparente
          </h2>
          <p className="mt-3 text-muted-foreground">
            Empieza gratis. Mejora cuando quieras. Cancela cuando quieras.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl items-start gap-5 sm:mt-14 md:grid-cols-3">
          {TIERS.map((plan) => {
            const isPlus = plan.id === "plus";
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col rounded-2xl bg-card p-8",
                  isPlus
                    ? "border-2 border-primary shadow-elevated md:-mt-3"
                    : "border border-border shadow-soft",
                )}
              >
                {isPlus && (
                  <Badge className="absolute -top-3 left-8 bg-primary text-primary-foreground">
                    Más popular
                  </Badge>
                )}

                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight">
                    {`$${plan.priceMXN}`}
                  </span>
                  <span className="text-muted-foreground">MXN / mes</span>
                </div>

                {plan.id === "free" ? (
                  <Button variant="outline" size="lg" asChild className="mt-8">
                    <Link href="/sign-up">Comenzar gratis</Link>
                  </Button>
                ) : (
                  <UpgradeButton
                    size="lg"
                    className="mt-8"
                    variant={isPlus ? "default" : "outline"}
                    plan={plan.id}
                    label={`Obtener ${plan.name}`}
                  />
                )}

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
          *Uso justo: hasta 1,000 mensajes al día para evitar abuso. La
          facturación se realiza en la moneda de su país. Puedes cancelar en
          cualquier momento.
        </p>
      </div>
    </section>
  );
}
