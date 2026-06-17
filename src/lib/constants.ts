export const SITE = {
  name: "NopalAI",
  tagline: "La IA que entiende Latinoamérica.",
  description:
    "NopalAI es el asistente de inteligencia artificial creado para Latinoamérica. Entiende el español de la región y te ayuda con respuestas, traducciones, tareas escolares y contenido para redes sociales y marketing.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://nopalai.mx",
  // BCP-47 tag for Latin American Spanish.
  locale: "es_419",
  twitter: "@nopalai",
  keywords: [
    "IA Latinoamérica",
    "inteligencia artificial Latinoamérica",
    "ChatGPT en español",
    "AI para negocios Latam",
    "asistente IA español",
    "inteligencia artificial en español",
    "NopalAI",
  ],
} as const;

export const PLANS = {
  free: {
    id: "free",
    name: "Gratis",
    priceMXN: 0,
    dailyMessageLimit: 20,
    tagline: "Para empezar a explorar la IA en tu idioma.",
    features: [
      "20 mensajes por día",
      "Los 4 asistentes especializados",
      "Historial de conversaciones",
    ],
    limitations: ["Con anuncios", "Velocidad estándar"],
  },
  plus: {
    id: "plus",
    name: "Plus",
    priceMXN: 69,
    dailyMessageLimit: 1000,
    tagline: "Para quienes usan la IA todos los días.",
    features: [
      "Mensajes ilimitados*",
      "Sin anuncios",
      "Respuestas más rápidas",
      "Modelo avanzado (Qwen 72B)",
      "Historial de conversaciones",
    ],
    limitations: [],
  },
  pro: {
    id: "pro",
    name: "Pro",
    priceMXN: 199,
    dailyMessageLimit: 2000,
    tagline: "Nuestra IA más potente, para trabajo serio.",
    features: [
      "Todo lo de Plus",
      "Mensajes ilimitados*",
      "Nuestra IA más potente",
      "Respuestas más largas y detalladas",
      "Acceso prioritario",
      "Soporte preferente",
    ],
    limitations: [],
  },
} as const;

export type PlanId = keyof typeof PLANS;

/** Plans that require a paid Stripe subscription. */
export type PaidPlanId = Exclude<PlanId, "free">;

export const FREE_DAILY_LIMIT = PLANS.free.dailyMessageLimit;
export const PLUS_DAILY_LIMIT = PLANS.plus.dailyMessageLimit;
export const PRO_DAILY_LIMIT = PLANS.pro.dailyMessageLimit;
