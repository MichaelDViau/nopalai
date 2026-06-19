import {
  createOpenRouter,
  type OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import type { PlanId } from "@/lib/constants";
import { SITE } from "@/lib/constants";

/**
 * OpenRouter chat models, served through its OpenAI-compatible chat API.
 *
 * Free and Plus are served by Google Gemma 4 31B (free tier). Pro can be
 * pointed at a stronger "premium" model via `OPENROUTER_PRO_MODEL`; if that
 * env var is unset, Pro transparently falls back to the base model so the app
 * keeps working out of the box.
 */
export const OPENROUTER_MODEL = "google/gemma-4-31b-it:free";
export const OPENROUTER_PRO_MODEL =
  process.env.OPENROUTER_PRO_MODEL || OPENROUTER_MODEL;

// The provider is stateless and safe to reuse across requests, so we build it
// once instead of on every chat turn.
let cachedProvider: OpenRouterProvider | null = null;

function getProvider(): OpenRouterProvider {
  if (cachedProvider) return cachedProvider;

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY no está configurado.");
  }

  cachedProvider = createOpenRouter({
    apiKey,
    headers: {
      // OpenRouter attribution headers — surface our app on their dashboard.
      "HTTP-Referer": SITE.url,
      "X-Title": SITE.name,
    },
  });
  return cachedProvider;
}

/** Resolve the chat model for a given plan. Pro gets the premium model. */
export function modelForPlan(plan: PlanId) {
  const model = plan === "pro" ? OPENROUTER_PRO_MODEL : OPENROUTER_MODEL;
  return getProvider().chat(model);
}
