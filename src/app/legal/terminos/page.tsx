import type { Metadata } from "next";

import { SITE } from "@/lib/constants";
import { TERMS_MD } from "@/lib/legal-content";
import { LegalArticle } from "@/components/marketing/legal-article";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description: `Términos de Servicio de ${SITE.name}: condiciones de uso de la plataforma, planes, pagos y responsabilidades.`,
  alternates: { canonical: "/legal/terminos" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <LegalArticle content={TERMS_MD} />;
}
