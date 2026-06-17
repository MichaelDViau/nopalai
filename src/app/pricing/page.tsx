import type { Metadata } from "next";

import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/cta";

export const metadata: Metadata = {
  title: "Precios — Gratis, Plus y Pro",
  description:
    "Empieza gratis con 20 mensajes al día. Plus por 69 MXN al mes con mensajes ilimitados y sin anuncios, o Pro por 199 MXN con nuestra IA más potente. Precios para Latinoamérica.",
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
