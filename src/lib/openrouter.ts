import {
  createOpenRouter,
  type OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import type { PlanId } from "@/lib/constants";

/**
 * Hugging Face Router chat models, served through its OpenAI-compatible chat API.
 *
 * NopalAI now uses Qwythos for every plan during this test. There is no
 * fallback or per-plan override: every chat request is pinned to this model.
 */
export const HUGGINGFACE_BASE_URL = "https://router.huggingface.co/v1";
export const HUGGINGFACE_MODEL =
  "empero-ai/Qwythos-9B-Claude-Mythos-5-1M:fastest";
// The Hugging Face Router is OpenAI-compatible. The existing OpenRouter AI SDK
// provider can target custom compatible base URLs, which avoids adding another
// provider package just to switch the backend.
let cachedProvider: OpenRouterProvider | null = null;

function getProvider(): OpenRouterProvider {
  if (cachedProvider) return cachedProvider;

  const apiKey = process.env.HF_TOKEN;
  if (!apiKey) {
    throw new Error("HF_TOKEN no está configurado.");
  }

  cachedProvider = createOpenRouter({
    apiKey,
    baseURL: HUGGINGFACE_BASE_URL,
    compatibility: "compatible",
  });
  return cachedProvider;
}

/** Resolve the chat model. Every plan is pinned to Qwythos for this test. */
export function modelForPlan(_plan: PlanId) {
  return getProvider().chat(HUGGINGFACE_MODEL);
}
