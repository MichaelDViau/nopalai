import type { Metadata } from "next";

import { DICT } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/cta";

export async function generateMetadata(): Promise<Metadata> {
  const t = DICT[await getServerLang()];
  return {
    title: t.meta.pricingTitle,
    description: t.meta.pricingDescription,
    alternates: { canonical: "/pricing" },
  };
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-10">
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
