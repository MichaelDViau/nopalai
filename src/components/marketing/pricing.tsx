import Link from "next/link";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpgradeButton } from "@/components/billing/upgrade-button";

const COMPARISON = [
  { label: "Mensajes por día", free: "20", premium: "Ilimitados*" },
  { label: "Asistentes especializados", free: true, premium: true },
  { label: "Historial de conversaciones", free: true, premium: true },
  { label: "Sin anuncios", free: false, premium: true },
  { label: "Respuestas más rápidas", free: false, premium: true },
  { label: "Modelos premium (Qwen 72B)", free: false, premium: true },
  { label: "Acceso prioritario", free: false, premium: true },
  { label: "Soporte preferente", free: false, premium: true },
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
            Empieza gratis. Mejora a Premium cuando quieras. Cancela cuando
            quieras.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:mt-14 md:grid-cols-2">
          {/* Free */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
            <h3 className="text-lg font-semibold">{PLANS.free.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Para empezar a explorar la IA en tu idioma.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight">$0</span>
              <span className="text-muted-foreground">MXN / mes</span>
            </div>
            <Button variant="outline" size="lg" asChild className="mt-8">
              <Link href="/sign-up">Comenzar gratis</Link>
            </Button>
            <ul className="mt-8 space-y-3">
              {PLANS.free.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium */}
          <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-card p-8">
            <Badge className="absolute -top-3 left-8 bg-primary text-primary-foreground">
              Más popular
            </Badge>
            <h3 className="text-lg font-semibold">{PLANS.premium.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Para quienes usan la IA todos los días.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight">$99</span>
              <span className="text-muted-foreground">MXN / mes</span>
            </div>
            <UpgradeButton size="lg" className="mt-8" label="Obtener Premium" />
            <ul className="mt-8 space-y-3">
              {PLANS.premium.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {showComparison && (
          <div className="mx-auto mt-12 max-w-4xl overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="bg-secondary/60">
                  <th className="px-6 py-4 text-left font-semibold">
                    Comparativa
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">Gratis</th>
                  <th className="bg-primary/5 px-6 py-4 text-center font-semibold text-primary">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(i % 2 === 1 && "bg-secondary/30")}
                  >
                    <td className="px-6 py-3.5 text-left text-foreground">
                      {row.label}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <Cell value={row.free} />
                    </td>
                    <td className="bg-primary/[0.03] px-6 py-3.5 text-center">
                      <Cell value={row.premium} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
          *Uso justo: hasta 1,000 mensajes al día para evitar abuso. La
          facturación se realiza en pesos mexicanos (MXN). Puedes cancelar en
          cualquier momento.
        </p>
      </div>
    </section>
  );
}
