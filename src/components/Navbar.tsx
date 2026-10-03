"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, configured } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-lg" style={{ marginTop: "28px" }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-bold">Q</div>
          <span className="text-lg font-semibold">QuickList AI</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/generate" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Generate</Link>
          <Link href="/bulk" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Bulk Upload</Link>
          <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
          <Link href="/compare" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Compare</Link>
          {user ? (
            <Link href="/dashboard" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Dashboard</Link>
          ) : configured ? (
            <Link href="/auth/login" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Sign In</Link>
          ) : (
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Dashboard</Link>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/generate" className="text-sm text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(false)}>Generate</Link>
            <Link href="/bulk" className="text-sm text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(false)}>Bulk Upload</Link>
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(false)}>Pricing</Link>
            <Link href="/compare" className="text-sm text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(false)}>Compare</Link>
            {user ? (
              <Link href="/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-700" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            ) : configured ? (
              <Link href="/auth/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-700" onClick={() => setMenuOpen(false)}>Sign In</Link>
            ) : (
              <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
