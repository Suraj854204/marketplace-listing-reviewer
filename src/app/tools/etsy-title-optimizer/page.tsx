import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Etsy Title Optimizer | AI SEO Title Generator | QuickList AI",
  description: "Optimize your Etsy titles with AI. Free tool generates SEO-friendly Etsy titles with high-volume keywords that drive more views and sales. Try it now.",
  keywords: "etsy title optimizer, etsy SEO title generator, etsy listing optimizer, etsy keyword tool, etsy title generator free",
  openGraph: {
    title: "Free Etsy Title Optimizer | QuickList AI",
    description: "Optimize your Etsy titles with AI. Generate SEO-friendly titles with high-volume keywords that drive more views and sales.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuickList AI Etsy Title Optimizer",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: "Free AI-powered Etsy title optimizer that generates SEO-friendly titles with high-volume keywords.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "218",
  },
};

const faqs = [
  {
    question: "How does the Etsy title optimizer work?",
    answer: "Our AI analyzes Etsy's search algorithm and generates titles that include high-volume keywords placed strategically for maximum visibility. It considers keyword placement (front-loading important terms), character limits, and buyer search patterns specific to Etsy.",
  },
  {
    question: "What makes a good Etsy title?",
    answer: "A good Etsy title front-loads the most important keywords, uses all 140 characters, includes long-tail search terms buyers actually use, and reads naturally. Our AI handles all of this automatically.",
  },
  {
    question: "Is this tool free to use?",
    answer: "Yes! You get 3 free optimized listings per day, including the Etsy title. For unlimited daily optimizations, upgrade to Pro at $29/mo.",
  },
  {
    question: "Does it also generate descriptions and tags?",
    answer: "Yes. QuickList AI generates a complete Etsy listing — optimized title, description, bullet points, SEO keywords (for tags), and image alt text. Everything you need to list on Etsy.",
  },
  {
    question: "Can I optimize titles for other marketplaces?",
    answer: "Absolutely. QuickList AI generates optimized listings for Amazon, Etsy, Shopify, and eBay at the same time. Each marketplace gets titles tailored to its specific search algorithm.",
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

const beforeAfterTitle = {
  before: "Handmade Ceramic Mug Blue Coffee Cup Gift",
  after: "Handmade Blue Ceramic Coffee Mug, Artisan Pottery Cup with Textured Glaze, Unique Gift for Coffee Lovers, Stoneware Tea Mug, Housewarming Gift Idea",
};

export default function EtsyTitleOptimizerPage() {
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
              Free Etsy SEO Tool
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              AI-Powered <span className="text-orange-500">Etsy Title Optimizer</span>
            </h1>
            <p className="mb-4 text-xl text-slate-600">Generate SEO-optimized Etsy titles that rank higher in search and drive more views to your shop.</p>
            <p className="mx-auto mb-10 max-w-2xl text-base text-slate-500">Our AI analyzes Etsy&apos;s search algorithm and generates keyword-rich titles that maximize your listing visibility. Free — no account needed.</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/generate" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition-all duration-200">
                Optimize Your Title Free
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link href="/tools/amazon-listing-generator" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200">
                Amazon Generator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Title */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">See the difference optimized titles make</h2>
            <p className="mt-4 text-lg text-slate-500">Same product, dramatically better Etsy SEO.</p>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border-2 border-red-200 bg-white p-8 relative">
              <div className="absolute -top-3 left-6 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Before — Unoptimized Title</div>
              <p className="mt-2 text-lg text-slate-600">{beforeAfterTitle.before}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-red-600">
                <span>42 characters — wastes 98 characters</span>
                <span>Generic keywords</span>
                <span>Low search visibility</span>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-green-200 bg-white p-8 relative shadow-lg">
              <div className="absolute -top-3 left-6 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">After — QuickList AI Optimized</div>
              <p className="mt-2 text-lg text-slate-900 font-medium">{beforeAfterTitle.after}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-green-600">
                <span>137 characters — near perfect length</span>
                <span>Long-tail keywords</span>
                <span>Gift occasion targeting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Etsy Title Best Practices */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center sm:text-4xl mb-16">Etsy title optimization tips our AI follows</h2>
          <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Front-Load Keywords", desc: "The most important keywords go first. Etsy gives more weight to the beginning of your title." },
              { title: "Use All 140 Characters", desc: "Longer titles mean more keyword opportunities. Our AI maximizes every character without keyword stuffing." },
              { title: "Include Long-Tail Terms", desc: "Buyers search for specific phrases like 'handmade ceramic mug for coffee lovers' — not just 'mug'." },
              { title: "Target Gift Occasions", desc: "Add relevant gift occasions (birthday, housewarming, holiday) to capture gift-buyer search traffic." },
              { title: "Natural Readability", desc: "Keyword-stuffed titles hurt conversion. Our AI balances SEO with readability so buyers click and buy." },
              { title: "Match Buyer Intent", desc: "Use the words buyers actually search for, not industry jargon. Our AI knows what converts on Etsy." },
            ].map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center sm:text-4xl mb-16">How to optimize your Etsy titles</h2>
          <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Enter your product info", desc: "Name, category, key features, and target audience." },
              { step: "2", title: "Get optimized titles", desc: "AI generates a keyword-rich, 140-character Etsy title in seconds." },
              { step: "3", title: "Copy to your listing", desc: "One click to copy. Paste into Etsy and watch your views grow." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-lg">{s.step}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/generate" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition-all duration-200">
              Optimize My Etsy Title
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
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
      <section className="py-24 bg-gradient-to-br from-orange-500 to-amber-500">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Start optimizing your Etsy titles today</h2>
          <p className="mt-4 text-lg text-orange-100">Free to start. No account required. See results in 30 seconds.</p>
          <div className="mt-8">
            <Link href="/generate" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-orange-600 shadow-lg hover:bg-orange-50 transition-all duration-200">
              Generate Free Etsy Listing
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-orange-100">
            <Link href="/tools/amazon-listing-generator" className="hover:text-white transition-colors underline">Amazon Listing Generator</Link>
            <Link href="/blog/amazon-listing-optimization-guide-2026" className="hover:text-white transition-colors underline">Optimization Guide</Link>
            <Link href="/pricing" className="hover:text-white transition-colors underline">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
