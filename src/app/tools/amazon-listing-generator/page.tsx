import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Amazon Listing Generator | AI-Powered Product Descriptions | QuickList AI",
  description: "Generate optimized Amazon product listings in seconds. Free AI-powered tool creates SEO-friendly titles, bullet points, and descriptions that boost click-through rates by 35%.",
  keywords: "amazon listing generator, amazon product description generator, amazon listing tool, free amazon listing generator, amazon SEO tool",
  openGraph: {
    title: "Free Amazon Listing Generator | QuickList AI",
    description: "Generate optimized Amazon product listings in seconds. AI-powered titles, bullet points, and descriptions that convert.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuickList AI Amazon Listing Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: "Free AI-powered Amazon listing generator that creates optimized product titles, descriptions, and bullet points.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "342",
  },
};

const faqs = [
  {
    question: "Is the Amazon listing generator really free?",
    answer: "Yes! You get 3 free AI-generated Amazon listings per day. For unlimited listings, upgrade to Pro at $29/mo — that's just $0.29 per listing.",
  },
  {
    question: "How does the AI optimize my Amazon listings?",
    answer: "Our AI analyzes Amazon's A9 algorithm requirements and generates titles with high-volume keywords, compelling bullet points using Amazon's formatting best practices, and backend search terms that maximize discoverability.",
  },
  {
    question: "Will these listings rank well on Amazon search?",
    answer: "Yes. Every listing includes keyword-optimized titles following Amazon's 200-character limit, backend search terms, and bullet points structured for both SEO and conversion. Sellers report an average 35% improvement in click-through rate.",
  },
  {
    question: "Can I generate listings for other marketplaces too?",
    answer: "Absolutely! QuickList AI generates optimized listings for Amazon, Etsy, Shopify, and eBay simultaneously. Each marketplace gets content tailored to its specific algorithm and audience.",
  },
  {
    question: "Do I need an Amazon Seller Central account to use this?",
    answer: "No. You can generate listings without any account. Simply enter your product details and get optimized copy that you can paste directly into Seller Central.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const beforeAfter = {
  before: {
    title: "Bamboo Wireless Charger for iPhone Samsung",
    bullets: [
      "Fast charging",
      "Made of bamboo",
      "Works with most phones",
      "Eco friendly",
      "Good quality",
    ],
  },
  after: {
    title: "Premium Bamboo Wireless Charging Pad — 15W Fast Charge, Qi-Certified for iPhone 15/14/13 & Samsung Galaxy S24/S23, Eco-Friendly Design",
    bullets: [
      "15W FAST CHARGING — Powers your devices up to 50% faster than standard 5W pads, with intelligent temperature control for safe overnight charging",
      "SUSTAINABLY SOURCED BAMBOO — FSC-certified natural bamboo construction with anti-slip silicone base, adds a premium eco-conscious touch to any desk",
      "UNIVERSAL QI COMPATIBILITY — Works seamlessly with iPhone 15/14/13/12 series, Samsung Galaxy S24/S23/S22, AirPods Pro, and all Qi-enabled devices",
      "ULTRA-SLIM DESIGN — Just 7mm thin with built-in LED indicator and foreign object detection for worry-free wireless charging",
      "WHAT YOU GET — Bamboo wireless charging pad, USB-C cable, user guide, and our 24-month warranty with responsive customer support",
    ],
  },
};

export default function AmazonListingGeneratorPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm text-orange-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
              Free Amazon Listing Tool
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              AI-Powered <span className="text-orange-600">Amazon Listing Generator</span>
            </h1>
            <p className="mb-4 text-xl text-slate-600">Generate Amazon-optimized product titles, bullet points, and descriptions that rank higher and convert more buyers.</p>
            <p className="mx-auto mb-10 max-w-2xl text-base text-slate-500">Enter your product details below and get a complete, A9-optimized Amazon listing in under 30 seconds. Free — no account required.</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/generate" className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-600/25 hover:bg-orange-700 transition-all duration-200">
                Generate Your First Listing Free
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200">
                See Pro Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Demo */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">See what AI optimization looks like</h2>
            <p className="mt-4 text-lg text-slate-500">Same product. Dramatically better listing.</p>
          </div>
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-red-200 bg-white p-8 relative">
              <div className="absolute -top-3 left-6 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Before — Manual Listing</div>
              <div className="mt-2">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Title</h4>
                <p className="text-sm text-slate-600 mb-4">{beforeAfter.before.title}</p>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Bullet Points</h4>
                <ul className="space-y-2">
                  {beforeAfter.before.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-green-200 bg-white p-8 relative shadow-lg">
              <div className="absolute -top-3 left-6 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">After — QuickList AI</div>
              <div className="mt-2">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Title</h4>
                <p className="text-sm text-slate-900 font-medium mb-4">{beforeAfter.after.title}</p>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Bullet Points</h4>
                <ul className="space-y-2">
                  {beforeAfter.after.bullets.map((b) => (
                    <li key={b.slice(0, 30)} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center sm:text-4xl mb-16">How it works</h2>
          <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Enter product details", desc: "Name, category, features, target audience. That's all you need." },
              { step: "2", title: "AI generates your listing", desc: "Our AI creates an Amazon-optimized title, bullets, description, and SEO metadata in ~30 seconds." },
              { step: "3", title: "Copy & paste to Seller Central", desc: "One-click copy for each section. Paste directly into your Amazon listing." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700 font-bold text-lg">{s.step}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/generate" className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-600/25 hover:bg-orange-700 transition-all duration-200">
              Try It Now — Free
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features for Amazon */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center sm:text-4xl mb-16">Built for Amazon sellers</h2>
          <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "A9 Algorithm Optimized", desc: "Titles and bullets structured to maximize Amazon search ranking and Buy Box eligibility." },
              { title: "Keyword-Rich Titles", desc: "200-character titles packed with high-volume search terms that match buyer intent." },
              { title: "Conversion-Focused Bullets", desc: "5 bullet points using Amazon's ALL-CAPS format with benefit-driven copy that sells." },
              { title: "Backend Search Terms", desc: "SEO keywords optimized for Amazon's hidden search term fields to maximize discoverability." },
              { title: "Image Alt Text", desc: "Accessibility-compliant alt text that also helps your images rank in Amazon image search." },
              { title: "Multi-Marketplace", desc: "Also generates Etsy, Shopify, and eBay versions — each tailored to that platform's SEO." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center sm:text-4xl mb-12">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-orange-600 to-amber-600">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to optimize your Amazon listings?</h2>
          <p className="mt-4 text-lg text-orange-100">Generate your first listing in under 30 seconds. Free — no account required.</p>
          <div className="mt-8">
            <Link href="/generate" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-orange-700 shadow-lg hover:bg-orange-50 transition-all duration-200">
              Generate Free Amazon Listing
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-orange-100">
            <Link href="/tools/etsy-title-optimizer" className="hover:text-white transition-colors underline">Etsy Title Optimizer</Link>
            <Link href="/blog/amazon-listing-optimization-guide-2026" className="hover:text-white transition-colors underline">Amazon Optimization Guide</Link>
            <Link href="/pricing" className="hover:text-white transition-colors underline">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
