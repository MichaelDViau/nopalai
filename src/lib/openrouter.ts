import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { PlanId } from "@/lib/constants";

/**
 * OpenRouter client. Free and Plus users run on a fast, low-cost standard
 * model; Pro users get a stronger premium model. The model families
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

// Standard model — used by Free and Plus. (Legacy OPENROUTER_MODEL_FREE is
// still honored so existing deployments keep working.)
const MODEL_STANDARD =
  process.env.OPENROUTER_MODEL_STANDARD ||
  process.env.OPENROUTER_MODEL_FREE ||
  "deepseek/deepseek-chat";

// Premium model — used by Pro.
const MODEL_PRO =
  process.env.OPENROUTER_MODEL_PRO ||
  process.env.OPENROUTER_MODEL_PREMIUM ||
  "qwen/qwen-2.5-72b-instruct";

/** Fallback model if the primary is unavailable on OpenRouter. */
export const MODEL_FALLBACK = "meta-llama/llama-3.1-70b-instruct";

export function modelForPlan(plan: PlanId) {
  const openrouter = getClient();
  const id = plan === "pro" ? MODEL_PRO : MODEL_STANDARD;
  return openrouter.chat(id);
}

export const AVAILABLE_MODELS = {
  standard: MODEL_STANDARD,
  pro: MODEL_PRO,
  fallback: MODEL_FALLBACK,
};
