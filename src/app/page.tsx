"use client";

import { useState } from "react";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

/* ---------- data (unchanged) ---------- */

const outcomes = [
  {
    title: "35% Higher Click-Through Rate",
    description: "AI-optimized titles and descriptions that match each marketplace's algorithm, driving more eyes to your products.",
    icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Save 2+ Hours Per Listing",
    description: "Stop writing the same product 4 different ways. Generate all marketplace versions in under 30 seconds.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "4 Marketplaces, 1 Click",
    description: "Amazon, Etsy, Shopify, and eBay listings tailored to each platform's SEO requirements simultaneously.",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  },
  {
    title: "Built-In SEO That Ranks",
    description: "Every listing includes meta titles, descriptions, keywords, and image alt text optimized for marketplace search.",
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605",
  },
];

const plans = [
  { name: "Free", price: "$0", period: "", perListing: "", listings: "3/day", description: "Try it out — no account needed.", features: ["3 AI-generated listings/day", "All 4 marketplaces", "Standard quality output", "SEO optimization", "Copy-to-clipboard"], cta: "Start Free", highlighted: false },
  { name: "Pro", price: "$29", period: "/mo", perListing: "$0.29/listing", listings: "Unlimited", description: "For sellers scaling across marketplaces.", features: ["Unlimited listings", "Enhanced quality prompts", "All 4 marketplaces", "Bulk CSV processing", "Generation history", "Priority support"], cta: "Start Pro Trial", highlighted: true },
  { name: "Business", price: "$79", period: "/mo", perListing: "$0.08/listing", listings: "Unlimited+", description: "For teams and agencies.", features: ["Everything in Pro", "Team access (5 members)", "Custom brand voice", "API access", "Dedicated support"], cta: "Contact Sales", highlighted: false },
];

const SPOTS_TOTAL = 500;
const SPOTS_CLAIMED = 347;

/* ---------- UI-only data ---------- */

const MARKETS = [
  { key: "Amazon", dot: "bg-amber-500", title: "Premium Bamboo Wireless Charging Pad — 15W Fast Charge, Qi-Certified, Eco-Friendly Design for iPhone 15/14/13 & Samsung Galaxy S24/S23", note: "Keyword-rich, up to 200 characters" },
  { key: "Etsy", dot: "bg-orange-500", title: "Bamboo Wireless Charger, Eco Friendly Desk Gift, 15W Fast Charging Pad, Sustainable Tech Accessory, Handcrafted Look", note: "Gift-minded tags and a handmade feel" },
  { key: "Shopify", dot: "bg-emerald-500", title: "Bamboo Wireless Charging Pad | 15W Fast Qi Charger", note: "Short, brand-friendly, search-ready" },
  { key: "eBay", dot: "bg-sky-500", title: "Bamboo Wireless Charger 15W Qi Fast Charging Pad iPhone Samsung Eco NEW", note: "Packed into 80 characters" },
];

const steps = [
  { title: "Describe your product", text: "Name, category and key features. Takes about a minute." },
  { title: "Generate", text: "Four tailored listings, with SEO metadata, in about 30 seconds." },
  { title: "Copy or export", text: "Copy each field, or download everything as CSV." },
];

const faqs = [
  { q: "Do I need an account to try it?", a: "No. You get 3 free generations a day with no account and no credit card." },
  { q: "How are the four listings different?", a: "Each one follows its marketplace's conventions: title length, keyword style, tone and structure. Amazon gets keyword-dense titles, Etsy gets gift and style tags, Shopify gets clean SEO copy, eBay gets compact, search-focused titles." },
  { q: "Can I use my own AI key?", a: "Yes. Add your own API key in the generator for 10 generations a day at standard quality. It's stored locally in your browser." },
  { q: "What do I get with Pro?", a: "Unlimited listings, enhanced quality prompts, bulk CSV processing and generation history." },
  { q: "Can I edit the results?", a: "Yes. Everything is plain text you can copy and adjust before you publish." },
];

const testimonials = [
  { quote: "QuickList AI cut my listing time from 2 hours to 5 minutes. The Amazon-optimized titles alone boosted my click-through rate by 35%.", name: "Sarah M.", role: "Etsy & Amazon Seller" },
  { quote: "I run a Shopify store with 200+ products. Bulk processing all my listings at once was a game-changer. The SEO keywords are spot-on.", name: "James K.", role: "Shopify Store Owner" },
  { quote: "Finally a tool that understands each marketplace is different. My eBay listings read differently from my Etsy ones, and that's exactly what I needed.", name: "Maria L.", role: "Multi-Platform Seller" },
];

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}
const CHECK = "M5 13l4 4L19 7";
const CROSS = "M6 18L18 6M6 6l12 12";

/* ---------- ROI calculator (logic unchanged, UI refreshed) ---------- */

function ROICalculator() {
  const [listingsPerMonth, setListingsPerMonth] = useState(20);
  const manualMinutes = 45;
  const quicklistMinutes = 2;
  const hoursSaved = Math.round((listingsPerMonth * (manualMinutes - quicklistMinutes)) / 60);
  const moneySavedFiverr = listingsPerMonth * 4; // avg $4/listing on Fiverr
  const proMonthlyCost = 29;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-lg font-semibold text-stone-900">How much could you save?</h3>
      <p className="mb-6 mt-1 text-sm text-stone-500">Set how many listings you write each month.</p>
      <div className="mb-3 flex items-baseline justify-between">
        <label htmlFor="roi" className="text-sm font-medium text-stone-700">Listings per month</label>
        <span className="text-3xl font-bold tabular-nums text-indigo-600">{listingsPerMonth}</span>
      </div>
      <input
        id="roi"
        type="range"
        min={5}
        max={200}
        value={listingsPerMonth}
        onChange={(e) => setListingsPerMonth(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-indigo-600"
      />
      <div className="mt-3 flex gap-2">
        {[10, 25, 50, 100].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setListingsPerMonth(n)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${listingsPerMonth === n ? "bg-stone-900 text-white" : "border border-stone-200 text-stone-600 hover:bg-stone-100"}`}
          >
            {n}
          </button>
        ))}
      </div>
      <dl className="mt-6 grid grid-cols-3 divide-x divide-stone-200 rounded-2xl bg-stone-50 py-5 text-center">
        <div className="px-2">
          <dd className="text-2xl font-bold tabular-nums text-stone-900">{hoursSaved}h</dd>
          <dt className="mt-1 text-xs text-stone-500">Hours saved a month</dt>
        </div>
        <div className="px-2">
          <dd className="text-2xl font-bold tabular-nums text-emerald-600">${moneySavedFiverr}</dd>
          <dt className="mt-1 text-xs text-stone-500">Saved vs. Fiverr</dt>
        </div>
        <div className="px-2">
          <dd className="text-2xl font-bold tabular-nums text-indigo-600">{Math.round(moneySavedFiverr / proMonthlyCost)}x</dd>
          <dt className="mt-1 text-xs text-stone-500">Return on Pro</dt>
        </div>
      </dl>
      <p className="mt-4 text-center text-xs text-stone-400">Based on 45 minutes per manual listing and $4 per listing on freelancer platforms.</p>
    </div>
  );
}

/* ---------- Live preview card in the hero ---------- */

function HeroPreview() {
  const [i, setI] = useState(0);
  const m = MARKETS[i];
  return (
    <div className="rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-900/5">
      <div className="flex gap-1 border-b border-stone-100 p-2" role="tablist">
        {MARKETS.map((t, idx) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={idx === i}
            onClick={() => setI(idx)}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${idx === i ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100"}`}
          >
            <span className={`h-2 w-2 rounded-full ${t.dot}`} />
            {t.key}
          </button>
        ))}
      </div>
      <div className="space-y-4 p-6">
        <p className="text-xs text-stone-500">Bamboo Wireless Charging Pad · sample output</p>
        <p className="min-h-[5.5rem] text-lg font-medium leading-snug text-stone-900">{m.title}</p>
        <div className="flex items-center justify-between border-t border-stone-100 pt-4 text-xs text-stone-500">
          <span>{m.note}</span>
          <span className="tabular-nums">{m.title.length} characters</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-stone-50 pb-20 text-stone-900 sm:pb-0">
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-sm font-medium text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Launch pricing: {SPOTS_TOTAL - SPOTS_CLAIMED} of {SPOTS_TOTAL} Pro spots left
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Sellers report 35% higher CTR and save 2+ hours per listing
          </h1>
          <p className="mt-6 max-w-xl text-lg text-stone-600">
            QuickList AI writes optimized product listings for Amazon, Etsy, Shopify and eBay at the same time. Enter your product once and get a version tailored to each marketplace in seconds.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/generate" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30">
              Generate your first listing free
              <Icon d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-7 py-3.5 text-base font-semibold text-stone-700 transition hover:bg-stone-100">
              See pricing
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500">
            {["No credit card required", "3 free listings a day", "Results in 30 seconds"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Icon d={CHECK} className="h-4 w-4 text-emerald-600" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <HeroPreview />
      </section>

      {/* How it works */}
      <section className="border-y border-stone-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">From product details to four listings in three steps</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s, idx) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">{idx + 1}</span>
                <div>
                  <h3 className="font-semibold text-stone-900">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-500">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See the difference AI makes</h2>
            <p className="mt-3 text-lg text-stone-500">Same product, written two ways.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-stone-200 bg-white p-7">
              <h3 className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-600">
                <Icon d={CROSS} className="h-3.5 w-3.5 text-red-500" /> Written by hand
              </h3>
              <h4 className="mt-6 text-xs font-medium text-stone-400">Amazon title</h4>
              <p className="mt-1 text-sm text-stone-600">Bamboo Wireless Charger - Fast Charging Pad for iPhone and Samsung</p>
              <h4 className="mt-5 text-xs font-medium text-stone-400">Description</h4>
              <p className="mt-1 text-sm text-stone-500">This is a wireless charger made of bamboo. Works with iPhone and Samsung phones. Fast charging supported. Eco-friendly material.</p>
              <h4 className="mt-5 text-xs font-medium text-stone-400">Bullet points</h4>
              <ul className="mt-2 space-y-1.5 text-sm text-stone-500">
                {["Fast charging", "Made of bamboo", "Works with most phones"].map((b) => (
                  <li key={b} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-300" />{b}</li>
                ))}
              </ul>
              <p className="mt-6 border-t border-stone-100 pt-4 text-xs text-stone-500">About 45 minutes to write · Generic copy · No SEO keywords</p>
            </article>
            <article className="rounded-3xl border-2 border-indigo-600 bg-white p-7 shadow-xl shadow-indigo-600/10">
              <h3 className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                <Icon d={CHECK} className="h-3.5 w-3.5" /> Written by QuickList AI
              </h3>
              <h4 className="mt-6 text-xs font-medium text-stone-400">Amazon title</h4>
              <p className="mt-1 text-sm font-medium text-stone-900">Premium Bamboo Wireless Charging Pad — 15W Fast Charge, Qi-Certified, Eco-Friendly Design for iPhone 15/14/13 &amp; Samsung Galaxy S24/S23</p>
              <h4 className="mt-5 text-xs font-medium text-stone-400">Description</h4>
              <p className="mt-1 text-sm text-stone-700">Transform your desk with the perfect blend of sustainability and technology. Our premium bamboo wireless charging pad delivers 15W fast charging while making a statement about your commitment to eco-conscious living. Qi-certified for universal compatibility.</p>
              <h4 className="mt-5 text-xs font-medium text-stone-400">Bullet points</h4>
              <ul className="mt-2 space-y-1.5 text-sm text-stone-700">
                {[
                  "15W FAST CHARGING — Charge up to 50% faster than standard 5W pads",
                  "SUSTAINABLY SOURCED BAMBOO — FSC-certified natural bamboo construction",
                  "UNIVERSAL QI COMPATIBILITY — Works with all Qi-enabled devices",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />{b}</li>
                ))}
              </ul>
              <p className="mt-6 border-t border-stone-100 pt-4 text-xs text-indigo-700">About 30 seconds to generate · Conversion-optimized · Full SEO metadata</p>
            </article>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section id="features" className="border-t border-stone-200 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Results that matter for your business</h2>
            <p className="mt-3 text-lg text-stone-500">More clicks, less time spent writing.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o) => (
              <div key={o.title} className="bg-white p-7">
                <div className="mb-5 inline-flex rounded-xl bg-indigo-50 p-2.5 text-indigo-600"><Icon d={o.icon} className="h-6 w-6" /></div>
                <h3 className="mb-2 text-base font-semibold text-stone-900">{o.title}</h3>
                <p className="text-sm leading-relaxed text-stone-500">{o.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="text-sm text-stone-500">Works with</span>
            {MARKETS.map((m) => (
              <span key={m.key} className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-sm font-medium text-stone-700">
                <span className={`h-2 w-2 rounded-full ${m.dot}`} />
                {m.key}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stop overpaying for listings</h2>
            <p className="mt-3 text-lg text-stone-500">Whether you write them yourself or hire freelancers, manual listings cost more than you think.</p>
            <ul className="mt-8 space-y-5">
              {[
                { ok: false, t: "Fiverr/Upwork: $2-$5 per listing", s: "Plus back-and-forth revisions and inconsistent quality" },
                { ok: false, t: "DIY: 45+ minutes per listing", s: "Researching keywords, writing copy, formatting for each marketplace" },
                { ok: true, t: "QuickList AI Pro: $0.29/listing", s: "Instant results, all 4 marketplaces, SEO-optimized, consistent quality" },
              ].map((r) => (
                <li key={r.t} className="flex items-start gap-4">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${r.ok ? "bg-emerald-100 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                    <Icon d={r.ok ? CHECK : CROSS} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-stone-900">{r.t}</p>
                    <p className="text-sm text-stone-500">{r.s}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-stone-200 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Loved by e-commerce sellers</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col justify-between rounded-3xl bg-stone-50 p-7">
                <blockquote className="text-base leading-relaxed text-stone-700">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">{t.name[0]}</span>
                  <span>
                    <span className="block text-sm font-semibold text-stone-900">{t.name}</span>
                    <span className="block text-xs text-stone-500">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Invest less than a single Fiverr listing</h2>
            <p className="mt-3 text-lg text-stone-500">Pro pays for itself with your first 8 listings. Start free, upgrade when you&apos;re ready.</p>
          </div>
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-center">
            <p className="text-sm font-medium text-amber-900">
              Launch pricing: <span className="font-bold">{SPOTS_TOTAL - SPOTS_CLAIMED}</span> of {SPOTS_TOTAL} Pro spots left at $29/mo
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-amber-200" role="progressbar" aria-valuemin={0} aria-valuemax={SPOTS_TOTAL} aria-valuenow={SPOTS_CLAIMED} aria-label="Pro spots claimed">
              <div className="h-full rounded-full bg-amber-500" style={{ width: `${(SPOTS_CLAIMED / SPOTS_TOTAL) * 100}%` }} />
            </div>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl items-start gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative rounded-3xl border p-8 ${plan.highlighted ? "border-indigo-600 bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-600 lg:-mt-4 lg:pb-12" : "border-stone-200 bg-white"}`}>
                {plan.highlighted && <span className="absolute -top-3.5 left-8 rounded-full bg-indigo-600 px-3.5 py-1 text-xs font-semibold text-white">Most popular</span>}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-stone-500">{plan.description}</p>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-sm text-stone-500">{plan.period}</span>
                </p>
                <p className="mt-1 text-sm text-stone-600">
                  <span className="font-medium text-indigo-600">{plan.listings}</span>
                  {plan.perListing && <span className="text-emerald-700"> · {plan.perListing} avg.</span>}
                </p>
                <Link
                  href={plan.highlighted ? "/pricing" : "/generate"}
                  className={`mt-6 block w-full rounded-xl py-3 text-center text-sm font-semibold transition ${plan.highlighted ? "bg-indigo-600 text-white hover:bg-indigo-700" : "border border-stone-300 text-stone-700 hover:bg-stone-100"}`}
                >
                  {plan.cta}
                </Link>
                <ul className="mt-7 space-y-3 border-t border-stone-100 pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-stone-600">
                      <Icon d={CHECK} className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/pricing" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Compare all plans &rarr;</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-stone-200 bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Questions sellers ask</h2>
          <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
            {faqs.map((f, idx) => {
              const open = openFaq === idx;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : idx)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-medium text-stone-900">{f.q}</span>
                    <Icon d={open ? "M18 12H6" : "M12 6v12m6-6H6"} className="h-5 w-5 shrink-0 text-stone-400" />
                  </button>
                  {open && <p className="pb-5 pr-10 text-sm leading-relaxed text-stone-600">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="bg-stone-900 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Get early access to QuickList AI Pro</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-300">
            Join the waitlist and lock in launch pricing before rates increase. Only {SPOTS_TOTAL - SPOTS_CLAIMED} spots left.
          </p>
          <div className="mx-auto mt-10 max-w-lg">
            <WaitlistForm />
          </div>
          <p className="mt-4 text-sm text-stone-400">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">Q</div>
              <span className="text-sm font-semibold">QuickList AI</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <a href="#features" className="text-sm text-stone-500 transition-colors hover:text-stone-800">Features</a>
              <Link href="/pricing" className="text-sm text-stone-500 transition-colors hover:text-stone-800">Pricing</Link>
              <Link href="/generate" className="text-sm text-stone-500 transition-colors hover:text-stone-800">Generate</Link>
              <Link href="/tools/amazon-listing-generator" className="text-sm text-stone-500 transition-colors hover:text-stone-800">Amazon Tool</Link>
              <Link href="/tools/etsy-title-optimizer" className="text-sm text-stone-500 transition-colors hover:text-stone-800">Etsy Tool</Link>
              <Link href="/bulk" className="text-sm text-stone-500 transition-colors hover:text-stone-800">Bulk</Link>
              <Link href="/compare" className="text-sm text-stone-500 transition-colors hover:text-stone-800">Compare</Link>
            </nav>
            <p className="text-sm text-stone-400">&copy; 2026 QuickList AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <Link href="/generate" className="block rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white">
          Generate your first listing free
        </Link>
      </div>
    </div>
  );
}