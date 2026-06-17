import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { PlanId } from "@/lib/constants";

/**
 * OpenRouter client. We route each plan to a different model: Free gets a
 * fast, low-cost model, Plus a stronger one, and Pro our most powerful
 * model. Every model is configurable with env vars (no redeploy needed).
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
      "X-Title": "NopalAI",
    },
  });
}

const MODEL_FREE = process.env.OPENROUTER_MODEL_FREE || "deepseek/deepseek-chat";
const MODEL_PLUS =
  process.env.OPENROUTER_MODEL_PLUS ||
  process.env.OPENROUTER_MODEL_PREMIUM || // legacy env name
  "qwen/qwen-2.5-72b-instruct";
const MODEL_PRO = process.env.OPENROUTER_MODEL_PRO || "deepseek/deepseek-r1";

/** Fallback model if the primary is unavailable on OpenRouter. */
export const MODEL_FALLBACK = "meta-llama/llama-3.1-70b-instruct";

export function modelForPlan(plan: PlanId) {
  const openrouter = getClient();
  const id =
    plan === "pro" ? MODEL_PRO : plan === "plus" ? MODEL_PLUS : MODEL_FREE;
  return openrouter.chat(id);
}

export const AVAILABLE_MODELS = {
  free: MODEL_FREE,
  plus: MODEL_PLUS,
  pro: MODEL_PRO,
  fallback: MODEL_FALLBACK,
};
