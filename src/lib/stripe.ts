import "server-only";
import Stripe from "stripe";
import type { PaidPlanId } from "@/lib/constants";

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY no está configurado.");
  }
  cached = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    appInfo: { name: "NopalAI", version: "1.0.0" },
    typescript: true,
  });
  return cached;
}

/**
 * Stripe price id per paid plan. `STRIPE_PREMIUM_PRICE_ID` is kept as a
 * legacy fallback for the Plus tier so existing deployments keep working.
 */
export const PRICE_IDS: Record<PaidPlanId, string> = {
  plus:
    process.env.STRIPE_PLUS_PRICE_ID ||
    process.env.STRIPE_PREMIUM_PRICE_ID ||
    "",
  pro: process.env.STRIPE_PRO_PRICE_ID || "",
};

export function priceIdForPlan(plan: PaidPlanId): string {
  return PRICE_IDS[plan];
}
