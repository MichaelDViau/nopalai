import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Only list publicly indexable pages. Auth routes (/sign-in, /sign-up) and
  // the dashboard are intentionally excluded — they're marked noindex, so
  // advertising them here would send Search Console mixed signals.
  const routes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/pricing", priority: 0.8, freq: "monthly" },
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
