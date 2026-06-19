"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Languages, MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/components/language-provider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors",
        scrolled ? "glass border-b border-border" : "border-b border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label="NopalAI inicio">
          <Logo />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={t.nav.language}
          >
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{t.nav.language}</span>
          </Button>
          <ThemeToggle />
          <Button size="sm" asChild className="gap-1.5">
            <Link href="/sign-in">{t.nav.signIn}</Link>
          </Button>
          <Button size="sm" asChild className="gap-1.5">
            <Link href="/dashboard">
              <MessageSquare className="h-4 w-4" />
              {t.nav.chat}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
