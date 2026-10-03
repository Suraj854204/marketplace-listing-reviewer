"use client";

import Link from "next/link";

export default function DemoBanner() {
  return (
    <div className="fixed top-0 z-[60] w-full bg-indigo-600 px-4 py-1.5 text-center text-xs font-medium text-white">
      Free Tier — 3 generations/day.{" "}
      <Link href="/pricing" className="underline underline-offset-2 hover:text-indigo-100 transition-colors">
        Upgrade for unlimited
      </Link>
    </div>
  );
}
