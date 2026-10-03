"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { isStripeConfigured } from "@/lib/config";

const SPOTS_TOTAL = 500;
const SPOTS_CLAIMED = 347;

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    planKey: null,
    perListing: "Free",
    description: "Try it out — no account needed.",
    features: [
      "3 AI-generated listings/day",
      "All 4 marketplaces (Amazon, Etsy, Shopify, eBay)",
      "Standard quality output",
      "SEO optimization included",
      "Copy-to-clipboard",
      "CSV export",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    planKey: "starter",
    perListing: "~$0.29/listing",
    description: "For sellers scaling across marketplaces.",
    features: [
      "Unlimited AI-generated listings",
      "Enhanced quality prompts",
      "All 4 marketplaces",
      "SEO optimization included",
      "Bulk CSV processing",
      "CSV export",
      "Generation history",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$79",
    period: "/mo",
    planKey: "pro",
    perListing: "~$0.08/listing",
    description: "For teams and agencies managing multiple brands.",
    features: [
      "Everything in Pro",
      "Team access (up to 5 members)",
      "Custom brand voice profiles",
      "API access",
      "Bulk processing (1000+/day)",
      "Dedicated account manager",
    ],
    cta: "Start Business Trial",
    highlighted: false,
  },
];

const comparisonFeatures = [
  { name: "Daily listings", free: "3/day", pro: "Unlimited", business: "Unlimited" },
  { name: "Marketplaces", free: "4", pro: "4", business: "4" },
  { name: "Output quality", free: "Standard", pro: "Enhanced", business: "Enhanced" },
  { name: "SEO optimization", free: true, pro: true, business: true },
  { name: "Copy-to-clipboard", free: true, pro: true, business: true },
  { name: "CSV export", free: true, pro: true, business: true },
  { name: "Bulk CSV processing", free: false, pro: true, business: true },
  { name: "Generation history", free: false, pro: true, business: true },
  { name: "BYOK (own API key)", free: "10/day", pro: "Not needed", business: "Not needed" },
  { name: "Custom brand voice", free: false, pro: false, business: true },
  { name: "Team members", free: "1", pro: "1", business: "Up to 5" },
  { name: "API access", free: false, pro: false, business: true },
  { name: "Support", free: "Community", pro: "Priority", business: "Dedicated manager" },
  { name: "Avg. cost per listing", free: "Free (limited)", pro: "$0.29", business: "$0.08" },
];

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function PricingPage() {
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stripeReady = isStripeConfigured();

  const handleCheckout = async (planKey: string) => {
    setError(null);
    setLoadingPlan(planKey);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoadingPlan(null);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Failed to start checkout. Please try again.");
      setLoadingPlan(null);
    }
  };

  function renderCTA(plan: typeof plans[number]) {
    if (plan.planKey === null) {
      return (
        <Link
          href="/generate"
          className="block w-full rounded-xl py-3 text-center text-sm font-semibold border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all duration-200"
        >
          {plan.cta}
        </Link>
      );
    }
    if (stripeReady) {
      return (
        <button
          onClick={() => handleCheckout(plan.planKey!)}
          disabled={loadingPlan === plan.planKey}
          className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            plan.highlighted
              ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25"
              : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {loadingPlan === plan.planKey ? "Redirecting..." : plan.cta}
        </button>
      );
    }
    if (user) {
      return (
        <button
          disabled
          className="block w-full rounded-xl py-3 text-center text-sm font-semibold border border-slate-300 bg-slate-50 text-slate-400 cursor-not-allowed"
        >
          Coming Soon
        </button>
      );
    }
    return (
      <Link
        href="/#waitlist"
        className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 ${
          plan.highlighted
            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25"
            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        Join Waitlist
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Invest less than a single Fiverr listing
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Pro pays for itself with your first 8 listings. Start free, upgrade when you need more.
          </p>
        </div>

        {/* Urgency bar */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
            <p className="text-sm font-medium text-amber-800">
              Launch pricing — <span className="font-bold">{SPOTS_TOTAL - SPOTS_CLAIMED}</span> of {SPOTS_TOTAL} Pro spots remaining at $29/mo
            </p>
            <div className="mt-2 h-2 rounded-full bg-amber-200 overflow-hidden">
              <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${(SPOTS_CLAIMED / SPOTS_TOTAL) * 100}%` }} />
            </div>
          </div>
        </div>

        {error && (
          <div className="mx-auto mt-8 max-w-md rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Plan Cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition-all duration-200 ${
                plan.highlighted
                  ? "border-indigo-600 bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-600 scale-105"
                  : "border-slate-200 bg-white shadow-sm hover:shadow-md"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-sm text-slate-500">{plan.period}</span>}
                </div>
                <p className="mt-1 text-sm font-medium text-green-600">{plan.perListing}</p>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              {renderCTA(plan)}
            </div>
          ))}
        </div>

        {/* Cost Comparison */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-lg font-semibold text-slate-900 text-center mb-6">Cost per listing breakdown</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">Fiverr / Upwork</p>
                <p className="text-3xl font-bold text-red-600">$2-$5</p>
                <p className="text-xs text-slate-400 mt-1">per listing + revisions</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">QuickList AI Pro</p>
                <p className="text-3xl font-bold text-indigo-600">$0.29</p>
                <p className="text-xs text-slate-400 mt-1">per listing (100/mo avg)</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">QuickList Business</p>
                <p className="text-3xl font-bold text-green-600">$0.08</p>
                <p className="text-xs text-slate-400 mt-1">per listing (1000/mo avg)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mx-auto mt-16 max-w-5xl">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Full feature comparison</h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700">Feature</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-slate-700">Free</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-indigo-700 bg-indigo-50">Pro</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-slate-700">Business</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr key={feature.name} className={i < comparisonFeatures.length - 1 ? "border-b border-slate-100" : ""}>
                    <td className="py-3.5 px-6 text-sm text-slate-700">{feature.name}</td>
                    <td className="py-3.5 px-6 text-center text-sm">
                      {typeof feature.free === "boolean" ? (feature.free ? <div className="flex justify-center"><CheckIcon /></div> : <div className="flex justify-center"><XIcon /></div>) : <span className="text-slate-600">{feature.free}</span>}
                    </td>
                    <td className="py-3.5 px-6 text-center text-sm bg-indigo-50/50">
                      {typeof feature.pro === "boolean" ? (feature.pro ? <div className="flex justify-center"><CheckIcon /></div> : <div className="flex justify-center"><XIcon /></div>) : <span className="font-medium text-indigo-700">{feature.pro}</span>}
                    </td>
                    <td className="py-3.5 px-6 text-center text-sm">
                      {typeof feature.business === "boolean" ? (feature.business ? <div className="flex justify-center"><CheckIcon /></div> : <div className="flex justify-center"><XIcon /></div>) : <span className="text-slate-600">{feature.business}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Frequently asked questions</h3>
          <div className="space-y-6">
            {[
              { q: "What is BYOK (Bring Your Own Key)?", a: "BYOK lets you use your own Google Gemini API key for AI generation. Free BYOK users get 10 generations per day with standard quality output. Pro users don't need BYOK — they get unlimited enhanced quality listings." },
              { q: "What's the difference between Standard and Enhanced quality?", a: "Standard quality uses basic prompts that generate good listings. Enhanced quality (Pro+) uses advanced, marketplace-specific prompts that include competitor analysis, keyword optimization, and conversion-focused copywriting techniques." },
              { q: "Can I cancel anytime?", a: "Yes, all paid plans come with a 7-day free trial. Cancel anytime with no questions asked. You'll keep access until the end of your billing period." },
              { q: "What happens after the 500 Pro spots are filled?", a: "After launch pricing ends, Pro will increase to $49/mo. Lock in $29/mo now and keep that price forever as long as your subscription is active." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-slate-200 bg-white p-6">
                <h4 className="font-semibold text-slate-900">{faq.q}</h4>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-slate-400">
          {stripeReady
            ? "All paid plans include a 7-day free trial. Cancel anytime."
            : "Pro and Business plans coming soon. Free tier available now — start generating!"}
        </p>
      </main>
    </div>
  );
}
