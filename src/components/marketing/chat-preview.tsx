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
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-muted-foreground/25" />
        <span className="h-3 w-3 rounded-full bg-muted-foreground/25" />
        <span className="h-3 w-3 rounded-full bg-muted-foreground/25" />
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
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
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
          <div className="max-w-[80%] rounded-lg rounded-br-sm bg-secondary px-4 py-2.5 text-[15px] text-foreground">
            {tab.q}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
            <LogoMark className="h-8 w-8" />
          </div>
          <div
            key={tab.id}
            className="max-w-[85%] animate-fade-in rounded-lg rounded-tl-sm bg-secondary/70 px-4 py-3 text-[15px] leading-7 text-foreground"
          >
            {tab.a}
          </div>
        </div>
      </div>
    </div>
  );
}
