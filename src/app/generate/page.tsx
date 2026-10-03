"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import WaitlistForm from "@/components/WaitlistForm";
import {
  hasReachedLimit,
  incrementUsage,
  getRemainingGenerations,
  FREE_DAILY_LIMIT,
  hasByokReachedLimit,
  incrementByokUsage,
  getByokRemainingGenerations,
  BYOK_DAILY_LIMIT,
} from "@/lib/usage";
import { getDemoListingsForAll } from "@/lib/demo";
import { generateListingsClientSide } from "@/lib/ai-client";
import type { Marketplace, GeneratedListing } from "@/types";

const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

// UI-only metadata: dot color + recommended title length per marketplace
const MARKETPLACE_TABS: { key: Marketplace; label: string; dot: string; titleMax: number }[] = [
  { key: "amazon", label: "Amazon", dot: "bg-amber-500", titleMax: 200 },
  { key: "etsy", label: "Etsy", dot: "bg-orange-500", titleMax: 140 },
  { key: "shopify", label: "Shopify", dot: "bg-emerald-500", titleMax: 70 },
  { key: "ebay", label: "eBay", dot: "bg-sky-500", titleMax: 80 },
];

const SAMPLE = {
  name: "Bamboo Wireless Charging Pad",
  category: "Electronics, Phone Accessories",
  features:
    "15W fast Qi charging, sustainably sourced bamboo top, anti-slip base, LED indicator, works through cases up to 5mm, USB-C cable included",
  targetAudience: "Eco-conscious professionals",
  priceRange: "$25-$35",
};

const API_KEY_STORAGE_KEY = "quicklist-ai-api-key";

function getStoredApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(API_KEY_STORAGE_KEY) || "";
}

function setStoredApiKey(key: string) {
  if (key) {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  } else {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
}

function exportAsCSV(results: Record<Marketplace, GeneratedListing>, productName: string) {
  const headers = ["Marketplace", "Title", "Description", "Bullet Points", "Meta Title", "Meta Description", "SEO Keywords", "Image Alt Text"];
  const rows = Object.values(results).map((listing) => [
    listing.marketplace,
    listing.title,
    listing.description.replace(/\n/g, " "),
    listing.bulletPoints.join(" | "),
    listing.metaTitle,
    listing.metaDescription,
    listing.seoKeywords.join(", "),
    listing.imageAltText,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${productName.replace(/\s+/g, "-").toLowerCase()}-listings.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ---------- UI-only helpers ---------- */

const inputCls =
  "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10";

function Section({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white">
      <header className="flex items-center justify-between gap-3 border-b border-stone-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
        <div className="flex items-center gap-3">{right}</div>
      </header>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

function Counter({ value, max }: { value: number; max: number }) {
  const over = value > max;
  const near = value > max * 0.9;
  return (
    <span
      className={`text-xs tabular-nums ${
        over ? "font-semibold text-red-600" : near ? "text-amber-600" : "text-stone-400"
      }`}
      title={over ? "Over the recommended length" : "Recommended length"}
    >
      {value}/{max}
    </span>
  );
}

function Icon({ d, className = "h-4 w-4" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const ICONS = {
  gear: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  close: "M6 18L18 6M6 6l12 12",
  check: "M5 13l4 4L19 7",
  download: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
  spark: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const Spinner = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const LOADING_STEPS = [
  "Analyzing product details",
  "Researching marketplace trends",
  "Optimizing for Amazon & Etsy",
  "Generating SEO keywords",
  "Finalizing all 4 listings",
];

export default function GeneratePage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<Marketplace, GeneratedListing> | null>(null);
  const [activeTab, setActiveTab] = useState<Marketplace>("amazon");
  const [error, setError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showWaitlistCta, setShowWaitlistCta] = useState(false);
  const [resultMode, setResultMode] = useState<"demo" | "live" | null>(null);

  // BYOK state
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [keySaved, setKeySaved] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    setApiKey(getStoredApiKey());
  }, []);

  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }
    const steps = [0, 1, 2, 3, 4];
    let current = 0;
    setLoadingStep(0);
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setLoadingStep(current);
      } else {
        clearInterval(interval);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  const handleSaveKey = () => {
    setStoredApiKey(apiKey);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const handleClearKey = () => {
    setApiKey("");
    setStoredApiKey("");
  };

  const hasByokKey = !!getStoredApiKey();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // BYOK users get 10/day, free users get 3/day
    if (hasByokKey && hasByokReachedLimit()) {
      setShowUpgrade(true);
      return;
    }
    if (!hasByokKey && hasReachedLimit()) {
      setShowUpgrade(true);
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setShowUpgrade(false);
    setResultMode(null);

    try {
      const productInput = {
        name,
        category,
        features,
        targetAudience: targetAudience || undefined,
        priceRange: priceRange || undefined,
      };

      // In static export mode, no API route is available
      if (IS_STATIC) {
        const storedKey = getStoredApiKey();

        // BYOK: call Gemini directly from the browser (10/day limit)
        if (storedKey) {
          const data = await generateListingsClientSide(productInput, storedKey);
          setResults(data.listings);
          setResultMode("live");
          setActiveTab("amazon");
          setShowWaitlistCta(true);
          incrementByokUsage();
          return;
        }

        // No key — fall back to demo data
        const listings = getDemoListingsForAll(productInput);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setResults(listings);
        setResultMode("demo");
        setActiveTab("amazon");
        setShowWaitlistCta(true);
        incrementUsage();
        return;
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const storedKey = getStoredApiKey();
      if (storedKey) {
        headers["X-API-Key"] = storedKey;
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name,
          category,
          features,
          targetAudience: targetAudience || undefined,
          priceRange: priceRange || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Server error (${response.status})`);
      }

      const data = await response.json();
      setResults(data.listings);
      setResultMode(data.mode);
      setActiveTab("amazon");
      setShowWaitlistCta(true);
      if (hasByokKey) {
        incrementByokUsage();
      } else {
        incrementUsage();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const remaining = hasByokKey ? getByokRemainingGenerations() : getRemainingGenerations();
  const dailyLimit = hasByokKey ? BYOK_DAILY_LIMIT : FREE_DAILY_LIMIT;
  const activeListing = results ? results[activeTab] : null;

  /* ---------- derived, display-only values ---------- */
  const requiredDone = [name, category, features].filter((v) => v.trim()).length;
  const usedPct = Math.min(100, Math.max(0, ((dailyLimit - remaining) / dailyLimit) * 100));
  const activeMeta = MARKETPLACE_TABS.find((t) => t.key === activeTab)!;
  const wordCount = activeListing ? activeListing.description.trim().split(/\s+/).filter(Boolean).length : 0;
  const fullListingText = activeListing
    ? [
        activeListing.title,
        "",
        activeListing.description,
        "",
        ...activeListing.bulletPoints.map((b) => `• ${b}`),
        "",
        `Keywords: ${activeListing.seoKeywords.join(", ")}`,
      ].join("\n")
    : "";

  const fillSample = () => {
    setName(SAMPLE.name);
    setCategory(SAMPLE.category);
    setFeatures(SAMPLE.features);
    setTargetAudience(SAMPLE.targetAudience);
    setPriceRange(SAMPLE.priceRange);
  };

  const usageChip = (
    <div className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 sm:w-60">
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-stone-700">{hasByokKey ? "Your key" : "Free plan"}</span>
        <span className="tabular-nums text-stone-500">
          <span className={`font-semibold ${remaining === 0 ? "text-red-600" : "text-stone-900"}`}>{remaining}</span> of {dailyLimit} left today
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${usedPct >= 100 ? "bg-red-500" : usedPct >= 66 ? "bg-amber-500" : "bg-indigo-500"}`}
          style={{ width: `${usedPct}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-stone-50 ${showWaitlistCta ? "pb-28 sm:pb-20" : ""}`}>
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Write your listings once, publish everywhere</h1>
            <p className="mt-2 text-stone-500">
              Describe your product and get titles, descriptions, bullets and SEO for Amazon, Etsy, Shopify and eBay in one go.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-stone-500">
              <Icon d={ICONS.check} className="h-3.5 w-3.5 text-emerald-600" />
              Trusted by 500+ sellers
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {usageChip}
            <button
              onClick={() => setShowSettings(!showSettings)}
              aria-expanded={showSettings}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
            >
              <Icon d={ICONS.gear} />
              API key
              {hasByokKey && <span className="h-2 w-2 rounded-full bg-emerald-500" aria-label="Key saved" />}
            </button>
          </div>
        </div>

        {/* BYOK Settings Panel */}
        {showSettings && (
          <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-stone-900">Use your own API key</h3>
              <button onClick={() => setShowSettings(false)} className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700" aria-label="Close settings">
                <Icon d={ICONS.close} className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-4 max-w-3xl text-sm text-stone-500">
              {IS_STATIC
                ? "Add a Google Gemini API key for AI-written listings (10/day, standard quality). Get a free key at aistudio.google.com. Upgrade to Pro for unlimited enhanced quality. Your key is stored locally."
                : "Add your own API key for AI-written listings (10/day, standard quality). Supports Anthropic (sk-ant-...) and Google Gemini keys. Upgrade to Pro for unlimited enhanced quality. Your key is stored locally."}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={IS_STATIC ? "Paste your Gemini API key" : "Paste your API key (sk-ant-... or Gemini key)"}
                className={inputCls}
              />
              <div className="flex gap-3">
                <button onClick={handleSaveKey} className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
                  {keySaved ? "Saved" : "Save key"}
                </button>
                {apiKey && (
                  <button onClick={handleClearKey} className="rounded-xl border border-stone-200 px-5 py-3 text-sm font-medium text-stone-600 transition hover:bg-stone-100">
                    Clear
                  </button>
                )}
              </div>
            </div>
            {getStoredApiKey() && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700">
                <Icon d={ICONS.check} className="h-3.5 w-3.5" />
                Key saved. Real AI generation is on.
              </p>
            )}
          </div>
        )}

        {showUpgrade && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-amber-900">You've hit today's limit</h3>
                <p className="mt-1 text-sm text-amber-800">
                  {hasByokKey
                    ? `You've used all ${BYOK_DAILY_LIMIT} BYOK generations for today. Upgrade to Pro for unlimited listings with enhanced quality.`
                    : `You've used all ${FREE_DAILY_LIMIT} free generations for today. Upgrade to Pro for unlimited listings.`}
                </p>
              </div>
              <Link href="/pricing" className="shrink-0 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                View plans
              </Link>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-stone-200 bg-white">
                <div className="flex items-center justify-between border-b border-stone-100 px-5 py-3">
                  <h2 className="text-sm font-semibold text-stone-900">Product details</h2>
                  <button type="button" onClick={fillSample} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                    Fill with an example
                  </button>
                </div>
                <div className="h-1 bg-stone-100" aria-hidden>
                  <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${(requiredDone / 3) * 100}%` }} />
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-stone-700">Product name</label>
                    <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Bamboo Wireless Charging Pad" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-stone-700">Category</label>
                    <input id="category" type="text" required value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Electronics, Home Decor" className={inputCls} />
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-baseline justify-between">
                      <label htmlFor="features" className="text-sm font-medium text-stone-700">Key features</label>
                      <span className="text-xs text-stone-400">{features.length} characters</span>
                    </div>
                    <textarea id="features" required rows={5} value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Materials, dimensions, colors, what makes it different..." className={inputCls} />
                    <p className="mt-1.5 text-xs text-stone-400">More specifics give you stronger titles and keywords.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <label htmlFor="targetAudience" className="mb-1.5 block text-sm font-medium text-stone-700">Audience <span className="font-normal text-stone-400">(optional)</span></label>
                      <input id="targetAudience" type="text" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="e.g., Remote workers" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="priceRange" className="mb-1.5 block text-sm font-medium text-stone-700">Price range <span className="font-normal text-stone-400">(optional)</span></label>
                      <input id="priceRange" type="text" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} placeholder="e.g., $25-$35" className={inputCls} />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Spinner /> Writing 4 listings...
                  </>
                ) : (
                  <>
                    <Icon d={ICONS.spark} /> Generate all 4 listings
                  </>
                )}
              </button>
              {error && (
                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <p className="font-medium">Generation failed</p>
                  <p className="mt-0.5">{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {loading && (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-stone-900">Writing your listings</h3>
                <p className="mt-1 text-sm text-stone-500">This usually takes a few seconds.</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full rounded-full bg-indigo-500 transition-all duration-700" style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }} />
                </div>
                <ol className="mt-6 space-y-2">
                  {LOADING_STEPS.map((label, i) => (
                    <li
                      key={label}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-500 ${
                        loadingStep > i ? "bg-emerald-50 text-emerald-700" : loadingStep === i ? "bg-indigo-50 text-indigo-700" : "text-stone-400"
                      }`}
                    >
                      {loadingStep > i ? (
                        <Icon d={ICONS.check} className="h-5 w-5 shrink-0" />
                      ) : loadingStep === i ? (
                        <Spinner className="h-5 w-5 shrink-0" />
                      ) : (
                        <span className="h-5 w-5 shrink-0 rounded-full border-2 border-stone-200" />
                      )}
                      {label}
                    </li>
                  ))}
                </ol>
                <div className="mt-6 space-y-3" aria-hidden>
                  <div className="h-4 w-3/4 animate-pulse rounded bg-stone-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-stone-100" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-stone-100" />
                </div>
              </div>
            )}

            {results && activeListing && (
              <div className="space-y-4">
                {resultMode === "demo" && (
                  <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    <Icon d={ICONS.info} className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      <strong>Sample output.</strong> {IS_STATIC ? "Add your Gemini API key to get real AI-written listings." : "Add your API key to get real AI-written listings."}
                    </span>
                  </div>
                )}
                {resultMode === "live" && hasByokKey && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    <Icon d={ICONS.check} className="h-4 w-4 shrink-0" />
                    <span><strong>Written with your API key.</strong></span>
                  </div>
                )}

                {/* Marketplace tabs */}
                <div className="sticky top-16 z-10 -mx-1 flex flex-wrap items-center gap-2 bg-stone-50/90 px-1 py-2 backdrop-blur" role="tablist">
                  {MARKETPLACE_TABS.map((tab) => (
                    <button
                      key={tab.key}
                      role="tab"
                      aria-selected={activeTab === tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                        activeTab === tab.key ? "bg-stone-900 text-white" : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-100"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${tab.dot}`} />
                      {tab.label}
                    </button>
                  ))}
                  <div className="ml-auto flex items-center gap-2">
                    <CopyButton text={fullListingText} />
                    <button
                      onClick={() => exportAsCSV(results, name)}
                      className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
                    >
                      <Icon d={ICONS.download} /> CSV
                    </button>
                  </div>
                </div>
                <p className="-mt-2 text-xs text-stone-400">The copy button copies the full {activeMeta.label} listing.</p>

                <Section title="Title" right={<><Counter value={activeListing.title.length} max={activeMeta.titleMax} /><CopyButton text={activeListing.title} /></>}>
                  <p className="text-lg font-medium leading-snug text-stone-900">{activeListing.title}</p>
                </Section>

                <Section title="Description" right={<><span className="text-xs tabular-nums text-stone-400">{wordCount} words</span><CopyButton text={activeListing.description} /></>}>
                  <p className="max-w-prose whitespace-pre-wrap text-sm leading-relaxed text-stone-700">{activeListing.description}</p>
                </Section>

                <Section title="Bullet points" right={<CopyButton text={activeListing.bulletPoints.join("\n")} />}>
                  <ul className="space-y-2.5">
                    {activeListing.bulletPoints.map((point, i) => (
                      <li key={`${activeTab}-bp-${i}`} className="flex items-start gap-3 text-sm leading-relaxed text-stone-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section title="SEO metadata">
                  <div className="divide-y divide-stone-100">
                    <div className="pb-4">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium text-stone-500">Meta title</span>
                        <div className="flex items-center gap-3"><Counter value={activeListing.metaTitle.length} max={60} /><CopyButton text={activeListing.metaTitle} /></div>
                      </div>
                      <p className="text-sm text-stone-800">{activeListing.metaTitle}</p>
                    </div>
                    <div className="py-4">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium text-stone-500">Meta description</span>
                        <div className="flex items-center gap-3"><Counter value={activeListing.metaDescription.length} max={160} /><CopyButton text={activeListing.metaDescription} /></div>
                      </div>
                      <p className="text-sm text-stone-800">{activeListing.metaDescription}</p>
                    </div>
                    <div className="pt-4">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium text-stone-500">Image alt text</span>
                        <div className="flex items-center gap-3"><Counter value={activeListing.imageAltText.length} max={125} /><CopyButton text={activeListing.imageAltText} /></div>
                      </div>
                      <p className="text-sm text-stone-800">{activeListing.imageAltText}</p>
                    </div>
                  </div>
                </Section>

                <Section title={`SEO keywords (${activeListing.seoKeywords.length})`} right={<CopyButton text={activeListing.seoKeywords.join(", ")} />}>
                  <div className="flex flex-wrap gap-2">
                    {activeListing.seoKeywords.map((keyword, i) => (
                      <span key={`${activeTab}-kw-${i}`} className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Section>
              </div>
            )}

            {!loading && !results && (
              <div className="flex min-h-[420px] items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-white p-10">
                <div className="max-w-sm text-center">
                  <Icon d={ICONS.spark} className="mx-auto h-10 w-10 text-stone-300" />
                  <p className="mt-4 text-base font-semibold text-stone-800">Your listings will show up here</p>
                  <p className="mt-1 text-sm text-stone-500">
                    Fill in the product details, or{" "}
                    <button type="button" onClick={fillSample} className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-800">
                      try an example
                    </button>
                    , then generate listings for Amazon, Etsy, Shopify and eBay.
                  </p>
                  <div className="mt-5 flex justify-center gap-2">
                    {MARKETPLACE_TABS.map((t) => (
                      <span key={t.key} className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600">
                        <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {showWaitlistCta && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-800 bg-stone-900 px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 text-white">
              <Icon d={ICONS.spark} className="h-5 w-5 shrink-0 text-indigo-300" />
              <span className="text-sm font-medium">Want full access? Join the waitlist.</span>
            </div>
            <div className="flex items-center gap-3">
              <WaitlistForm />
              <button onClick={() => setShowWaitlistCta(false)} className="shrink-0 rounded-lg p-1.5 text-stone-400 transition hover:bg-white/10 hover:text-white" aria-label="Dismiss">
                <Icon d={ICONS.close} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}