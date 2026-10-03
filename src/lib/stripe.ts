import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || key === "your-key-here") {
      throw new Error("Stripe is not configured");
    }
    _stripe = new Stripe(key, { typescript: true });
  }
  return _stripe;
}

// Keep backward-compatible export for existing code
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const PLANS = {
  starter: { name: "Starter", price: 2900, listings: 50, priceId: process.env.STRIPE_STARTER_PRICE_ID! },
  pro: { name: "Pro", price: 7900, listings: 250, priceId: process.env.STRIPE_PRO_PRICE_ID! },
  agency: { name: "Agency", price: 19900, listings: 1000, priceId: process.env.STRIPE_AGENCY_PRICE_ID! },
} as const;
