import type { Metadata } from "next";

import { SITE } from "@/lib/constants";
import { PRIVACY_MD } from "@/lib/legal-content";
import { LegalArticle } from "@/components/marketing/legal-article";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Política de Privacidad de ${SITE.name}: cómo recopilamos, usamos, compartimos y protegemos tu información personal.`,
  alternates: { canonical: "/legal/privacidad" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <LegalArticle content={PRIVACY_MD} />;
}
