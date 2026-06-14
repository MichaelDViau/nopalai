import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Subí mis ventas de fin de semana usando las promociones que me arma NopalAI. Escribe como si conociera a mis clientes.",
    name: "Mariana Ríos",
    role: "Dueña de restaurante · Guadalajara",
    initials: "MR",
  },
  {
    quote:
      "Atiendo huéspedes de Airbnb en Tulum y NopalAI me ayuda a responder en español e inglés en segundos. Cambió mi operación.",
    name: "Carlos Méndez",
    role: "Anfitrión vacacional · Tulum",
    initials: "CM",
  },
  {
    quote:
      "Las descripciones de propiedades que genera son mejores que las que pagaba a un redactor. Cierro más rápido.",
    name: "Daniela Torres",
    role: "Asesora inmobiliaria · CDMX",
    initials: "DT",
  },
  {
    quote:
      "Por fin una IA que entiende cómo hablamos en México. La uso todos los días para contenido de redes.",
    name: "Luis Hernández",
    role: "Community manager · Monterrey",
    initials: "LH",
  },
  {
    quote:
      "Me ahorra horas a la semana respondiendo mensajes y reseñas. El plan Premium se paga solo.",
    name: "Sofía Aguilar",
    role: "Emprendedora · Puebla",
    initials: "SA",
  },
  {
    quote:
      "Rápida, clara y en buen español. Es la primera herramienta de IA que mi equipo adoptó sin quejarse.",
    name: "Jorge Salinas",
    role: "Gerente de PyME · Querétaro",
    initials: "JS",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Testimonios
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Querido por miles de personas en México
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              4.9/5 · más de 2,000 usuarios
            </span>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
