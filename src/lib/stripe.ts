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

export const PLUS_PRICE_ID = process.env.STRIPE_PLUS_PRICE_ID || "";
export const PREMIUM_PRICE_ID = process.env.STRIPE_PREMIUM_PRICE_ID || "";
