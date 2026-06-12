"use client";

import { useEffect, useState } from "react";
import { Briefcase, Building2, MessageSquare, Palmtree } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/logo";

const TABS = [
  {
    id: "business",
    label: "Negocios",
    icon: Briefcase,
    q: "Escríbeme una promoción de fin de semana para mi taquería en Guadalajara.",
    a: "¡Claro! 🌮 *Fin de Semana Taquero* — 3x2 en tacos al pastor, viernes a domingo de 7 a 11 pm. Etiqueta a 2 amigos en nuestra publicación y llévate un agua fresca gratis. ¿Quieres que te arme el copy para Instagram y WhatsApp?",
  },
  {
    id: "tourism",
    label: "Turismo",
    icon: Palmtree,
    q: "Itinerario de 3 días en Tulum para una pareja.",
    a: "Día 1: cenote Dos Ojos por la mañana y atardecer en la zona arqueológica. Día 2: playa Paraíso + cena en la zona hotelera. Día 3: Sian Ka'an y mercado local. ¿Lo adapto a un presupuesto en MXN?",
  },
  {
    id: "realestate",
    label: "Bienes Raíces",
    icon: Building2,
    q: "Descripción para un depa en venta en la Roma, CDMX.",
    a: "Departamento de 2 recámaras en el corazón de la Roma Norte: 92 m², luz natural todo el día, a pasos de cafés y del metro. Ideal para vivir o invertir. ¿Agrego precio y datos de contacto?",
  },
  {
    id: "general",
    label: "General",
    icon: MessageSquare,
    q: "Tradúceme 'la cuenta, por favor' al inglés para un turista.",
    a: "“The check, please.” Y si quieres sonar más natural: “Could we get the check, please?” ¿Te preparo más frases para atender turistas?",
  },
];

export function ChatPreview() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % TABS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const tab = TABS[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_80px_-24px_rgba(11,122,75,0.25)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <div className="ml-3 hidden text-xs text-muted-foreground sm:block">
          nopalai.mx/dashboard
        </div>
      </div>

      {/* mode tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border px-4 py-3">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              i === active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent",
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* conversation */}
      <div className="space-y-5 p-5 sm:p-7">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-secondary px-4 py-2.5 text-[15px] text-foreground">
            {tab.q}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
            <LogoMark className="h-8 w-8" />
          </div>
          <div
            key={tab.id}
            className="max-w-[85%] animate-fade-in rounded-2xl rounded-tl-md bg-primary/[0.06] px-4 py-3 text-[15px] leading-7 text-foreground"
          >
            {tab.a}
          </div>
        </div>
      </div>
    </div>
  );
}
