"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { GooglePlayIcon, AppleIcon } from "@/components/brand/store-icons";
import { SITE } from "@/lib/constants";
import { FEATURED_LANDING_SLUGS, getLandingPage } from "@/lib/landing-pages";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();

  const solutions = FEATURED_LANDING_SLUGS.map((slug) => getLandingPage(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  const productLinks = [
    { href: "/", label: t.footer.home },
    { href: "/soluciones", label: t.footer.solutions },
    { href: "/pricing", label: t.footer.pricing },
  ];

  const legalLinks = [
    { href: "/legal/privacidad", label: t.footer.privacy },
    { href: "/legal/terminos", label: t.footer.terms },
  ];

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12">
        {/* Link columns — site-wide internal linking + brand. */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" aria-label="NopalAI inicio">
              <Logo />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">{SITE.tagline}</p>
          </div>

          <FooterColumn title={t.footer.solutions}>
            {solutions.map((page) => (
              <FooterLink key={page.slug} href={`/${page.slug}`} label={page.h1} />
            ))}
            <FooterLink href="/soluciones" label={t.footer.allSolutions} />
          </FooterColumn>

          <FooterColumn title={t.footer.product}>
            {productLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </FooterColumn>

          <FooterColumn title={t.footer.legal}>
            {legalLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </FooterColumn>
        </div>

        {/* App download. TODO: replace the empty hrefs with the Play Store /
            App Store URLs once the apps are published. */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-border pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
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

        <p className="mt-8 text-center text-xs text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} {SITE.name} · {SITE.tagline} · {t.footer.made}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <ul className="mt-3 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
      </Link>
    </li>
  );
}
