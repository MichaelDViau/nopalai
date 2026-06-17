"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * App-wide theme provider built on `next-themes`.
 *
 * - Toggles the `dark` class on <html>, which drives the CSS variables in
 *   globals.css.
 * - Persists the choice to localStorage (key: `theme`).
 * - Defaults to the user's OS preference until they pick a theme.
 *
 * We intentionally do NOT pass `disableTransitionOnChange` so the color
 * transition declared in globals.css plays when switching themes.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
