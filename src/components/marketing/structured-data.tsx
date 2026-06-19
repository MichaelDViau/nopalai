import { SITE } from "@/lib/constants";

const FAQS = [
  {
    q: "¿Qué es NopalAI?",
    a: "La inteligencia artificial para Latinoamérica. Nopal te ayuda a obtener respuestas, aprender, traducir, crear contenido y ser más productivo, todo desde una sola plataforma. Simple, rápido y accesible, está diseñado para acompañarte en tus estudios, trabajo y proyectos, con una experiencia pensada para las necesidades de Latinoamérica.",
  },
  {
    q: "¿Es gratis?",
    a: "Empieza gratis y descubre todo lo que Nopal puede hacer por ti. Sin tarjeta de crédito. Cuando necesites más, desbloquea Plus o Pro para obtener mayor velocidad, más capacidad y una experiencia diseñada para quienes usan la inteligencia artificial todos los días. Potente, simple y accesible. Pensado para Latinoamérica.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. Puedes cancelar en cualquier momento. Tu suscripción seguirá activa hasta el final del periodo ya pagado. Sin contratos, sin cargos ocultos y con total libertad para volver cuando quieras.",
  },
  {
    q: "¿Necesito una tarjeta de crédito para empezar?",
    a: "No. Puedes comenzar a usar Nopal gratis sin necesidad de ingresar una tarjeta de crédito. Regístrate y empieza a conversar en segundos.",
  },
  {
    q: "¿Cuál es la diferencia entre Gratis, Plus y Pro?",
    a: "El plan Gratis es ideal para comenzar y descubrir todo lo que Nopal puede hacer por ti. Plus ofrece una experiencia más rápida y mayor capacidad para quienes usan la inteligencia artificial todos los días. Pro está diseñado para usuarios que necesitan el máximo rendimiento para trabajo, estudio y proyectos más exigentes.",
  },
  {
    q: "¿Mis conversaciones son privadas?",
    a: "Sí. La privacidad y seguridad de tus datos son importantes para nosotros. Tus conversaciones se manejan de forma segura para ofrecerte la mejor experiencia posible.",
  },
  {
    q: "¿Puedo usar Nopal desde mi celular?",
    a: "Sí. Nopal funciona perfectamente en teléfonos, tabletas y computadoras, para que puedas acceder a tus conversaciones y herramientas desde cualquier lugar.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Aceptamos múltiples métodos de pago para que puedas elegir el que mejor se adapte a ti. Puedes pagar con tarjetas de crédito y débito, PayPal, Mercado Pago, OXXO y otras opciones disponibles en tu región. Todas las transacciones son seguras y puedes administrar o cancelar tu suscripción en cualquier momento.",
  },
  {
    q: "¿Habrá nuevas funciones en el futuro?",
    a: "Sí. Estamos mejorando Nopal constantemente y trabajamos en nuevas funciones y herramientas para ayudarte a estudiar, trabajar, crear contenido y ser más productivo cada día.",
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
