import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SITE } from "@/lib/constants";
import { LANDING_SLUGS, getLandingPage } from "@/lib/landing-pages";
import { LandingPageView } from "@/components/marketing/landing-page-view";
import { JsonLd, landingPageSchema } from "@/components/seo/json-ld";

type Params = { params: Promise<{ slug: string }> };

// Only the known landing slugs render; any other single-segment path 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};

  const canonical = `/${page.slug}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: `${SITE.url}${canonical}`,
      title: page.metaTitle,
      description: page.metaDescription,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: ["/opengraph-image"],
    },
  };
}

export default async function LandingRoute({ params }: Params) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd data={landingPageSchema(page)} />
      <LandingPageView page={page} />
    </>
  );
}
