const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy.
 *
 * Allowlist scoped to the exact third parties this app loads: Clerk (auth +
 * Cloudflare Turnstile bot check), Stripe (checkout/billing JS + frames),
 * PostHog and Google Analytics. Supabase and OpenRouter are server-only, so
 * the browser never talks to them directly and they are intentionally absent.
 *
 * `'unsafe-inline'` is kept for scripts/styles because Next.js, the GA bootstrap
 * and the JSON-LD block all emit inline content; moving to nonces is the next
 * hardening step. In development we also allow `'unsafe-eval'` and websockets
 * so Fast Refresh / HMR keep working.
 *
 * ⚠️ Verify in a Vercel preview against live Clerk + Stripe before shipping to
 *    production — a missing host here surfaces as a blocked request, not a
 *    build error.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://js.stripe.com https://*.clerk.com https://*.clerk.accounts.dev https://*.clerk.services https://challenges.cloudflare.com https://www.googletagmanager.com https://*.posthog.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://img.clerk.com https://*.stripe.com https://www.googletagmanager.com https://*.google-analytics.com https://*.posthog.com",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws:" : ""} https://*.clerk.com https://*.clerk.accounts.dev https://clerk-telemetry.com https://api.stripe.com https://www.googletagmanager.com https://*.google-analytics.com https://*.posthog.com`,
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://*.clerk.com https://*.clerk.accounts.dev https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "img.clerk.com" }],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
      {
        // Long-cache immutable static assets.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
