import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { PlanId } from "@/lib/constants";

/**
 * OpenRouter client. We route every plan through OpenRouter to Google Gemma 4
 * 31B (free), which OpenRouter exposes through its OpenAI-compatible chat API.
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

export const OPENROUTER_MODEL = "google/gemma-4-31b-it:free";

export function modelForPlan(_plan: PlanId) {
  const openrouter = getClient();
  return openrouter.chat(OPENROUTER_MODEL);
}

export const AVAILABLE_MODELS = {
  free: OPENROUTER_MODEL,
  premium: OPENROUTER_MODEL,
  fallback: OPENROUTER_MODEL,
};
