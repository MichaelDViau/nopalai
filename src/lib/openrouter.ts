import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { PlanId } from "@/lib/constants";

/**
 * OpenRouter client. We route Free users to a fast, low-cost model and
 * Premium users to a stronger model. All three requested model families
 * (DeepSeek, Qwen, Llama) are available via OpenRouter and can be swapped
 * with env vars without a redeploy.
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
const MODEL_PREMIUM =
  process.env.OPENROUTER_MODEL_PREMIUM || "qwen/qwen-2.5-72b-instruct";

/** Fallback model if the primary is unavailable on OpenRouter. */
export const MODEL_FALLBACK = "meta-llama/llama-3.1-70b-instruct";

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
