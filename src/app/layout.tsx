import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";

import { SITE } from "@/lib/constants";
import { AppProviders } from "@/components/app-providers";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import "./globals.css";

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
  themeColor: SITE.brandColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const page = (
    <html lang="es-MX" suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans">
        <AppProviders>{children}</AppProviders>
        <Toaster position="top-center" richColors />
        <GoogleAnalytics />
      </body>
    </html>
  );

  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return page;
  }

  return (
    <ClerkProvider
      localization={esMX}
      appearance={{
        variables: {
          colorPrimary: SITE.brandColor,
          borderRadius: "0.75rem",
        },
      }}
    >
      {page}
    </ClerkProvider>
  );
}
