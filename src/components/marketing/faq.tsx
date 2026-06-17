import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQS = [
  {
    q: "¿Qué es NopalAI?",
    a: "Un asistente de inteligencia artificial creado para Latinoamérica. Entiende el español de la región y te ayuda con respuestas del día a día, traducciones, tareas escolares y contenido para redes sociales.",
  },
  {
    q: "¿Es gratis?",
    a: "Sí. El plan Gratis te da 20 mensajes al día, sin tarjeta de crédito. Si necesitas más, el plan Premium cuesta 99 MXN al mes.",
  },
  {
    q: "¿En qué se diferencia de ChatGPT?",
    a: "NopalAI está afinado para el contexto latinoamericano y trae 4 asistentes especializados listos para usar: General, Traducción, Escuela y Tareas, y Contenido y Marketing.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Claro. Puedes cancelar tu suscripción Premium en cualquier momento y seguirás teniendo acceso hasta el final del periodo pagado.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-16 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-[15px] sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
