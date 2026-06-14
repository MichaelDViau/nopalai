import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="container">
        <div className="rounded-3xl bg-primary px-6 py-16 text-center sm:px-16 sm:py-20">
          <div className="mx-auto max-w-xl">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Prueba la IA que entiende México
            </h2>
            <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
              Gratis para siempre. Sin tarjeta. Empieza en segundos.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                asChild
                className="w-full bg-card text-primary hover:bg-card/90 sm:w-auto"
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
                className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
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
