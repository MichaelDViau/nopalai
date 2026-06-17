import { SITE, PLANS } from "@/lib/constants";
import { FAQS } from "@/components/marketing/faq";

/** JSON-LD structured data for rich results (Organization, Product, FAQ). */
export function StructuredData() {
  const areaServed = SITE.countries.map((code) => ({
    "@type": "Country",
    identifier: code,
  }));

  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      slogan: SITE.tagline,
      description: SITE.description,
      logo: `${SITE.url}/icon.svg`,
      areaServed,
      sameAs: ["https://twitter.com/nopalai"],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: SITE.description,
      inLanguage: "es",
      areaServed,
      offers: Object.values(PLANS).map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: String(plan.priceMXN),
        priceCurrency: "MXN",
      })),
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
