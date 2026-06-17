"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button, type ButtonProps } from "@/components/ui/button";
import { track, EVENTS } from "@/lib/analytics";
import type { PaidPlanId } from "@/lib/constants";

interface UpgradeButtonProps extends ButtonProps {
  label?: string;
  source?: string;
  /** Which paid plan this button checks out. */
  plan?: PaidPlanId;
}

export function UpgradeButton({
  label = "Mejorar",
  source = "pricing",
  plan = "plus",
  ...props
}: UpgradeButtonProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    track(EVENTS.UPGRADE_CLICKED, { source, plan });

    if (!isSignedIn) {
      router.push("/sign-up?redirect_url=/pricing");
      return;
    }

    try {
      setLoading(true);
      track(EVENTS.CHECKOUT_STARTED, { source, plan });
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo iniciar el pago");
      }
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Algo salió mal. Intenta de nuevo.",
      );
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleUpgrade} disabled={loading} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}
