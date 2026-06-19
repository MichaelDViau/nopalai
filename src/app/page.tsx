import type { Metadata } from "next";

import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/cta";
import { StructuredData } from "@/components/marketing/structured-data";

export const metadata: Metadata = {
  // Homepage SEO target: brand + the head term "Inteligencia Artificial para
  // Latinoamérica". `absolute` opts out of the `%s · NopalAI` title template.
  title: { absolute: "NopalAI | Inteligencia Artificial para Latinoamérica" },
  description:
    "NopalAI es una plataforma de inteligencia artificial diseñada para Latinoamérica. Obtén respuestas, traducciones, ayuda académica, generación de contenido y asistencia profesional en español e inglés.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <Pricing showComparison={false} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
