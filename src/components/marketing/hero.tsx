"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { track, EVENTS } from "@/lib/analytics";
import { ChatPreview } from "@/components/marketing/chat-preview";

export function Hero() {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="container pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            La IA que entiende <span className="text-primary">Latam</span>.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-balance text-base text-muted-foreground sm:text-lg">
            Respuestas, traducciones y ayuda con tus tareas. Al instante.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
              <Link href="#assistants">Ver cómo funciona</Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Gratis · Sin tarjeta
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl sm:mt-14">
          <ChatPreview />
        </div>
      </div>
    </section>
  );
}
