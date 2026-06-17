import { SITE } from "@/lib/constants";
import { FAQS } from "@/components/marketing/faq";

/** JSON-LD structured data for rich results (Organization, Product, FAQ). */
export function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      slogan: SITE.tagline,
      description: SITE.description,
      logo: `${SITE.url}/icon.svg`,
      sameAs: ["https://twitter.com/nopalai"],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: SITE.description,
      inLanguage: "es-419",
      offers: [
        {
          "@type": "Offer",
          name: "Gratis",
          price: "0",
          priceCurrency: "MXN",
        },
        {
          "@type": "Offer",
          name: "Premium",
          price: "99",
          priceCurrency: "MXN",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "2000",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
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
