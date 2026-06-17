import "server-only";
import Stripe from "stripe";

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

// One Stripe price per paid tier. The legacy STRIPE_PREMIUM_PRICE_ID is
// still accepted as the Pro price so existing deployments keep working.
export const PLUS_PRICE_ID = process.env.STRIPE_PLUS_PRICE_ID || "";
export const PRO_PRICE_ID =
  process.env.STRIPE_PRO_PRICE_ID || process.env.STRIPE_PREMIUM_PRICE_ID || "";

export type PaidPlan = "plus" | "pro";

/** Stripe price id to charge for a given paid plan. */
export function priceIdForPlan(plan: PaidPlan): string {
  return plan === "pro" ? PRO_PRICE_ID : PLUS_PRICE_ID;
}

/** Reverse lookup: which plan a Stripe price id corresponds to. */
export function planForPriceId(priceId: string | null | undefined): PaidPlan | null {
  if (!priceId) return null;
  if (priceId === PRO_PRICE_ID) return "pro";
  if (priceId === PLUS_PRICE_ID) return "plus";
  return null;
}
