import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { Assistants } from "@/components/marketing/assistants";
import { Pricing } from "@/components/marketing/pricing";
import { Testimonials } from "@/components/marketing/testimonials";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/cta";
import { StructuredData } from "@/components/marketing/structured-data";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Assistants />
        <Pricing showComparison={false} />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
