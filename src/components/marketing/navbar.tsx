"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

const NAV_LINKS = [
  { href: "/#assistants", label: "Asistentes" },
  { href: "/pricing", label: "Precios" },
];

export function Navbar() {
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
        "sticky top-0 z-50 w-full bg-background transition-colors",
        scrolled ? "border-b border-border" : "border-b border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label="NopalAI inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side — direct access to the AI chat */}
        <div className="flex items-center gap-2">
          <SignedOut>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:inline-flex"
            >
              <Link href="/sign-in">Entrar</Link>
            </Button>
          </SignedOut>
          <Button asChild className="gap-1.5">
            <Link href="/dashboard">
              <MessageSquare className="h-4 w-4" />
              Abrir chat
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
