"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Languages, Megaphone, MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/logo";

const TABS = [
  {
    id: "general",
    label: "General",
    icon: MessageSquare,
    q: "Ayúdame a redactar un correo formal para pedir una cotización.",
    a: "Claro. Asunto: Solicitud de cotización. “Estimado/a [Nombre]: Le escribo para solicitar una cotización de [producto/servicio], con entrega en [lugar/fecha]. Quedo atento/a a su respuesta. Saludos, [Tu nombre].” ¿Quieres que lo haga más breve o más detallado?",
  },
  {
    id: "translation",
    label: "Traducción",
    icon: Languages,
    q: "Traduce 'la cuenta, por favor' al inglés para un turista.",
    a: "“The check, please.” Y para sonar más natural: “Could we get the check, please?” ¿Te preparo más frases para atender turistas?",
  },
  {
    id: "school",
    label: "Escuela",
    icon: GraduationCap,
    q: "Explícame el teorema de Pitágoras con un ejemplo.",
    a: "En un triángulo rectángulo, a² + b² = c², donde c es la hipotenusa. Ejemplo: si a = 3 y b = 4, entonces c = √(9 + 16) = √25 = 5. ¿Quieres que lo resolvamos con tus propios números?",
  },
  {
    id: "content",
    label: "Contenido",
    icon: Megaphone,
    q: "Dame una idea de contenido para Instagram esta semana.",
    a: "Reel: “3 errores que cometes al [tu tema]”. Hook: “El #2 te está costando clientes.” Termina con un CTA: “Guarda este Reel para no olvidarlo.” ¿Te armo el guion completo?",
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
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* mode tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border p-3">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              i === active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary",
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* conversation */}
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-lg bg-secondary px-4 py-2.5 text-[15px] text-foreground">
            {tab.q}
          </div>
        </div>
        <div className="flex gap-3">
          <LogoMark className="mt-0.5 h-8 w-8 shrink-0" />
          <div
            key={tab.id}
            className="max-w-[85%] animate-fade-in rounded-lg border border-border px-4 py-3 text-[15px] leading-7 text-foreground"
          >
            {tab.a}
          </div>
        </div>
      </div>
    </div>
  );
}
