"use client";

import type { ReactNode } from "react";

import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PostHogProvider>{children}</PostHogProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
