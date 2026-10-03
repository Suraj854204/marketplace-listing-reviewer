"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import WaitlistForm from "@/components/WaitlistForm";

export default function LoginPage() {
  const { signIn, configured, loading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      router.push("/dashboard");
    }
  };

  // Not configured — show waitlist
  if (!authLoading && !configured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white text-lg font-bold">Q</div>
              <span className="text-2xl font-bold text-slate-900">QuickList AI</span>
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
              <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-900">Full Version Coming Soon</h2>
            <p className="mb-6 text-sm text-slate-500">
              Authentication will be available when we launch. Join the waitlist to get early access!
            </p>
            <WaitlistForm variant="card" />
            <div className="mt-4 pt-4 border-t border-slate-100">
              <Link href="/generate" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                Try the Demo &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white text-lg font-bold">Q</div>
            <span className="text-2xl font-bold text-slate-900">QuickList AI</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-1 text-xl font-bold text-slate-900">Welcome back</h2>
          <p className="mb-6 text-sm text-slate-500">Sign in to your account to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-700">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
