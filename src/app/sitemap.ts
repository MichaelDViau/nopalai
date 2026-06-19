import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { LANDING_SLUGS } from "@/lib/landing-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Only list publicly indexable pages. Auth routes (/sign-in, /sign-up) and
  // the dashboard are intentionally excluded — they're marked noindex, so
  // advertising them here would send Search Console mixed signals.
  const routes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/soluciones", priority: 0.9, freq: "weekly" },
    { path: "/pricing", priority: 0.8, freq: "monthly" },
    // SEO landing pages — the topical-authority backbone, generated from the
    // single source of truth in lib/landing-pages so new pages appear here
    // automatically.
    ...LANDING_SLUGS.map((slug) => ({
      path: `/${slug}`,
      priority: 0.8,
      freq: "monthly" as const,
    })),
    { path: "/legal/privacidad", priority: 0.3, freq: "yearly" },
    { path: "/legal/terminos", priority: 0.3, freq: "yearly" },
  ];

  return routes.map(({ path, priority, freq }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
