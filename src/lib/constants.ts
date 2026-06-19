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
  // Single brand hue. Matches the light-theme `--primary` token (deep forest
  // green) so the browser chrome, PWA manifest, OG image and Clerk widget all
  // agree with the in-app UI.
  brandColor: "#3F5B45",
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
    // Hard daily cap for the free tier.
    dailyMessages: 20,
    features: ["Límite de 20 mensajes al día", "Acceso al chat", "Historial de conversaciones", "Sin tarjeta de crédito"],
  },
  plus: {
    name: "Plus",
    price: 69,
    // "Unlimited" in marketing terms — a generous fair-use ceiling.
    dailyMessages: 1000,
    features: ["Mensajes ilimitados", "Sin anuncios", "Respuestas más rápidas", "Historial de conversaciones"],
  },
  pro: {
    name: "Pro",
    price: 199,
    // Higher fair-use ceiling than Plus ("uso ampliado") + premium model.
    dailyMessages: 2000,
    features: ["Uso ampliado", "Modelos premium", "Acceso prioritario", "Soporte preferente"],
  },
} as const;

/**
 * Backend plan identity — the source of truth for anything that gates features
 * or limits by plan. Mirrors the three marketing tiers end-to-end: the Stripe
 * webhook records the purchased tier from checkout metadata, and Plus/Pro have
 * distinct limits (and models, via `modelForPlan`).
 */
export type PlanId = "free" | "plus" | "pro";

export const DAILY_LIMITS: Record<PlanId, number> = {
  free: PLANS.free.dailyMessages,
  plus: PLANS.plus.dailyMessages,
  pro: PLANS.pro.dailyMessages,
};
