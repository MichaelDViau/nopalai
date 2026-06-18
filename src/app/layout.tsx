import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";

import { SITE } from "@/lib/constants";
import { DICT, HTML_LANG } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang";
import { AppProviders } from "@/components/app-providers";
import { Toaster } from "@/components/ui/sonner";
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

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  const t = DICT[lang];
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} — ${t.tagline}`,
      template: `%s · ${SITE.name}`,
    },
    description: t.meta.description,
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
      title: `${SITE.name} — ${t.tagline}`,
      description: t.meta.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE.name} — ${t.tagline}`,
      description: t.meta.description,
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
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = await getServerLang();

  return (
    <ClerkProvider
      localization={esMX}
      appearance={{
        variables: {
          colorPrimary: "#1c825b",
          borderRadius: "0.75rem",
        },
      }}
    >
      <html
        lang={HTML_LANG[lang]}
        suppressHydrationWarning
        className={`${inter.variable} ${sora.variable}`}
      >
        <body className="min-h-dvh bg-background font-sans">
          <AppProviders initialLang={lang}>{children}</AppProviders>
          <Toaster position="top-center" richColors />
          <GoogleAnalytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
