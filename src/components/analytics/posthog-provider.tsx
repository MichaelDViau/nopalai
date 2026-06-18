"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as Provider } from "posthog-js/react";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

// Module-level flag so PostHog is only initialized once per browser page-load
// even if this module is re-evaluated (HMR, Strict Mode, etc.).
let phInited = false;

function ensurePostHogInited() {
  if (phInited || !key || typeof window === "undefined") return;
  try {
    phInited = true;
    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
      capture_pageleave: true,
      persistence: "localStorage+cookie",
    });
  } catch (err) {
    phInited = false; // allow retry if init threw
    console.warn("[PostHog] init failed:", err);
  }
}

function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    ensurePostHogInited();
    if (!key || !pathname) return;
    try {
      let url = window.origin + pathname;
      const qs = searchParams?.toString();
      if (qs) url += `?${qs}`;
      posthog.capture("$pageview", { $current_url: url });
    } catch {
      /* analytics must never break UX */
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!key) return <>{children}</>;
  return (
    <Provider client={posthog}>
      {/* useSearchParams must sit inside Suspense to avoid opting the whole
          tree out of static rendering / streaming in Next.js 15. */}
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
      {children}
    </Provider>
  );
}
