import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="container max-w-3xl py-16">
        <article className="prose-chat prose-headings:font-semibold">
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
