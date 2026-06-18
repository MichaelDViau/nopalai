"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button, type ButtonProps } from "@/components/ui/button";
import { track, EVENTS } from "@/lib/analytics";
import { useLanguage } from "@/components/i18n/language-provider";

interface UpgradeButtonProps extends ButtonProps {
  label?: string;
  source?: string;
}

export function UpgradeButton({
  label,
  source = "pricing",
  ...props
}: UpgradeButtonProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    track(EVENTS.UPGRADE_CLICKED, { source });

    if (!isSignedIn) {
      router.push("/sign-up?redirect_url=/pricing");
      return;
    }

    try {
      setLoading(true);
      track(EVENTS.CHECKOUT_STARTED, { source });
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || t.dashboard.toasts.genError);
      }
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t.dashboard.toasts.genError,
      );
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleUpgrade} disabled={loading} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {label ?? t.dashboard.upgrade.cta}
    </Button>
  );
}
