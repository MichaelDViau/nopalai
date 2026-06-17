import Link from "next/link";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpgradeButton } from "@/components/billing/upgrade-button";

type Col = { free: string | boolean; plus: string | boolean; pro: string | boolean };
const COMPARISON: ({ label: string } & Col)[] = [
  { label: "Mensajes por día", free: "20", plus: "Ilimitados*", pro: "Ilimitados*" },
  { label: "Asistentes especializados", free: true, plus: true, pro: true },
  { label: "Historial de conversaciones", free: true, plus: true, pro: true },
  { label: "Modelo de IA estándar", free: true, plus: true, pro: true },
  { label: "Sin anuncios", free: false, plus: true, pro: true },
  { label: "Respuestas más rápidas", free: false, plus: true, pro: true },
  { label: "Modelos de IA premium", free: false, plus: false, pro: true },
  { label: "Acceso prioritario", free: false, plus: false, pro: true },
  { label: "Soporte preferente", free: false, plus: false, pro: true },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  }
  return value ? (
    <Check className="mx-auto h-5 w-5 text-primary" />
  ) : (
    <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
  );
}

export function Pricing({ showComparison = true }: { showComparison?: boolean }) {
  return (
    <section id="pricing" className="scroll-mt-16 bg-secondary/30 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Simple y transparente
          </h2>
          <p className="mt-3 text-muted-foreground">
            Empieza gratis. Mejora a Plus o Pro cuando quieras. Cancela cuando
            quieras.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl items-start gap-5 sm:mt-14 md:grid-cols-3">
          {/* Free */}
          <PlanCard
            plan={PLANS.free}
            cta={
              <Button variant="outline" size="lg" asChild className="mt-6 w-full">
                <Link href="/sign-up">Comenzar gratis</Link>
              </Button>
            }
          />

          {/* Plus — most popular */}
          <PlanCard
            plan={PLANS.plus}
            featured
            cta={
              <UpgradeButton
                size="lg"
                className="mt-6 w-full"
                label="Obtener Plus"
                plan="plus"
                source="pricing_plus"
              />
            }
          />

          {/* Pro */}
          <PlanCard
            plan={PLANS.pro}
            cta={
              <UpgradeButton
                size="lg"
                variant="outline"
                className="mt-6 w-full"
                label="Obtener Pro"
                plan="pro"
                source="pricing_pro"
              />
            }
          />
        </div>

        {showComparison && (
          <div className="mx-auto mt-12 max-w-4xl overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-secondary/60">
                  <th className="px-6 py-4 text-left font-semibold">Comparativa</th>
                  <th className="px-6 py-4 text-center font-semibold">Gratis</th>
                  <th className="bg-primary/5 px-6 py-4 text-center font-semibold text-primary">
                    Plus
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.label} className={cn(i % 2 === 1 && "bg-secondary/30")}>
                    <td className="px-6 py-3.5 text-left text-foreground">
                      {row.label}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <Cell value={row.free} />
                    </td>
                    <td className="bg-primary/[0.03] px-6 py-3.5 text-center">
                      <Cell value={row.plus} />
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <Cell value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
          *Uso justo para evitar abuso. Precios en pesos mexicanos (MXN). Puedes
          cancelar en cualquier momento.
        </p>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  cta,
  featured = false,
}: {
  plan: (typeof PLANS)[keyof typeof PLANS];
  cta: React.ReactNode;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl bg-card p-8",
        featured ? "border-2 border-primary shadow-sm" : "border border-border",
      )}
    >
      {featured && (
        <Badge className="absolute -top-3 left-8 bg-primary text-primary-foreground">
          Más popular
        </Badge>
      )}
      <h3 className="text-lg font-semibold">{plan.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{plan.tagline}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight">
          ${plan.priceMXN}
        </span>
        <span className="text-muted-foreground">MXN / mes</span>
      </div>
      {cta}
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
}
