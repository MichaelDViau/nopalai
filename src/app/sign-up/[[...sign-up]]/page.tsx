import type { Metadata } from "next";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

import { Logo } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Crear cuenta gratis",
  description:
    "Crea tu cuenta gratis en NopalAI y empieza a usar la IA que entiende LATAM.",
  robots: { index: false, follow: true },
};

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
      <p className="mt-8 text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </main>
  );
}
