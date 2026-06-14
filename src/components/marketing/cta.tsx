import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="rounded-3xl border border-border bg-secondary/50 px-6 py-20 text-center sm:px-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Empieza a usar la IA que entiende México
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Únete a miles de mexicanos que ya trabajan más rápido con NopalAI.
              Gratis para siempre. Sin tarjeta.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Comenzar gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">Ver precios</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
