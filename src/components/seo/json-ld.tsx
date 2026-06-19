import { SITE } from "@/lib/constants";
import type { LandingPage } from "@/lib/landing-pages";

/**
 * Renders one or more Schema.org nodes as a single JSON-LD <script>. Server
 * component — the markup ships in the initial HTML so crawlers see it without
 * executing JavaScript.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** BreadcrumbList for an Inicio → page trail. */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

/** FAQPage from a list of Q/A pairs. */
export function faqSchema(faqs: { q: string; a: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/** The full structured-data bundle for a single landing page. */
export function landingPageSchema(page: LandingPage): object[] {
  const url = `${SITE.url}/${page.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      url,
      name: page.metaTitle,
      description: page.metaDescription,
      inLanguage: "es",
      isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
      about: { "@type": "Thing", name: page.h1 },
    },
    breadcrumbSchema([
      { name: "Inicio", path: "/" },
      { name: page.h1, path: `/${page.slug}` },
    ]),
    faqSchema(page.faqs),
  ];
}
