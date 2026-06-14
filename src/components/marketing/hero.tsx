"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { track, EVENTS } from "@/lib/analytics";
import { ChatPreview } from "@/components/marketing/chat-preview";

export function Hero() {
  return (
    <section className="bg-secondary/30">
      <div className="container pb-14 pt-12 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground sm:text-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            4 asistentes de IA para México
          </span>

          <h1 className="mt-6 text-balance text-[2.5rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            La IA que entiende <span className="text-primary">México</span>.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            Respuestas, traducciones, ayuda con tareas y contenido para redes.
            En español mexicano, al instante.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto"
              onClick={() => track(EVENTS.CTA_CLICKED, { cta: "hero_primary" })}
            >
              <Link href="/dashboard">
                Comenzar gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="#demo">Ver demo</Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground sm:text-sm">
            Gratis · Sin tarjeta · 20 mensajes al día
          </p>
        </div>

        <div id="demo" className="mx-auto mt-12 max-w-3xl scroll-mt-20 sm:mt-16">
          <ChatPreview />
        </div>
      </div>
    </section>
  );
}
