import { SITE } from "@/lib/constants";

const FAQS = [
  {
    q: "¿Qué es NopalAI?",
    a: "Un asistente de inteligencia artificial creado para LATAM que ayuda con respuestas, traducciones, tareas escolares y contenido para redes sociales.",
  },
  {
    q: "¿Es gratis?",
    a: "Sí. Puedes empezar gratis. También hay agentes de IA Plus y Pro disponibles.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. Puedes cancelar tu suscripción en cualquier momento.",
  },
];

/** JSON-LD structured data for rich results (Organization, Product, FAQ). */
export function StructuredData() {
  const data = [
    { "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, slogan: SITE.tagline, description: SITE.description, logo: `${SITE.url}/icon.svg`, sameAs: ["https://twitter.com/nopalai"] },
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: SITE.name, applicationCategory: "BusinessApplication", operatingSystem: "Web", description: SITE.description, inLanguage: ["es-MX", "en"], offers: [
      { "@type": "Offer", name: "Gratis", price: "0", priceCurrency: "MXN" },
      { "@type": "Offer", name: "Plus", price: "69", priceCurrency: "MXN" },
      { "@type": "Offer", name: "Pro", price: "199", priceCurrency: "MXN" },
    ], aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "2000" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
