import type { Metadata } from "next";

import { SITE } from "@/lib/constants";
import { DICT } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang";
import { LegalDoc } from "@/components/marketing/legal-doc";

export async function generateMetadata(): Promise<Metadata> {
  const t = DICT[await getServerLang()];
  return {
    title: t.meta.termsTitle,
    description: `${t.meta.termsTitle} · ${SITE.name}.`,
    robots: { index: true, follow: true },
  };
}

export default function TermsPage() {
  return <LegalDoc doc="terms" />;
}
