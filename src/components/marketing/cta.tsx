import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_30%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_35%)]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
              Empieza a usar la IA que entiende México
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/85">
              Únete a miles de mexicanos que ya trabajan más rápido con NopalAI.
              Gratis para siempre. Sin tarjeta.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-primary hover:bg-white/90"
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
                className="border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Link href="/pricing">Ver precios</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
