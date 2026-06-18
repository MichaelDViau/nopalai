"use client";

import type { ReactNode } from "react";

import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import type { Lang } from "@/lib/i18n";

export function AppProviders({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
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
