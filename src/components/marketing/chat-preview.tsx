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

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 dark:border-white/10 dark:bg-gradient-to-br dark:from-card dark:via-secondary/35 dark:to-background dark:shadow-black/40">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3 dark:border-white/10 dark:bg-white/5">
        <span className="h-3 w-3 rounded-full bg-red-300/80 dark:bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-300/80 dark:bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-300/80 dark:bg-emerald-400/80" />
        <div className="ml-3 hidden text-xs text-muted-foreground sm:block">
          nopal-ai.com/dashboard
        </div>
      </div>

      {/* mode tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border bg-background/45 px-4 py-3 dark:border-white/10 dark:bg-black/10">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              i === active
                ? "bg-primary/10 text-primary ring-1 ring-primary/15 dark:bg-primary/20 dark:text-emerald-200 dark:ring-primary/30"
                : "text-muted-foreground hover:bg-accent dark:hover:bg-white/10 dark:hover:text-foreground",
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* conversation — every state is stacked in the same grid cell, so the
          panel is always as tall as the longest message and never resizes or
          reflows when switching tabs. Only opacity changes between states. */}
      <div className="p-5 sm:p-7">
        <div className="grid">
          {TABS.map((t, i) => {
            const isActive = i === active;
            return (
              <div
                key={t.id}
                aria-hidden={!isActive}
                className={cn(
                  "col-start-1 row-start-1 space-y-5 transition-opacity duration-500 ease-out",
                  isActive ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-secondary px-4 py-2.5 text-[15px] text-foreground shadow-sm dark:bg-primary/20 dark:text-emerald-50 dark:ring-1 dark:ring-primary/25">
                    {t.q}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
                    <LogoMark className="h-8 w-8" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-secondary/70 px-4 py-3 text-[15px] leading-7 text-foreground shadow-sm dark:bg-white/[0.07] dark:text-foreground dark:ring-1 dark:ring-white/10">
                    {t.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
