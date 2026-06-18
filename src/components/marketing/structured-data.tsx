import { SITE } from "@/lib/constants";

const FAQS = [
  {
    q: "¿Qué es NopalAI?",
    a: "La inteligencia artificial para Latinoamérica. Accede a respuestas de alta calidad, traducciones, apoyo académico, generación de contenido y asistencia profesional en segundos. Toda la potencia de los mejores modelos de IA del mundo, adaptada a las necesidades de LATAM y disponible a un precio accesible para todos.",
  },
  {
    q: "¿Es gratis?",
    a: "Empieza gratis, sin tarjeta de crédito. Cuando necesites más potencia, desbloquea Plus o Pro y accede a agentes de IA avanzados diseñados para tareas más exigentes, generación de contenido, productividad y trabajo profesional. Tecnología de primer nivel, con precios accesibles para Latinoamérica.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. Tienes total libertad para cancelar tu suscripción cuando lo desees. Tu acceso permanecerá activo hasta el final del periodo de facturación ya pagado, sin penalizaciones ni cargos ocultos.",
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
