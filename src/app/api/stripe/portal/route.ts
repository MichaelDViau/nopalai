import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { isSameOrigin } from "@/lib/http";
import { getStripe } from "@/lib/stripe";
import { getOrCreateProfile } from "@/lib/profile";
import { SITE } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const profile = await getOrCreateProfile(userId);
  if (!profile.stripe_customer_id) {
    return NextResponse.json(
      { error: "No tienes una suscripción activa." },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${SITE.url}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}
