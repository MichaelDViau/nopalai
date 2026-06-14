"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { track, EVENTS } from "@/lib/analytics";
import { ChatPreview } from "@/components/marketing/chat-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary/30">
      <div className="container pb-16 pt-16 sm:pt-24 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/pricing"
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Nuevo: 4 asistentes especializados para México
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>

          <h1 className="mt-7 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            La IA que entiende <span className="text-primary">México</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Respuestas, traducciones, ayuda con tareas escolares y contenido
            para redes sociales. En español mexicano, al instante.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              onClick={() => track(EVENTS.CTA_CLICKED, { cta: "hero_primary" })}
            >
              <Link href="/sign-up">
                Comenzar gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              onClick={() => track(EVENTS.CTA_CLICKED, { cta: "hero_demo" })}
            >
              <Link href="#demo">
                <Play className="h-4 w-4" />
                Ver demo
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Gratis para siempre · Sin tarjeta de crédito · 20 mensajes al día
          </p>
        </div>

        {/* Product preview */}
        <div id="demo" className="mx-auto mt-16 max-w-4xl scroll-mt-24">
          <ChatPreview />
        </div>
      </div>
    </section>
  );
}
