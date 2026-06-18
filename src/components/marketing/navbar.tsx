"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { useLanguage } from "@/components/i18n/language-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageToggle } from "@/components/i18n/language-toggle";

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

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
        <Link href="/" aria-label={`NopalAI ${t.nav.home}`}>
          <Logo />
        </Link>

        {/* Right side — controls + direct access to the AI chat */}
        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <SignedOut>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:inline-flex"
            >
              <Link href="/sign-in">{t.nav.signIn}</Link>
            </Button>
          </SignedOut>
          <Button asChild className="gap-1.5">
            <Link href="/dashboard">
              <MessageSquare className="h-4 w-4" />
              {t.nav.openChat}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
