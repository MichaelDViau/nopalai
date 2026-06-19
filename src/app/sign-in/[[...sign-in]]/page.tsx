import type { Metadata } from "next";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

import { Logo } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión en NopalAI, la inteligencia artificial para Latinoamérica.",
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center bg-secondary/30 px-4 py-12">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg border border-border rounded-xl",
          },
        }}
      />
      <p className="mt-8 text-sm text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <Link href="/sign-up" className="font-medium text-primary hover:underline">
          Comienza gratis
        </Link>
      </p>
    </main>
  );
}
