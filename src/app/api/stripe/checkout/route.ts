import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

import { isSameOrigin } from "@/lib/http";
import { getStripe, PLUS_PRICE_ID, PREMIUM_PRICE_ID } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
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

  const body = await req.json().catch(() => ({}));
  const plan = body?.plan === "plus" ? "plus" : "pro";
  const priceId = plan === "plus" ? PLUS_PRICE_ID : PREMIUM_PRICE_ID;

  if (!priceId) {
    return NextResponse.json(
      { error: "El pago no está configurado para este plan." },
      { status: 500 },
    );
  }

  const stripe = getStripe();
  const supabase = getSupabaseAdmin();
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? undefined;
  const profile = await getOrCreateProfile(userId, email);

  // Reuse the Stripe customer if we already created one for this user.
  let customerId = profile.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email,
      metadata: { clerk_user_id: userId },
    });
    customerId = customer.id;
    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", userId);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    locale: "es",
    success_url: `${SITE.url}/dashboard?upgraded=1`,
    cancel_url: `${SITE.url}/pricing?canceled=1`,
    subscription_data: { metadata: { clerk_user_id: userId, plan } },
    metadata: { clerk_user_id: userId, plan },
  });

  return NextResponse.json({ url: session.url });
}
