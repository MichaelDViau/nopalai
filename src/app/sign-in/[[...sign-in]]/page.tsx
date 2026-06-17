import type { Metadata } from "next";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión en NopalAI, la IA que entiende Latinoamérica.",
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <AuthShell
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary hover:underline"
          >
            Comienza gratis
          </Link>
        </>
      }
    >
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-sm",
            card: "shadow-none border-0 bg-transparent",
          },
        }}
      />
    </AuthShell>
  );
}
