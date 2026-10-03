"use client";

import { useState, FormEvent } from "react";

interface WaitlistFormProps {
  variant?: "inline" | "card";
}

export default function WaitlistForm({ variant = "inline" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append("email", email);
      form.append("_subject", "New QuickList AI Waitlist Signup");
      form.append("_captcha", "false");
      form.append("_template", "table");

      await fetch("https://formsubmit.co/ajax/quicklistai.team@gmail.com", {
        method: "POST",
        body: form,
      });

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`flex items-center gap-2 ${variant === "card" ? "justify-center" : ""}`}>
        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-sm font-medium text-green-700">
          You&apos;re on the list! We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
        <div>
          <label htmlFor="waitlist-email-card" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="waitlist-email-card"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? "Joining..." : "Join Waitlist"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      <button
        type="submit"
        disabled={submitting}
        className="shrink-0 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 disabled:opacity-50"
      >
        {submitting ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
}
