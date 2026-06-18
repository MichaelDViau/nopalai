import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { PlanId } from "@/lib/constants";

/**
 * OpenRouter client. We route every plan through OpenRouter and default to
 * Google Gemma 4 31B (free), which OpenRouter exposes through its
 * OpenAI-compatible chat API. Env vars can still override the model without
 * a redeploy.
 */
function getClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY no está configurado.");
  }
  return createOpenRouter({
    apiKey,
    headers: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://nopalai.mx",
      "X-OpenRouter-Title": "NopalAI",
    },
  });
}

const DEFAULT_OPENROUTER_MODEL = "google/gemma-4-31b-it:free";

const MODEL_FREE = process.env.OPENROUTER_MODEL_FREE || DEFAULT_OPENROUTER_MODEL;
const MODEL_PREMIUM =
  process.env.OPENROUTER_MODEL_PREMIUM || DEFAULT_OPENROUTER_MODEL;

/** Fallback model if the primary is unavailable on OpenRouter. */
export const MODEL_FALLBACK = DEFAULT_OPENROUTER_MODEL;

export function modelForPlan(plan: PlanId) {
  const openrouter = getClient();
  const id = plan === "premium" ? MODEL_PREMIUM : MODEL_FREE;
  return openrouter.chat(id);
}

export const AVAILABLE_MODELS = {
  free: MODEL_FREE,
  premium: MODEL_PREMIUM,
  fallback: MODEL_FALLBACK,
};
