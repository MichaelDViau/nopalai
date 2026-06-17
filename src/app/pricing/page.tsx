import type { Metadata } from "next";

import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/cta";

export const metadata: Metadata = {
  title: "Precios — Gratis, Plus 69 MXN y Pro 199 MXN",
  description:
    "Empieza gratis con 20 mensajes al día. Plus (69 MXN/mes): mensajes ilimitados y sin anuncios. Pro (199 MXN/mes): acceso a los modelos de IA premium. Cancela cuando quieras.",
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
