import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QuickList AI vs Helium 10, Jungle Scout & More — Best Listing Optimizer 2026",
  description:
    "Compare QuickList AI with Helium 10, Jungle Scout, and ListifyAI. See why sellers choose QuickList AI: 78% cheaper, 4 marketplaces, AI-powered listing optimization.",
  keywords: [
    "helium 10 alternative",
    "jungle scout alternative",
    "best listing optimizer 2026",
    "helium 10 cheaper alternative",
    "amazon listing tool comparison",
    "multi-marketplace listing optimizer",
    "AI product listing generator",
  ],
  openGraph: {
    title: "QuickList AI vs Helium 10 — Compare Listing Optimizers",
    description:
      "QuickList AI is 78% cheaper than Helium 10 and supports 4 marketplaces. See the full comparison.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickList AI vs Helium 10 — Compare Listing Optimizers",
    description:
      "QuickList AI is 78% cheaper than Helium 10 and supports 4 marketplaces. See the full comparison.",
  },
};

const competitors = [
  {
    name: "QuickList AI",
    highlight: true,
    price: "$29/mo",
    freePrice: "Free tier",
    marketplaces: "4 (Amazon, Etsy, Shopify, eBay)",
    marketplaceCount: 4,
    aiGeneration: true,
    freeTier: true,
    bulkProcessing: true,
    seoOptimization: true,
    apiAccess: true,
    teamAccess: true,
  },
  {
    name: "Helium 10",
    highlight: false,
    price: "$129/mo",
    freePrice: "Limited free",
    marketplaces: "1 (Amazon only)",
    marketplaceCount: 1,
    aiGeneration: true,
    freeTier: false,
    bulkProcessing: true,
    seoOptimization: true,
    apiAccess: true,
    teamAccess: true,
  },
  {
    name: "Jungle Scout",
    highlight: false,
    price: "$49/mo",
    freePrice: "No free tier",
    marketplaces: "1 (Amazon only)",
    marketplaceCount: 1,
    aiGeneration: false,
    freeTier: false,
    bulkProcessing: false,
    seoOptimization: true,
    apiAccess: false,
    teamAccess: true,
  },
  {
    name: "ListifyAI",
    highlight: false,
    price: "$39/mo",
    freePrice: "No free tier",
    marketplaces: "2 (Amazon, Shopify)",
    marketplaceCount: 2,
    aiGeneration: true,
    freeTier: false,
    bulkProcessing: false,
    seoOptimization: false,
    apiAccess: false,
    teamAccess: false,
  },
];

const features = [
  { key: "price" as const, label: "Starting Price" },
  { key: "marketplaces" as const, label: "Marketplaces Supported" },
  { key: "aiGeneration" as const, label: "AI Listing Generation" },
  { key: "freeTier" as const, label: "Free Tier Available" },
  { key: "bulkProcessing" as const, label: "Bulk Processing" },
  { key: "seoOptimization" as const, label: "SEO Optimization" },
  { key: "apiAccess" as const, label: "API Access" },
  { key: "teamAccess" as const, label: "Team Collaboration" },
];

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-emerald-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      role="img"
      aria-label="Included"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-5 w-5 text-stone-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      role="img"
      aria-label="Not included"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function CellValue({ competitor, featureKey }: { competitor: typeof competitors[0]; featureKey: string }) {
  if (featureKey === "price") {
    return (
      <div>
        <span className={`text-base font-semibold ${competitor.highlight ? "text-emerald-800" : "text-stone-900"}`}>
          {competitor.price}
        </span>
        {competitor.freePrice && (
          <span className="ml-1 text-xs text-stone-500">({competitor.freePrice})</span>
        )}
      </div>
    );
  }
  if (featureKey === "marketplaces") {
    return (
      <span className={`text-sm ${competitor.highlight ? "font-semibold text-emerald-800" : "text-stone-600"}`}>
        {competitor.marketplaces}
      </span>
    );
  }
  const value = competitor[featureKey as keyof typeof competitor];
  if (typeof value === "boolean") {
    return value ? <CheckIcon /> : <XIcon />;
  }
  return <span className="text-sm text-stone-600">{String(value)}</span>;
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            Honest Comparison
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-6xl sm:leading-[1.05]">
            QuickList AI vs The Competition
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-600">
            See how QuickList AI stacks up against Helium 10, Jungle Scout, and ListifyAI.
            More marketplaces, AI-powered generation, and up to 78% cheaper.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Try Free
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-8 py-3.5 text-base font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-stone-900">
            Feature-by-feature comparison
          </h2>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200 lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="px-6 py-5 text-left text-sm font-medium text-stone-500">Feature</th>
                  {competitors.map((c) => (
                    <th
                      key={c.name}
                      className={`px-6 py-5 text-center text-sm font-semibold ${
                        c.highlight
                          ? "bg-emerald-800 text-white"
                          : "text-stone-700"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        {c.highlight && (
                          <span className="rounded-full bg-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-950">
                            Best Value
                          </span>
                        )}
                        {c.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature) => (
                  <tr
                    key={feature.key}
                    className="border-b border-stone-100 last:border-b-0"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-stone-700">{feature.label}</td>
                    {competitors.map((c) => (
                      <td
                        key={c.name}
                        className={`px-6 py-4 text-center ${
                          c.highlight ? "bg-emerald-50" : ""
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <CellValue competitor={c} featureKey={feature.key} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
            {competitors.map((c) => (
              <div
                key={c.name}
                className={`rounded-2xl p-6 ${
                  c.highlight
                    ? "bg-emerald-950 text-emerald-50 sm:col-span-2"
                    : "bg-white ring-1 ring-stone-200"
                }`}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className={`text-lg font-semibold ${c.highlight ? "text-white" : "text-stone-900"}`}>
                    {c.name}
                  </h3>
                  {c.highlight && (
                    <span className="rounded-full bg-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-950">
                      Best Value
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <span className={`text-3xl font-semibold ${c.highlight ? "text-white" : "text-stone-900"}`}>
                    {c.price}
                  </span>
                  {c.freePrice && (
                    <span className={`ml-2 text-sm ${c.highlight ? "text-emerald-300" : "text-stone-500"}`}>
                      ({c.freePrice})
                    </span>
                  )}
                </div>
                <p className={`mb-4 text-sm ${c.highlight ? "text-emerald-200" : "text-stone-500"}`}>
                  {c.marketplaces}
                </p>
                <ul className={`space-y-2.5 ${c.highlight ? "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0 sm:gap-y-2.5" : ""}`}>
                  {features.slice(2).map((feature) => {
                    const value = c[feature.key as keyof typeof c];
                    if (typeof value !== "boolean") return null;
                    return (
                      <li
                        key={feature.key}
                        className={`flex items-center gap-2.5 text-sm ${c.highlight ? "text-emerald-50" : "text-stone-600"}`}
                      >
                        {value ? <CheckIcon /> : <XIcon />}
                        {feature.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why QuickList AI */}
      <section className="bg-emerald-950 py-20 text-emerald-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="mb-12 max-w-xl text-3xl font-semibold tracking-tight text-white">
            Why sellers switch to QuickList AI
          </h2>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-emerald-900">
            {[
              {
                stat: "78%",
                label: "Cheaper than Helium 10",
                desc: "$29/mo vs $129/mo — get more features for a fraction of the cost.",
              },
              {
                stat: "4x",
                label: "More marketplaces",
                desc: "Amazon, Etsy, Shopify, and eBay. Others lock you into Amazon only.",
              },
              {
                stat: "5 min",
                label: "Average listing time",
                desc: "What used to take 2 hours now takes minutes with AI generation.",
              },
            ].map((item) => (
              <div key={item.label} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <div className="mb-3 text-6xl font-semibold tracking-tight text-emerald-300">{item.stat}</div>
                <div className="mb-2 text-base font-semibold text-white">{item.label}</div>
                <p className="text-sm leading-relaxed text-emerald-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="mb-10 text-3xl font-semibold tracking-tight text-stone-900">
            What sellers are saying
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                quote:
                  "QuickList AI cut my listing time from 2 hours to 5 minutes. The Amazon-optimized titles alone boosted my click-through rate by 35%.",
                name: "Sarah M.",
                role: "Etsy & Amazon Seller",
              },
              {
                quote:
                  "I run a Shopify store with 200+ products. Bulk processing all my listings at once was a game-changer. The SEO keywords are spot-on.",
                name: "James K.",
                role: "Shopify Store Owner",
              },
              {
                quote:
                  "Finally a tool that understands each marketplace is different. My eBay listings read differently from my Etsy ones, and that's exactly what I needed.",
                name: "Maria L.",
                role: "Multi-Platform Seller",
              },
            ].map((t) => (
              <figure key={t.name} className="flex flex-col rounded-2xl bg-white p-7 ring-1 ring-stone-200">
                <div className="mb-4 flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <blockquote className="flex-1 text-base leading-relaxed text-stone-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-stone-100 pt-4">
                  <p className="text-sm font-semibold text-stone-900">{t.name}</p>
                  <p className="text-sm text-stone-500">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-stone-900 px-8 py-16 sm:px-14">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to optimize your listings?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-stone-300">
            Join hundreds of sellers who switched from expensive, single-marketplace tools to QuickList AI.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 text-base font-semibold text-emerald-950 transition-colors hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              Try Free — No Account Needed
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}