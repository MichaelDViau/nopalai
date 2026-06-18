export const SITE = {
  name: "NopalAI",
  tagline: "La IA que entiende LATAM.",
  description:
    "NopalAI es el asistente de inteligencia artificial creado para LATAM. Te ayuda con respuestas, traducciones, tareas escolares y contenido para redes sociales y marketing.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nopalai.com",
  locale: "es_MX",
  twitter: "@nopalai",
  keywords: [
    "IA LATAM",
    "inteligencia artificial LATAM",
    "ChatGPT LATAM",
    "asistente IA español",
    "NopalAI",
  ],
} as const;

export const PLANS = {
  free: {
    name: "Gratis",
    price: 0,
    dailyMessages: 20,
    features: ["Límite de 20 mensajes al día", "Acceso al chat", "Historial de conversaciones", "Sin tarjeta de crédito"],
  },
  plus: {
    name: "Plus",
    price: 69,
    dailyMessages: 1000,
    features: ["Mensajes ilimitados", "Sin anuncios", "Respuestas más rápidas", "Historial de conversaciones"],
  },
  pro: {
    name: "Pro",
    price: 199,
    dailyMessages: 1000,
    features: ["Uso ampliado", "Modelos premium", "Acceso prioritario", "Soporte preferente"],
  },
} as const;


export type PlanId = "free" | "premium";
export const FREE_DAILY_LIMIT = PLANS.free.dailyMessages;
export const PREMIUM_DAILY_LIMIT = PLANS.pro.dailyMessages;
