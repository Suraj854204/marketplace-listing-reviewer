"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { DEMO_PROFILE, DEMO_GENERATIONS } from "@/lib/demo";

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, signOut, configured, loading } = useAuth();

  // Use real data if authenticated, demo data otherwise
  const isAuthenticated = configured && user;
  const displayProfile = isAuthenticated && profile
    ? profile
    : DEMO_PROFILE;
  const generations = DEMO_GENERATIONS;

  const usagePercent = Math.min(
    (displayProfile.generations_used / displayProfile.generations_limit) * 100,
    100
  );

  const planLabel =
    displayProfile.plan.charAt(0).toUpperCase() + displayProfile.plan.slice(1);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-3">
          <svg className="h-7 w-7 animate-spin text-emerald-700" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-stone-500">Loading your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <main className="mx-auto max-w-6xl px-5 py-10 pt-26 sm:px-8">
        {/* Demo banner when not authenticated */}
        {!isAuthenticated && (
          <div className="mb-8 flex items-start gap-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong className="font-semibold">Demo mode.</strong> You&apos;re looking at sample data.{" "}
              <Link
                href="/auth/signup"
                className="font-medium underline decoration-amber-400 underline-offset-2 hover:decoration-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600"
              >
                Create an account
              </Link>{" "}
              to track your real usage.
            </span>
          </div>
        )}

        {/* Header */}
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
              Dashboard
            </h1>
            <p className="mt-2 text-base text-stone-500">
              {isAuthenticated ? user.email : (displayProfile as typeof DEMO_PROFILE).email}
            </p>
          </div>
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="rounded-full border border-stone-300 bg-white px-5 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-full bg-emerald-800 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Sign In
            </Link>
          )}
        </header>

        {/* Usage: the one big moment on the page */}
        <section className="mb-6 overflow-hidden rounded-3xl bg-emerald-950 text-emerald-50">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-medium text-emerald-300">Generations used</p>
              <p className="mt-3 flex items-baseline gap-3 text-6xl font-semibold tracking-tight sm:text-7xl">
                {displayProfile.generations_used}
                <span className="text-2xl font-normal text-emerald-400 sm:text-3xl">
                  of {displayProfile.generations_limit}
                </span>
              </p>
              <div
                className="mt-6 h-3 overflow-hidden rounded-full bg-emerald-900"
                role="progressbar"
                aria-valuenow={Math.round(usagePercent)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Generations used"
              >
                <div
                  className="h-full rounded-full bg-emerald-400 transition-[width] duration-700 ease-out motion-reduce:transition-none"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-emerald-900 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <p className="text-sm font-medium text-emerald-300">Current plan</p>
                <p className="mt-1 text-3xl font-semibold">{planLabel}</p>
                <Link
                  href="/pricing"
                  className="mt-2 inline-block text-sm font-medium text-emerald-300 underline decoration-emerald-700 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
                >
                  {displayProfile.plan === "free" ? "Upgrade Plan" : "Manage Plan"}
                </Link>
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-300">
                  Marketplaces <span className="text-emerald-500">(5)</span>
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Amazon", "Etsy", "Shopify", "eBay", "Generic"].map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-emerald-900 px-3 py-1 text-xs font-medium text-emerald-100"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="mb-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/generate"
            className="group flex items-center gap-5 rounded-2xl bg-white p-6 ring-1 ring-stone-200 transition-shadow hover:ring-2 hover:ring-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-stone-900">Generate Listing</h3>
              <p className="mt-0.5 text-sm text-stone-500">Create an AI-optimized product listing</p>
            </div>
            <svg className="h-5 w-5 shrink-0 text-stone-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700 motion-reduce:transition-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/bulk"
            className="group flex items-center gap-5 rounded-2xl bg-white p-6 ring-1 ring-stone-200 transition-shadow hover:ring-2 hover:ring-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-stone-900"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-stone-900 text-white">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-stone-900">Bulk Upload</h3>
              <p className="mt-0.5 text-sm text-stone-500">Process multiple products via CSV</p>
            </div>
            <svg className="h-5 w-5 shrink-0 text-stone-300 transition-transform group-hover:translate-x-1 group-hover:text-stone-900 motion-reduce:transition-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Recent generations */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-stone-900">Recent Generations</h2>
          <div className="divide-y divide-stone-200 overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200">
            {generations.map((gen) => (
              <div
                key={gen.id}
                className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-stone-50"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-stone-900">{gen.product_name}</p>
                  <span className="mt-1 inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
                    {gen.marketplace}
                  </span>
                </div>
                <p className="shrink-0 text-sm tabular-nums text-stone-500">
                  {new Date(gen.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}