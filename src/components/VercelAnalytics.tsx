"use client";

import { Analytics } from "@vercel/analytics/react";

export function VercelAnalytics() {
  if (typeof window !== "undefined" && !window.location.hostname.includes("vercel")) {
    return null;
  }
  return <Analytics />;
}
