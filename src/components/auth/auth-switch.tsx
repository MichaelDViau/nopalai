"use client";

import Link from "next/link";

import { useLanguage } from "@/components/i18n/language-provider";

/** Localized "don't have an account / already have one" link under auth forms. */
export function AuthSwitch({ variant }: { variant: "sign-in" | "sign-up" }) {
  const { t } = useLanguage();

  if (variant === "sign-in") {
    return (
      <p className="mt-8 text-sm text-muted-foreground">
        {t.auth.noAccount}{" "}
        <Link
          href="/sign-up"
          className="font-medium text-primary hover:underline"
        >
          {t.auth.startFree}
        </Link>
      </p>
    );
  }

  return (
    <p className="mt-8 text-sm text-muted-foreground">
      {t.auth.haveAccount}{" "}
      <Link href="/sign-in" className="font-medium text-primary hover:underline">
        {t.auth.signIn}
      </Link>
    </p>
  );
}
