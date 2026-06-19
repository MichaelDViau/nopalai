"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { GooglePlayIcon, AppleIcon } from "@/components/brand/store-icons";
import { SITE } from "@/lib/constants";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();
  const links = [
    { href: "/legal/privacidad", label: t.footer.privacy },
    { href: "/legal/terminos", label: t.footer.terms },
  ];

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <Link href="/" aria-label="NopalAI inicio"><Logo /></Link>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</Link>)}
          </nav>
        </div>

        {/* App download. TODO: replace the empty hrefs with the Play Store /
            App Store URLs once the apps are published. */}
        <div className="mt-8 flex flex-col items-center gap-2 border-t border-border pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-muted-foreground">{t.hero.downloadApp}</p>
          <div className="flex items-center gap-4">
            <a
              href=""
              onClick={(e) => e.preventDefault()}
              aria-label="Android"
              className="glass inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-semibold text-primary transition hover:border-primary/40 hover:shadow-sm"
            >
              Android
              <GooglePlayIcon className="h-4 w-4" />
            </a>
            <a
              href=""
              onClick={(e) => e.preventDefault()}
              aria-label="Apple"
              className="glass inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-semibold text-primary transition hover:border-primary/40 hover:shadow-sm"
            >
              Apple
              <AppleIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground sm:text-left">© {new Date().getFullYear()} {SITE.name} · {SITE.tagline} · {t.footer.made}</p>
      </div>
    </footer>
  );
}
