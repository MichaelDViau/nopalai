import type { Metadata } from "next";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

import { DICT } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang";
import { Logo } from "@/components/brand/logo";
import { AuthSwitch } from "@/components/auth/auth-switch";

export async function generateMetadata(): Promise<Metadata> {
  const t = DICT[await getServerLang()];
  return {
    title: t.meta.signUpTitle,
    description: t.meta.signUpDescription,
    robots: { index: false, follow: true },
  };
}

export default function SignUpPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center bg-secondary/30 px-4 py-12">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg border border-border rounded-xl",
          },
        }}
      />
      <AuthSwitch variant="sign-up" />
    </main>
  );
}
