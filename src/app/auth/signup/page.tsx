"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import WaitlistForm from "@/components/WaitlistForm";

export default function SignupPage() {
  const { signUp, configured, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signUp(email, password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      setSuccess(true);
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-900">Get Early Access</h2>
            <p className="mb-6 text-sm text-slate-500">
              Sign up for the waitlist and be the first to create an account when we launch!
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

  if (success) {
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
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-900">Check your email</h2>
            <p className="text-sm text-slate-500">
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </p>
            <div className="mt-6">
              <Link href="/auth/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Back to sign in
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
          <h2 className="mb-1 text-xl font-bold text-slate-900">Create your account</h2>
          <p className="mb-6 text-sm text-slate-500">Start generating optimized listings today.</p>

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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
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
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-400">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-700">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
