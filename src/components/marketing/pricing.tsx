"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpgradeButton } from "@/components/billing/upgrade-button";
import { useLanguage } from "@/components/i18n/language-provider";

export function Pricing() {
  const { t } = useLanguage();
  const { plans, popular, perMonth, fairUse, title, subtitle } = t.pricing;

  return (
    <section id="pricing" className="scroll-mt-16 bg-secondary/30 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl items-start gap-5 sm:mt-14 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex h-full flex-col rounded-2xl border bg-card p-8 transition-shadow",
                plan.popular
                  ? "border-2 border-primary shadow-lg shadow-primary/5"
                  : "border-border",
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-8 bg-primary text-primary-foreground">
                  {popular}
                </Badge>
              )}

              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{perMonth}</span>
              </div>

              {plan.action === "upgrade" ? (
                <UpgradeButton
                  size="lg"
                  className="mt-8"
                  variant={plan.popular ? "default" : "outline"}
                  label={plan.cta}
                  source={`pricing_${plan.id}`}
                />
              ) : (
                <Button variant="outline" size="lg" asChild className="mt-8">
                  <Link href="/sign-up">{plan.cta}</Link>
                </Button>
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
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
          {fairUse}
        </p>
      </div>
    </section>
  );
}
