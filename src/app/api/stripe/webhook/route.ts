import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getStripe, planForPriceId } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { Plan } from "@/types/database";

export const runtime = "nodejs";
// Stripe needs the raw body to verify the signature.
export const dynamic = "force-dynamic";

/** Resolve which paid tier a subscription represents, from its price. */
function planFromSubscription(sub: Stripe.Subscription): "plus" | "pro" {
  const byPrice = planForPriceId(sub.items.data[0]?.price?.id);
  if (byPrice) return byPrice;
  const meta = sub.metadata?.plan;
  return meta === "pro" || meta === "plus" ? meta : "plus";
}

async function setPlanByCustomer(
  customerId: string,
  data: {
    plan: Plan;
    subscription_status: string | null;
    stripe_subscription_id: string | null;
    current_period_end: string | null;
  },
) {
  const supabase = getSupabaseAdmin();
  await supabase
    .from("profiles")
    .update(data)
    .eq("stripe_customer_id", customerId);
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");

  if (!secret || !signature) {
    return NextResponse.json(
      { error: "Webhook no configurado" },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "firma inválida";
    return NextResponse.json(
      { error: `Webhook inválido: ${message}` },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription" && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(
            session.subscription as string,
          );
          await setPlanByCustomer(sub.customer as string, {
            plan: planFromSubscription(sub),
            subscription_status: sub.status,
            stripe_subscription_id: sub.id,
            current_period_end: new Date(
              sub.current_period_end * 1000,
            ).toISOString(),
          });
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const active = sub.status === "active" || sub.status === "trialing";
        await setPlanByCustomer(sub.customer as string, {
          plan: active ? planFromSubscription(sub) : "free",
          subscription_status: sub.status,
          stripe_subscription_id: sub.id,
          current_period_end: new Date(
            sub.current_period_end * 1000,
          ).toISOString(),
        });
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await setPlanByCustomer(sub.customer as string, {
          plan: "free",
          subscription_status: "canceled",
          stripe_subscription_id: null,
          current_period_end: null,
        });
        break;
      }

      default:
        // Unhandled event types are acknowledged with 200.
        break;
    }
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return NextResponse.json(
      { error: "Error procesando el evento" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
