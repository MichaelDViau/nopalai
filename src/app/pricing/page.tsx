import type { Metadata } from "next";

import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/cta";

export const metadata: Metadata = {
  title: "Precios — Gratis y Pro 199 MXN",
  description:
    "Empieza gratis y explora agentes de IA Plus y Pro: mensajes ilimitados, sin anuncios, respuestas más rápidas y modelos premium.",
  alternates: { canonical: "/pricing" },
};

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
