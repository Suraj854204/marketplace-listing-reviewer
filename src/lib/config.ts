/**
 * Runtime configuration helpers.
 * These check whether external services (Supabase, Stripe) are actually
 * configured via environment variables so the app can gracefully degrade
 * to demo / waitlist mode when keys are missing.
 */

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url && url !== "your-url-here" && key && key !== "your-key-here"
  );
}

export function isStripeConfigured(): boolean {
  if (typeof window !== "undefined") {
    // Client-side: check publishable key
    const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    return Boolean(pk && pk !== "your-key-here");
  }
  // Server-side: check secret key
  const sk = process.env.STRIPE_SECRET_KEY;
  return Boolean(sk && sk !== "your-key-here");
}
