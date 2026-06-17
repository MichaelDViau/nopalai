import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQS = [
  {
    q: "¿Qué es NopalAI?",
    a: "NopalAI es un asistente de inteligencia artificial hecho para Latinoamérica: entiende el español de tu región y te ayuda con respuestas del día a día, traducciones, tareas y contenido para redes. Y cuesta mucho menos que otras IA del mercado: precios pensados y cobrados para Latinoamérica, en la moneda de tu país, sin pagar de más.",
  },
  {
    q: "¿Es gratis?",
    a: "Sí. El plan Gratis te da 20 mensajes al día, sin tarjeta de crédito. Si necesitas más, el plan Plus cuesta 69 MXN al mes y el plan Pro 199 MXN al mes.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Claro. Puedes cancelar tu suscripción en cualquier momento y seguirás teniendo acceso hasta el final del periodo pagado.",
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
