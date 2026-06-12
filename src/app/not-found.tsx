import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <Logo />
      <h1 className="mt-10 text-7xl font-bold tracking-tight text-primary">
        404
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Esta página se perdió en el desierto.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </main>
  );
}
