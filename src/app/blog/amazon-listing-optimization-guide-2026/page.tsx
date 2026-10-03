import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amazon Listing Optimization Guide 2026: Complete Seller's Playbook | QuickList AI",
  description: "The definitive 2026 guide to Amazon listing optimization. Learn how to write titles, bullet points, and descriptions that rank higher and convert more buyers. Includes AI tools comparison.",
  keywords: "amazon listing optimization 2026, amazon product listing optimization, amazon SEO guide, amazon listing best practices, how to optimize amazon listings",
  openGraph: {
    title: "Amazon Listing Optimization Guide 2026 | QuickList AI",
    description: "The definitive guide to Amazon listing optimization in 2026. Rank higher, convert more, sell faster.",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Amazon Listing Optimization Guide 2026: Complete Seller's Playbook",
  description: "The definitive 2026 guide to Amazon listing optimization. Learn how to write titles, bullet points, and descriptions that rank higher and convert more buyers.",
  author: {
    "@type": "Organization",
    name: "QuickList AI",
  },
  publisher: {
    "@type": "Organization",
    name: "QuickList AI",
  },
  datePublished: "2026-03-15",
  dateModified: "2026-03-27",
  mainEntityOfPage: {
    "@type": "WebPage",
  },
};

export default function AmazonOptimizationGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
            <span>/</span>
            <span>Amazon Optimization</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
            Amazon Listing Optimization Guide 2026: The Complete Seller&apos;s Playbook
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            Everything you need to know about optimizing your Amazon listings in 2026 — from titles and bullet points to backend keywords and A+ Content.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Updated March 2026</span>
            <span className="text-slate-300">|</span>
            <span>15 min read</span>
            <span className="text-slate-300">|</span>
            <span>By QuickList AI Team</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Table of Contents</h2>
          <nav className="space-y-2">
            {[
              { id: "why-optimization-matters", label: "1. Why Amazon Listing Optimization Matters in 2026" },
              { id: "title-optimization", label: "2. Title Optimization: The #1 Ranking Factor" },
              { id: "bullet-points", label: "3. Bullet Points That Sell" },
              { id: "product-description", label: "4. Product Description & A+ Content" },
              { id: "backend-keywords", label: "5. Backend Search Terms" },
              { id: "images", label: "6. Image Optimization" },
              { id: "manual-vs-ai", label: "7. Manual vs. AI Listing Optimization (Comparison)" },
              { id: "common-mistakes", label: "8. Common Mistakes to Avoid" },
              { id: "checklist", label: "9. Amazon Listing Optimization Checklist" },
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="block text-sm text-indigo-600 hover:text-indigo-700 transition-colors">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24">

          <section id="why-optimization-matters" className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Why Amazon Listing Optimization Matters in 2026</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              With over 9.7 million active sellers on Amazon and more than 350 million products listed, standing out has never been harder. In 2026, Amazon&apos;s A10 algorithm continues to evolve, placing even greater emphasis on relevance, conversion rate, and buyer satisfaction.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              A well-optimized listing doesn&apos;t just rank higher in search — it converts browsers into buyers. Sellers who optimize their listings report:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>35% higher click-through rate</strong> from search results</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>20-50% increase in conversion rate</strong> from optimized bullet points</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>2-3x improvement in organic ranking</strong> within 30 days</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              The good news? You don&apos;t need to be a copywriting expert. This guide — plus tools like <Link href="/tools/amazon-listing-generator" className="text-indigo-600 hover:text-indigo-700 font-medium">QuickList AI&apos;s Amazon Listing Generator</Link> — gives you everything you need to create listings that rank and sell.
            </p>
          </section>

          <section id="title-optimization" className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Title Optimization: The #1 Ranking Factor</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Your product title is the single most important element for Amazon SEO. The A10 algorithm heavily weighs title keywords when determining search relevance. Here&apos;s how to nail it in 2026:
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Amazon Title Formula</h3>
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 mb-6">
              <p className="font-mono text-sm text-indigo-800">
                [Brand] + [Product Type] + [Key Feature 1] + [Key Feature 2] + [Size/Quantity] + [Color/Variant] + [Target Use/Audience]
              </p>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Title Best Practices for 2026</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Stay under 200 characters</strong> — Amazon truncates titles on mobile at ~80 characters, so front-load the most important keywords</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Include your brand name first</strong> — this builds brand recognition and Amazon favors branded searches</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Use natural language</strong> — keyword stuffing is penalized; write titles that read well to humans</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Include model compatibility</strong> — for electronics, &quot;for iPhone 15/14/13&quot; captures specific search queries</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Avoid promotional language</strong> — &quot;Best&quot;, &quot;#1&quot;, &quot;Sale&quot; violate Amazon guidelines and can get your listing suppressed</li>
            </ul>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 mb-6">
              <h4 className="font-semibold text-slate-900 mb-3">Example: Good vs. Bad Title</h4>
              <p className="text-sm text-red-600 mb-2"><strong>Bad:</strong> Bamboo Wireless Charger Fast iPhone Samsung</p>
              <p className="text-sm text-green-600"><strong>Good:</strong> EcoPower Premium Bamboo Wireless Charging Pad — 15W Fast Charge, Qi-Certified for iPhone 15/14/13 & Samsung Galaxy S24/S23, Eco-Friendly Design</p>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Pro tip: Use <Link href="/tools/amazon-listing-generator" className="text-indigo-600 hover:text-indigo-700 font-medium">our free Amazon listing generator</Link> to automatically create titles that follow all these best practices.
            </p>
          </section>

          <section id="bullet-points" className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Bullet Points That Sell</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Amazon allows up to 5 bullet points (called &quot;Key Product Features&quot;). These are your primary selling tool — most buyers scan bullets before reading the description.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">The 2026 Bullet Point Formula</h3>
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 mb-6">
              <p className="font-mono text-sm text-indigo-800">
                ALL-CAPS FEATURE NAME — Benefit-driven explanation that connects the feature to the buyer&apos;s desired outcome (150-200 chars each)
              </p>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">What makes great bullet points</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Lead with benefits, not features</strong> — &quot;Charges 50% faster&quot; beats &quot;15W output&quot;</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Use ALL-CAPS for the first few words</strong> — this is Amazon&apos;s expected format and helps scanners</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Address buyer objections</strong> — mention warranty, compatibility, ease of use</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Include secondary keywords</strong> — bullets contribute to search ranking</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>End with a &quot;What You Get&quot; bullet</strong> — lists everything included and builds confidence</li>
            </ul>
          </section>

          <section id="product-description" className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Product Description & A+ Content</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The product description appears below the fold but is still indexed by Amazon&apos;s search algorithm. In 2026, A+ Content (formerly Enhanced Brand Content) is more important than ever for conversion.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Standard Description Tips</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />Keep it under 2,000 characters</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />Use HTML formatting (bold, line breaks) for readability</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />Tell a story about the product — how it solves the buyer&apos;s problem</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />Include keywords not used in title or bullets</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />End with a clear call-to-action</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">A+ Content in 2026</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              If you&apos;re brand registered, A+ Content can increase conversion by 3-10%. Focus on comparison charts against your own products (not competitors), lifestyle images, and benefit-focused modules. Amazon&apos;s new 2026 A+ Premium templates also support video and interactive elements.
            </p>
          </section>

          <section id="backend-keywords" className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Backend Search Terms</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Backend keywords are invisible to buyers but indexed by Amazon. You get 250 bytes (roughly 250 characters) for search terms. This is where you put keywords that don&apos;t fit naturally in your title or bullets.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Backend Keyword Strategy</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Don&apos;t repeat title keywords</strong> — Amazon already indexes them</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Include misspellings</strong> — buyers misspell (e.g., &quot;wirless charger&quot;)</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Add Spanish/alternate language terms</strong> — if relevant to your market</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Use single spaces, no commas</strong> — maximizes character usage</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Include complementary product terms</strong> — &quot;desk accessories office gadgets&quot;</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              QuickList AI automatically generates a set of SEO keywords perfect for backend search terms. <Link href="/generate" className="text-indigo-600 hover:text-indigo-700 font-medium">Try it free</Link>.
            </p>
          </section>

          <section id="images" className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Image Optimization</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Images are your silent salesforce. Amazon allows 7+ images (9 for some categories), and in 2026, image quality directly impacts both conversion and search ranking.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Main image:</strong> Pure white background, product fills 85%+ of frame, 2000x2000px minimum</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Image 2-3:</strong> Feature callouts with text overlays</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Image 4-5:</strong> Lifestyle shots showing the product in use</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Image 6:</strong> Size comparison or dimensions</li>
              <li className="flex items-start gap-2 text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><strong>Image 7:</strong> Package contents / &quot;What&apos;s in the box&quot;</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              Don&apos;t forget image alt text! QuickList AI generates SEO-optimized alt text for every listing, helping your images rank in Amazon image search.
            </p>
          </section>

          <section id="manual-vs-ai" className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Manual vs. AI Listing Optimization</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Should you write listings manually or use AI? Here&apos;s an honest comparison:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">Factor</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-slate-700">Manual Writing</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-slate-700">Freelancer (Fiverr)</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-indigo-700 bg-indigo-50">QuickList AI</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { factor: "Time per listing", manual: "45-90 min", freelancer: "24-48 hours", ai: "30 seconds" },
                    { factor: "Cost per listing", manual: "Your time", freelancer: "$2-$5", ai: "$0.29 (Pro)" },
                    { factor: "SEO optimization", manual: "Requires research", freelancer: "Varies by writer", ai: "Built-in, automatic" },
                    { factor: "Consistency", manual: "Low", freelancer: "Low-Medium", ai: "High" },
                    { factor: "Multi-marketplace", manual: "4x the work", freelancer: "4x the cost", ai: "All 4 at once" },
                    { factor: "Bulk processing", manual: "Days/weeks", freelancer: "Days", ai: "Minutes (CSV)" },
                    { factor: "Quality control", manual: "Self-review", freelancer: "Revisions needed", ai: "Consistent quality" },
                  ].map((row) => (
                    <tr key={row.factor} className="border-b border-slate-100">
                      <td className="py-3 px-4 text-sm font-medium text-slate-700">{row.factor}</td>
                      <td className="py-3 px-4 text-center text-sm text-slate-600">{row.manual}</td>
                      <td className="py-3 px-4 text-center text-sm text-slate-600">{row.freelancer}</td>
                      <td className="py-3 px-4 text-center text-sm font-medium text-indigo-700 bg-indigo-50/50">{row.ai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 leading-relaxed">
              The best approach? Use AI to generate the first draft, then add your unique product knowledge and brand voice. This hybrid approach gives you the speed of AI with the authenticity of human editing.
            </p>
          </section>

          <section id="common-mistakes" className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Common Mistakes to Avoid</h2>
            <div className="space-y-4">
              {[
                { mistake: "Keyword stuffing", fix: "Amazon penalizes unnatural keyword density. Write for humans first, algorithms second." },
                { mistake: "Ignoring mobile optimization", fix: "60%+ of Amazon shoppers browse on mobile. Keep titles scannable and front-load important info." },
                { mistake: "Copy-pasting the same listing across marketplaces", fix: "Each marketplace has different algorithms and audiences. Etsy shoppers search differently than Amazon buyers." },
                { mistake: "Not using all 5 bullet points", fix: "Every empty bullet is a missed opportunity for keywords and conversion. Use all 5." },
                { mistake: "Forgetting backend search terms", fix: "250 bytes of free keyword space. Include misspellings, synonyms, and alternate terms." },
                { mistake: "Using stock descriptions from suppliers", fix: "Duplicate content hurts ranking. Always create unique, optimized listings." },
              ].map((item) => (
                <div key={item.mistake} className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="font-semibold text-red-700 mb-1">{item.mistake}</h3>
                  <p className="text-sm text-slate-600">{item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="checklist" className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Amazon Listing Optimization Checklist</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Use this checklist before publishing any Amazon listing:
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="space-y-3">
                {[
                  "Title includes primary keywords in first 80 characters",
                  "Title follows Brand + Product + Feature formula",
                  "Title is under 200 characters",
                  "5 bullet points filled, each 150-200 characters",
                  "Bullet points lead with ALL-CAPS feature name",
                  "Bullet points focus on benefits, not just features",
                  "Product description tells a story (under 2,000 chars)",
                  "Backend search terms use all 250 bytes",
                  "Backend keywords don't repeat title/bullet keywords",
                  "7+ high-quality images uploaded (2000x2000px+)",
                  "Main image on white background, product fills 85%+",
                  "Image alt text is descriptive and keyword-rich",
                  "No promotional language (Best, #1, Sale, etc.)",
                  "No competitor brand names in listing",
                  "Listing is unique (not copy-pasted from supplier)",
                ].map((item) => (
                  <label key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Skip the manual work</h2>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              QuickList AI generates fully optimized Amazon listings in 30 seconds — titles, bullets, descriptions, SEO keywords, and more. Free to start.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/generate" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-indigo-700 shadow-lg hover:bg-indigo-50 transition-all duration-200">
                Generate Free Amazon Listing
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link href="/tools/amazon-listing-generator" className="inline-flex items-center gap-2 text-indigo-200 hover:text-white text-sm font-medium transition-colors">
                Learn about our Amazon tool
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </section>
        </div>

        {/* Related Content */}
        <div className="mt-16 border-t border-slate-200 pt-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Related resources</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/tools/amazon-listing-generator" className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-all">
              <h4 className="font-semibold text-slate-900">Amazon Listing Generator</h4>
              <p className="mt-1 text-sm text-slate-500">Free tool to generate optimized Amazon listings</p>
            </Link>
            <Link href="/tools/etsy-title-optimizer" className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-all">
              <h4 className="font-semibold text-slate-900">Etsy Title Optimizer</h4>
              <p className="mt-1 text-sm text-slate-500">Optimize your Etsy titles for maximum visibility</p>
            </Link>
            <Link href="/pricing" className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-all">
              <h4 className="font-semibold text-slate-900">QuickList AI Pricing</h4>
              <p className="mt-1 text-sm text-slate-500">Free, Pro, and Business plans for every seller</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
