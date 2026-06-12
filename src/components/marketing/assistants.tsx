import { ArrowUpRight } from "lucide-react";
import { MODE_LIST } from "@/lib/modes";

export function Assistants() {
  return (
    <section id="assistants" className="scroll-mt-20 bg-secondary/40 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Asistentes
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Un experto para cada necesidad
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cambia de modo con un clic. Cada asistente está afinado para su
            industria, con el contexto correcto desde el primer mensaje.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
          {MODE_LIST.map((mode) => (
            <div
              key={mode.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-[0_16px_50px_-20px_rgba(11,122,75,0.3)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <mode.icon className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{mode.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {mode.blurb}
              </p>
              <ul className="mt-5 space-y-2">
                {mode.suggestions.slice(0, 2).map((s) => (
                  <li
                    key={s}
                    className="rounded-lg bg-secondary/70 px-3 py-2 text-sm text-muted-foreground"
                  >
                    “{s}”
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
