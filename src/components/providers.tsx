"use client";

import type { Lang } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { PostHogProvider } from "@/components/analytics/posthog-provider";

export function Providers({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider initialLang={initialLang}>
        <PostHogProvider>{children}</PostHogProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
