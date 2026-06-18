"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpgradeButton } from "@/components/billing/upgrade-button";
import { useLanguage } from "@/components/language-provider";

const COMPARISON = [
  { label: "Mensajes por día / Messages per day", free: "20", plus: "Ilimitados", pro: "Ilimitados*" },
  { label: "Historial de conversaciones / Chat history", free: true, plus: true, pro: true },
  { label: "Sin anuncios / No ads", free: false, plus: true, pro: true },
  { label: "Respuestas más rápidas / Faster responses", free: false, plus: true, pro: true },
  { label: "Modelos premium / Pro models", free: false, plus: false, pro: true },
  { label: "Soporte preferente / Priority support", free: false, plus: false, pro: true },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "string") return <span className="text-sm font-medium text-foreground">{value}</span>;
  return value ? <Check className="mx-auto h-5 w-5 text-primary" /> : <X className="mx-auto h-5 w-5 text-muted-foreground/40" />;
}

export function Pricing({ showComparison = true }: { showComparison?: boolean }) {
  const { t } = useLanguage();
  const cards = [
    { key: "free", plan: PLANS.free, price: "$0", desc: t.pricing.freeDesc, cta: t.pricing.ctaFree, href: "/sign-up", featured: false },
    { key: "plus", plan: PLANS.plus, price: "$69", desc: t.pricing.plusDesc, cta: t.pricing.ctaPlus, featured: true },
    { key: "pro", plan: PLANS.pro, price: "$199", desc: t.pricing.proDesc, cta: t.pricing.ctaPro, featured: false },
  ];

  return (
    <section id="pricing" className="scroll-mt-16 bg-secondary/30 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{t.pricing.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.pricing.body}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:mt-14 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.key} className={cn("relative flex flex-col rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl", card.featured ? "border-2 border-primary" : "border-border")}>
              {card.featured && <Badge className="absolute -top-3 left-8 bg-primary text-primary-foreground">{t.pricing.popular}</Badge>}
              <h3 className="text-lg font-semibold">{card.plan.name}</h3>
              <p className="mt-2 min-h-10 text-sm text-muted-foreground">{card.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">{card.price}</span>
                <span className="text-muted-foreground">{t.pricing.perMonth}</span>
              </div>
              {card.href ? (
                <Button variant="outline" size="lg" asChild className="mt-8"><Link href={card.href}>{card.cta}</Link></Button>
              ) : (
                <UpgradeButton size="lg" className="mt-8" label={card.cta} plan={card.key === "plus" ? "plus" : "pro"} />
              )}
              <ul className="mt-8 space-y-3">
                {card.plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{f}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {showComparison && (
          <div className="mx-auto mt-12 max-w-6xl overflow-x-auto rounded-xl border border-border bg-card/70">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead><tr className="bg-secondary/60"><th className="px-6 py-4 text-left font-semibold">{t.pricing.comparison}</th><th className="px-6 py-4 text-center font-semibold">Gratis</th><th className="bg-primary/5 px-6 py-4 text-center font-semibold text-primary">Plus</th><th className="px-6 py-4 text-center font-semibold">Pro</th></tr></thead>
              <tbody>{COMPARISON.map((row, i) => <tr key={row.label} className={cn(i % 2 === 1 && "bg-secondary/30")}><td className="px-6 py-3.5 text-left text-foreground">{row.label}</td><td className="px-6 py-3.5 text-center"><Cell value={row.free} /></td><td className="bg-primary/[0.03] px-6 py-3.5 text-center"><Cell value={row.plus} /></td><td className="px-6 py-3.5 text-center"><Cell value={row.pro} /></td></tr>)}</tbody>
            </table>
          </div>
        )}
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs font-medium text-muted-foreground">{t.pricing.fairUse}</p>
      </div>
    </section>
  );
}
