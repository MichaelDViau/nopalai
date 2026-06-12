export const SITE = {
  name: "NopalAI",
  tagline: "La IA que entiende México.",
  description:
    "NopalAI es el asistente de inteligencia artificial creado para México. Entiende el español mexicano y ayuda con negocios, turismo, bienes raíces, contenido y la vida diaria.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://nopalai.mx",
  locale: "es_MX",
  twitter: "@nopalai",
  keywords: [
    "IA México",
    "inteligencia artificial México",
    "ChatGPT México",
    "AI para negocios México",
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
