import type { Metadata } from "next";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Crear cuenta gratis",
  description:
    "Crea tu cuenta gratis en NopalAI y empieza a usar la IA que entiende Latinoamérica.",
  robots: { index: false, follow: true },
};

export default function SignUpPage() {
  return (
    <AuthShell
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary hover:underline"
          >
            Inicia sesión
          </Link>
        </>
      }
    >
      <SignUp
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
