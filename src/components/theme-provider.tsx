"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Thin client wrapper around `next-themes` so the server-rendered root
 * layout can stay a Server Component. Theme is applied via the `class`
 * strategy (`.dark` on <html>) and persisted to localStorage by the lib.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
