import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

import { isSameOrigin } from "@/lib/http";
import { getStripe, priceIdForPlan } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getOrCreateProfile } from "@/lib/profile";
import { SITE, type PaidPlanId } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Which paid plan to check out (defaults to Plus). Body is optional.
  const body = await req.json().catch(() => ({}));
  const plan: PaidPlanId = body?.plan === "pro" ? "pro" : "plus";
  const priceId = priceIdForPlan(plan);

  if (!priceId) {
    return NextResponse.json(
      { error: "El pago de este plan no está configurado." },
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
    // Persist the chosen tier on the subscription so the webhook can map
    // it back to plus/pro for every future subscription event.
    subscription_data: { metadata: { clerk_user_id: userId, plan } },
    metadata: { clerk_user_id: userId, plan },
  });

  return NextResponse.json({ url: session.url });
}
