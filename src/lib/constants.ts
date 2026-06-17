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
    features: [
      "20 mensajes por día",
      "Los 4 asistentes especializados",
      "Historial de conversaciones",
      "Modelo DeepSeek",
    ],
    limitations: ["Con anuncios", "Velocidad estándar"],
  },
  premium: {
    id: "premium",
    name: "Premium",
    priceMXN: 99,
    dailyMessageLimit: 1000,
    features: [
      "Mensajes ilimitados*",
      "Sin anuncios",
      "Respuestas más rápidas",
      "Modelos premium (Qwen 72B)",
      "Acceso prioritario",
      "Soporte preferente",
    ],
    limitations: [],
  },
} as const;

export type PlanId = keyof typeof PLANS;

export const FREE_DAILY_LIMIT = PLANS.free.dailyMessageLimit;
export const PREMIUM_DAILY_LIMIT = PLANS.premium.dailyMessageLimit;
