export const SITE = {
  name: "NopalAI",
  tagline: "La inteligencia artificial para Latinoamérica.",
  description:
    "NopalAI es la inteligencia artificial para Latinoamérica. Obtén respuestas, traduce, estudia, crea contenido para redes y sé más productivo, todo en español e inglés.",
  // Canonical production URL. In deployment this is driven by NEXT_PUBLIC_APP_URL
  // (the same variable used by the CSRF origin check, Stripe redirects and the
  // OpenRouter referer); the fallback is only used for local builds/previews.
  url: process.env.NEXT_PUBLIC_APP_URL || "https://nopal-ai.com",
  locale: "es_MX",
  twitter: "@nopalai",
  email: "hola@nopal-ai.com",
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


/**
 * Backend plan identity. NOTE: the marketing site presents three tiers
 * (Free / Plus / Pro), but the database and billing currently collapse every
 * *paid* subscription into a single "premium" plan. Plus and Pro therefore
 * share the same limits today; making them behave distinctly is a tracked
 * follow-up (see the audit report). Keep this type as the source of truth for
 * anything that gates features by plan.
 */
export type PlanId = "free" | "premium";
export const FREE_DAILY_LIMIT = PLANS.free.dailyMessages;
export const PREMIUM_DAILY_LIMIT = PLANS.pro.dailyMessages;
