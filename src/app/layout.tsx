import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DemoBannerWrapper from "@/components/DemoBannerWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import { VercelAnalytics } from "@/components/VercelAnalytics";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const basePath = process.env.STATIC_EXPORT === "true" ? "/quicklist-ai" : "";
const siteUrl = "https://boudydegeer.github.io/quicklist-ai";

export const metadata: Metadata = {
  title: "QuickList AI - AI-Powered Product Listing Optimizer",
  description:
    "Generate optimized product listings for Amazon, Etsy, Shopify, eBay and more using AI. Save hours on copywriting with marketplace-specific optimization.",
  keywords: [
    "product listing",
    "AI",
    "Amazon",
    "Etsy",
    "Shopify",
    "eBay",
    "SEO",
    "optimization",
    "e-commerce",
    "listing generator",
    "marketplace optimization",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "QuickList AI - AI-Powered Product Listing Optimizer",
    description:
      "Generate optimized product listings for Amazon, Etsy, Shopify, and eBay simultaneously. AI-powered copywriting that converts.",
    url: siteUrl,
    siteName: "QuickList AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickList AI - AI-Powered Product Listing Optimizer",
    description:
      "Generate optimized product listings for Amazon, Etsy, Shopify, and eBay simultaneously. AI-powered copywriting that converts.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
    apple: `${basePath}/favicon.svg`,
  },
};

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "QuickList AI",
    url: "https://boudydegeer.github.io/quicklist-ai/",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI-powered multi-marketplace product listing optimizer for e-commerce sellers. Generate optimized listings for Amazon, Etsy, Shopify, and eBay simultaneously.",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Free",
        description: "3 AI-generated listings per day",
      },
      {
        "@type": "Offer",
        price: "29",
        priceCurrency: "USD",
        name: "Pro",
        description: "Unlimited listings with bulk processing",
      },
      {
        "@type": "Offer",
        price: "79",
        priceCurrency: "USD",
        name: "Business",
        description: "Team access with API and custom brand voice",
      },
    ],
    featureList: [
      "Multi-marketplace listing generation",
      "AI-powered SEO optimization",
      "Bulk CSV processing",
      "Amazon, Etsy, Shopify, eBay support",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={[inter.variable, "font-sans antialiased"].join(" ")}>
        <AuthProvider>
          <DemoBannerWrapper />
          <Navbar />
          {children}
        </AuthProvider>
        <VercelAnalytics />
      </body>
    </html>
  );
}
