import {
  createOpenRouter,
  type OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import type { PlanId } from "@/lib/constants";

/**
 * Hugging Face Router chat models, served through its OpenAI-compatible chat API.
 *
 * Every plan is pinned to a single model for now. This must be a real model id
 * served by the Hugging Face Router (see https://router.huggingface.co/v1/models
 * for what your token can reach). Append `:provider` to pin a specific inference
 * provider; with no suffix the Router auto-selects one.
 */
export const HUGGINGFACE_BASE_URL = "https://router.huggingface.co/v1";
export const HUGGINGFACE_MODEL = "Qwen/Qwen2.5-7B-Instruct";
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

/** Resolve the chat model. Every plan is pinned to the same model for now. */
export function modelForPlan(_plan: PlanId) {
  return getProvider().chat(HUGGINGFACE_MODEL);
}
