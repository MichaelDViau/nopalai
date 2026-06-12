import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQS = [
  {
    q: "¿Qué es NopalAI?",
    a: "NopalAI es un asistente de inteligencia artificial creado específicamente para México. Entiende el español mexicano y te ayuda con negocios, turismo, bienes raíces, contenido para redes, traducciones, atención al cliente y la vida diaria.",
  },
  {
    q: "¿Es gratis?",
    a: "Sí. El plan Gratis te da 20 mensajes al día con acceso a los 4 asistentes especializados, sin tarjeta de crédito. Si necesitas más, el plan Premium cuesta 99 MXN al mes.",
  },
  {
    q: "¿En qué se diferencia de ChatGPT?",
    a: "NopalAI está afinado para el contexto mexicano: modismos, pesos, instituciones y formas de comunicación locales. Además incluye asistentes especializados por industria (negocios, turismo, bienes raíces) listos para usar desde el primer mensaje.",
  },
  {
    q: "¿Qué incluye el plan Premium?",
    a: "Por 99 MXN al mes obtienes mensajes prácticamente ilimitados, sin anuncios, respuestas más rápidas con modelos más potentes, acceso prioritario y soporte preferente. Puedes cancelar cuando quieras.",
  },
  {
    q: "¿Mis conversaciones son privadas?",
    a: "Sí. Tu cuenta está protegida con autenticación segura y tus conversaciones son privadas. No vendemos tus datos.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Por supuesto. Puedes cancelar tu suscripción Premium en cualquier momento desde tu panel y seguirás teniendo acceso hasta el final del periodo pagado.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 bg-secondary/40 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            ¿Tienes dudas? Aquí están las respuestas
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
