export const SITE = {
  name: "NopalAI",
  shortName: "Nopal",
  tagline: "La IA que entiende Latinoamérica.",
  description:
    "NopalAI es el asistente de inteligencia artificial para Latinoamérica. Habla el español de cada país y te ayuda con respuestas, traducciones, tareas escolares y contenido para redes y marketing. Empieza gratis.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://nopalai.mx",
  /** BCP-47 tag for Latin American Spanish — a strong pan-regional signal. */
  htmlLang: "es-419",
  /** Open Graph locale (Spanish — Latin America). */
  locale: "es_LA",
  twitter: "@nopalai",
  /** ISO country codes for the markets we serve (used in structured data). */
  countries: [
    "MX",
    "CO",
    "AR",
    "PE",
    "CL",
    "EC",
    "GT",
    "CU",
    "BO",
    "DO",
    "HN",
    "PY",
    "NI",
    "SV",
    "CR",
    "PA",
    "UY",
    "VE",
  ],
  keywords: [
    "IA en español",
    "inteligencia artificial en español",
    "IA para Latinoamérica",
    "inteligencia artificial América Latina",
    "asistente de IA en español",
    "ChatGPT en español",
    "chatbot en español",
    "IA México",
    "IA Colombia",
    "IA Argentina",
    "IA Perú",
    "IA Chile",
    "NopalAI",
    "Nopal IA",
  ],
} as const;

/**
 * Subscription tiers.
 *
 * - free: capped daily messages on the standard model (with ads).
 * - plus: unlimited* messages on the standard model, no ads.
 * - pro:  everything in Plus plus access to premium AI models.
 *
 * "Unlimited" carries a generous fair-use cap (dailyMessageLimit) to stop
 * abuse; it is not surfaced to users as a hard limit.
 */
export const PLANS = {
  free: {
    id: "free",
    name: "Gratis",
    priceMXN: 0,
    dailyMessageLimit: 20,
    popular: false,
    tagline: "Para empezar a explorar la IA en español.",
    features: [
      "20 mensajes por día",
      "Los 4 asistentes especializados",
      "Historial de conversaciones",
      "Modelo de IA estándar",
    ],
  },
  plus: {
    id: "plus",
    name: "Plus",
    priceMXN: 69,
    dailyMessageLimit: 1000,
    popular: true,
    tagline: "Uso ilimitado para el día a día.",
    features: [
      "Mensajes ilimitados*",
      "Modelo de IA estándar",
      "Sin anuncios",
      "Respuestas más rápidas",
      "Historial completo",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    priceMXN: 199,
    dailyMessageLimit: 5000,
    popular: false,
    tagline: "Lo mejor de Nopal para trabajo serio.",
    features: [
      "Todo lo de Plus",
      "Modelos de IA premium",
      "Máxima calidad en las respuestas",
      "Acceso prioritario",
      "Soporte preferente",
    ],
  },
} as const;

export type PlanId = keyof typeof PLANS;

/** Paid tiers, in upgrade order. */
export const PAID_PLAN_IDS = ["plus", "pro"] as const;
export type PaidPlanId = (typeof PAID_PLAN_IDS)[number];

export const FREE_DAILY_LIMIT = PLANS.free.dailyMessageLimit;
export const PLUS_DAILY_LIMIT = PLANS.plus.dailyMessageLimit;
export const PRO_DAILY_LIMIT = PLANS.pro.dailyMessageLimit;
