import type { Metadata } from "next";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

import { Logo } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Crear cuenta gratis",
  description:
    "Crea tu cuenta gratis en NopalAI y empieza a usar la IA que entiende México.",
  robots: { index: false, follow: true },
};

export default function SignUpPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl border border-border rounded-2xl",
          },
        }}
      />
      <p className="mt-8 text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </main>
  );
}
