import {
  createOpenRouter,
  type OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import type { PlanId } from "@/lib/constants";
import { SITE } from "@/lib/constants";

/**
 * OpenRouter chat model.
 *
 * Every plan is currently served by the same model — Google Gemma 4 31B
 * (free tier) — which OpenRouter exposes through its OpenAI-compatible chat
 * API. When paid plans get dedicated models, branch inside `modelForPlan`.
 */
export const OPENROUTER_MODEL = "google/gemma-4-31b-it:free";

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

// `_plan` is reserved for future per-tier model selection; underscore-prefixed
// so the linter treats it as intentionally unused.
export function modelForPlan(_plan: PlanId) {
  return getProvider().chat(OPENROUTER_MODEL);
}
