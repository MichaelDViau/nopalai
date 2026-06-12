"use client";

import posthog from "posthog-js";

/** Canonical analytics events tracked across PostHog + GA4. */
export const EVENTS = {
  SIGNUP_STARTED: "signup_started",
  SIGNUP_COMPLETED: "signup_completed",
  CHAT_STARTED: "chat_started",
  MESSAGE_SENT: "message_sent",
  MODE_SELECTED: "mode_selected",
  UPGRADE_CLICKED: "upgrade_clicked",
  CHECKOUT_STARTED: "checkout_started",
  PREMIUM_UPGRADED: "premium_upgraded",
  LIMIT_REACHED: "daily_limit_reached",
  CTA_CLICKED: "cta_clicked",
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fire an analytics event to every configured provider. Safe to call on
 * the server (no-op) and when a provider isn't configured.
 */
export function track(
  event: AnalyticsEvent,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  try {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.capture(event, properties);
    }
  } catch {
    /* analytics must never break UX */
  }

  try {
    if (window.gtag) {
      window.gtag("event", event, properties ?? {});
    }
  } catch {
    /* noop */
  }
}
