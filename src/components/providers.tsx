"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { enUS, esMX } from "@clerk/localizations";

import type { Lang } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme/theme-provider";
import {
  LanguageProvider,
  useLanguage,
} from "@/components/i18n/language-provider";
import { PostHogProvider } from "@/components/analytics/posthog-provider";

/** Picks the Clerk localization that matches the active language. */
function ClerkLocalized({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  return (
    <ClerkProvider
      localization={lang === "en" ? enUS : esMX}
      appearance={{
        variables: {
          colorPrimary: "#1c825b",
          borderRadius: "0.75rem",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

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
        <ClerkLocalized>
          <PostHogProvider>{children}</PostHogProvider>
        </ClerkLocalized>
      </LanguageProvider>
    </ThemeProvider>
  );
}
