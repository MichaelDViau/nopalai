import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";

import { SITE } from "@/lib/constants";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    creator: SITE.twitter,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#13160f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      localization={esMX}
      appearance={{
        variables: {
          colorPrimary: "#3f5b45",
          borderRadius: "0.5rem",
        },
      }}
    >
      <html
        lang="es-419"
        className={`${inter.variable} ${sora.variable}`}
        suppressHydrationWarning
      >
        <body className="min-h-dvh bg-background font-sans">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <PostHogProvider>{children}</PostHogProvider>
            <Toaster position="top-center" richColors />
          </ThemeProvider>
          <GoogleAnalytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
