import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { isStripeConfigured, isSupabaseConfigured } from "@/lib/config";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import type Stripe from "stripe";

const PLAN_LIMITS: Record<string, number> = {
  starter: 50,
  pro: 250,
  agency: 1000,
};

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createSupabaseAdmin(url, serviceKey);
}

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Only process if Supabase is configured (to update user profiles)
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Acknowledge the webhook even if we can't update the DB
    return NextResponse.json({ received: true });
  }

  const supabase = getSupabaseAdmin();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const plan = session.metadata?.plan;
      const customerEmail = session.customer_details?.email;
      const customerId = session.customer as string;

      if (plan && customerEmail) {
        await supabase
          .from("profiles")
          .update({
            plan,
            stripe_customer_id: customerId,
            generations_limit: PLAN_LIMITS[plan] ?? 50,
          })
          .eq("email", customerEmail);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      if (subscription.status === "active") {
        // Subscription renewed / updated — keep active
      } else if (
        subscription.status === "canceled" ||
        subscription.status === "unpaid"
      ) {
        // Downgrade to free
        await supabase
          .from("profiles")
          .update({
            plan: "free",
            generations_limit: 3,
          })
          .eq("stripe_customer_id", customerId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await supabase
        .from("profiles")
        .update({
          plan: "free",
          generations_limit: 3,
        })
        .eq("stripe_customer_id", customerId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
