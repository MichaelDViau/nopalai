import {
  Globe,
  Languages,
  Lock,
  type LucideIcon,
  Rocket,
  Sparkles,
  Wand2,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Globe,
    title: "Hecho para México",
    description:
      "Entiende el español mexicano, los modismos, los pesos y el contexto local. No es una traducción: piensa como aquí.",
  },
  {
    icon: Sparkles,
    title: "4 asistentes especializados",
    description:
      "General, Negocios, Turismo y Bienes Raíces. Cada uno con conocimiento experto de su sector.",
  },
  {
    icon: Rocket,
    title: "Respuestas al instante",
    description:
      "Streaming en tiempo real con modelos rápidos. Sin esperas, sin fricción, listo para usar.",
  },
  {
    icon: Wand2,
    title: "Contenido que vende",
    description:
      "Publicaciones para redes, mensajes de WhatsApp, descripciones y campañas listas para copiar y pegar.",
  },
  {
    icon: Languages,
    title: "Traducciones naturales",
    description:
      "Comunica con turistas y clientes internacionales en inglés y otros idiomas, sin sonar robótico.",
  },
  {
    icon: Lock,
    title: "Privado y seguro",
    description:
      "Tus conversaciones son tuyas. Autenticación segura y datos protegidos en todo momento.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Funciones
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Todo lo que necesitas, en un solo lugar
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Una herramienta de IA premium, diseñada para la forma en que se
            trabaja y se vive en México.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_40px_-16px_rgba(11,122,75,0.25)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
