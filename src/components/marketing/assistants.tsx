import { MODE_LIST } from "@/lib/modes";

export function Assistants() {
  return (
    <section id="assistants" className="scroll-mt-16 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Un experto para cada cosa
          </h2>
          <p className="mt-3 text-muted-foreground">
            Elige un asistente y empieza a escribir. Cada uno está afinado para
            lo suyo.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {MODE_LIST.map((mode) => (
            <div
              key={mode.id}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated sm:p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                <mode.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold">{mode.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {mode.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
