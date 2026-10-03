import { NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { isStripeConfigured, isSupabaseConfigured } from "@/lib/config";

type PlanKey = keyof typeof PLANS;

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Payments are not configured yet. Join the waitlist!" },
      { status: 503 }
    );
  }

  try {
    const { plan } = (await request.json()) as { plan: string };

    if (!plan || !PLANS[plan as PlanKey]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const selectedPlan = PLANS[plan as PlanKey];

    // Try to get the user's email for pre-filling checkout
    let customerEmail: string | undefined;
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        customerEmail = user?.email ?? undefined;
      } catch {
        // No user session — proceed without email
      }
    }

    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      success_url: `${origin}/dashboard?checkout=success&plan=${plan}`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      metadata: {
        plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
