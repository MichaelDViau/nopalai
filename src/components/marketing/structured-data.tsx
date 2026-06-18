import { SITE } from "@/lib/constants";
import { DICT } from "@/lib/i18n";

/** JSON-LD structured data for rich results (Organization, Product, FAQ). */
export function StructuredData() {
  const t = DICT.es;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      slogan: t.tagline,
      description: t.meta.description,
      logo: `${SITE.url}/icon.svg`,
      sameAs: ["https://twitter.com/nopalai"],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: t.meta.description,
      inLanguage: "es",
      offers: t.pricing.plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price.replace(/[^0-9]/g, ""),
        priceCurrency: "MXN",
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "2000",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be inlined; data is fully controlled by us.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
