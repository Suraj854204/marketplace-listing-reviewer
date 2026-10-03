import type { GeneratedListing, Marketplace, ProductInput } from "@/types";

export function isDemoMode(): boolean {
  const provider = (process.env.AI_PROVIDER || "").toLowerCase();

  // Explicit demo mode
  if (provider === "demo") return true;

  // If provider is gemini, check for Gemini key
  if (provider === "gemini") {
    const geminiKey = process.env.GEMINI_API_KEY;
    return !geminiKey || geminiKey === "your-key-here";
  }

  // If provider is anthropic (or unset), check for Anthropic key
  if (provider === "anthropic" || provider === "") {
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    return !anthropicKey || anthropicKey === "demo" || anthropicKey === "your-key-here";
  }

  // Unknown provider — fall back to demo
  return true;
}

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-url-here" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "your-key-here"
  );
}

function parseFeatures(features: string): string[] {
  if (!features.trim()) return [];
  return features
    .split(/[,\n]+/)
    .map((f) => f.trim())
    .filter(Boolean);
}

function generateKeywords(name: string, category: string, features: string[]): string[] {
  const keywords: string[] = [];
  const nameLower = name.toLowerCase();
  keywords.push(nameLower);
  if (category) {
    keywords.push(category.toLowerCase());
    keywords.push(`${nameLower} ${category.toLowerCase()}`);
  }
  for (const f of features.slice(0, 3)) {
    keywords.push(f.toLowerCase());
  }
  keywords.push(`buy ${nameLower}`);
  keywords.push(`best ${nameLower}`);
  keywords.push(`${nameLower} for sale`);
  return keywords;
}

function buildDemoListing(
  input: ProductInput,
  style: {
    titleTemplate: (name: string, features: string[]) => string;
    descriptionTemplate: (name: string, category: string, features: string[], audience: string) => string;
    bulletTemplate: (name: string, features: string[]) => string[];
  }
): GeneratedListing {
  const name = input.name || "Product";
  const category = input.category || "";
  const features = parseFeatures(input.features || "");
  const audience = input.targetAudience || "discerning customers";
  const mp = input.marketplace;

  const featureSummary = features.length > 0 ? features.join(", ") : "premium quality";

  return {
    title: style.titleTemplate(name, features),
    description: style.descriptionTemplate(name, category, features, audience),
    bulletPoints: style.bulletTemplate(name, features),
    metaTitle: `${name} | ${category || "Shop Now"}`.slice(0, 60),
    metaDescription: `Shop ${name}${category ? ` in ${category}` : ""}. Features: ${featureSummary}. Order now with fast shipping.`.slice(0, 160),
    seoKeywords: generateKeywords(name, category, features),
    imageAltText: `${name}${category ? ` - ${category}` : ""} product photo`,
    marketplace: mp,
  };
}

// Bullet pattern generators — each uses a different sentence structure
const bulletPatterns = {
  benefitDriven: (feature: string, name: string) =>
    `${feature.toUpperCase()} — Crafted with premium ${feature.toLowerCase()} that delivers a noticeably better experience`,
  questionHook: (feature: string, name: string) =>
    `${feature.toUpperCase()} — Tired of settling for less? Our ${feature.toLowerCase()} is built to exceed your expectations`,
  statClaim: (feature: string, name: string) =>
    `${feature.toUpperCase()} — Trusted by thousands of satisfied customers who chose the ${name} for its ${feature.toLowerCase()}`,
  comparisonEdge: (feature: string, name: string) =>
    `${feature.toUpperCase()} — While others cut corners, we invested in ${feature.toLowerCase()} you can actually feel`,
  outcomeFirst: (feature: string, name: string) =>
    `${feature.toUpperCase()} — Get the results you want with ${feature.toLowerCase()} designed for real-world performance`,
};

const bulletPatternList = Object.values(bulletPatterns);

function variedBullets(name: string, features: string[], fallbacks: string[]): string[] {
  if (features.length === 0) return fallbacks;
  return features.slice(0, 5).map((f, i) =>
    bulletPatternList[i % bulletPatternList.length](f, name)
  );
}

const marketplaceStyles: Record<Marketplace, {
  titleTemplate: (name: string, features: string[]) => string;
  descriptionTemplate: (name: string, category: string, features: string[], audience: string) => string;
  bulletTemplate: (name: string, features: string[]) => string[];
}> = {
  amazon: {
    titleTemplate: (name, features) => {
      const highlights = features.slice(0, 3).join(", ");
      return highlights
        ? `${name} — ${highlights} | Professional Grade`
        : `${name} — Professional Grade, Top Rated`;
    },
    descriptionTemplate: (name, category, features, audience) => {
      const hook = `Looking for a ${name.toLowerCase()} that actually lives up to the hype?`;
      const categoryLine = category ? ` Whether you need it for ${category} or everyday use, this is the one.` : "";
      const featureBlock = features.length > 0
        ? `\n\nWhy customers choose the ${name}:\n${features.map((f, i) => {
            const prefixes = ["✅", "🔹", "⭐", "💡", "🎯"];
            return `${prefixes[i % prefixes.length]} ${f}`;
          }).join("\n")}`
        : "\n\n✅ Premium materials built to last\n🔹 Thoughtful design for everyday use\n⭐ Exceptional quality at every touchpoint";
      return `${hook}${categoryLine}\n\nDesigned for ${audience} who refuse to compromise, the ${name} combines form and function in ways that matter.${featureBlock}\n\nEvery ${name} is backed by our satisfaction guarantee. If it doesn't meet your standards, send it back — no questions asked.\n\n🛒 Add to cart now and see the difference for yourself.`;
    },
    bulletTemplate: (name, features) => {
      return variedBullets(name, features, [
        `PREMIUM BUILD — The ${name} uses materials you can feel the moment you pick it up`,
        `VERSATILE BY DESIGN — Works for everyday use, special occasions, and everything in between`,
        `SATISFACTION GUARANTEED — Love your ${name} or return it for a full refund, no questions asked`,
      ]);
    },
  },
  etsy: {
    titleTemplate: (name, features) => {
      const tags = features.slice(0, 2).map((f) => f.trim());
      const tagPart = tags.length > 0 ? ` | ${tags.join(" | ")}` : " | Handcrafted | Unique Gift";
      return `${name}${tagPart} | Ready to Ship`;
    },
    descriptionTemplate: (name, category, features, audience) => {
      const story = category
        ? `This ${name.toLowerCase()} was born from a simple idea: ${category} lovers deserve something better than mass-produced alternatives.`
        : `Every ${name.toLowerCase()} tells a story — and this one is waiting to become part of yours.`;
      const featureDesc = features.length > 0
        ? `\n\nWhat makes it special:\n${features.map((f, i) => {
            const markers = ["✦", "◆", "▸", "•", "→"];
            return `${markers[i % markers.length]} ${f}`;
          }).join("\n")}`
        : "";
      return `${story}\n\nEach piece is made by hand with the kind of care and attention you just can't get from a factory. We select every material, check every detail, and package every order like it's going to a friend.${featureDesc}\n\nWhether you're treating yourself or finding the perfect gift for ${audience}, this ${name.toLowerCase()} is ready to impress.\n\n📦 Carefully wrapped and shipped within 1-3 business days.\n💛 Thank you for supporting independent makers!`;
    },
    bulletTemplate: (name, features) => {
      if (features.length === 0) {
        return [
          `Handcrafted ${name} — each piece is one of a kind`,
          "Made with sustainably sourced materials you can feel good about",
          "Unique design you won't find on mass-market shelves",
          "Gift-ready packaging included at no extra cost",
          "Ships within 1-3 business days with tracking",
        ];
      }
      const etsyPatterns = [
        (f: string) => `${f} — handmade with materials we personally source and inspect`,
        (f: string) => `${f} — because you deserve something made with intention, not just a machine`,
        (f: string) => `${f} — a detail our customers mention again and again in their reviews`,
        (f: string) => `${f} — designed to look even better with time and use`,
        (f: string) => `${f} — the kind of quality that makes this a gift people actually keep`,
      ];
      const bullets = features.slice(0, 5).map((f, i) => etsyPatterns[i % etsyPatterns.length](f));
      bullets.push("Ships within 1-3 business days with tracking included");
      return bullets;
    },
  },
  shopify: {
    titleTemplate: (name, features) => {
      return features.length > 0
        ? `The ${name} — ${features[0]}`
        : `The ${name}`;
    },
    descriptionTemplate: (name, category, features, audience) => {
      const intro = category
        ? `We designed the ${name} for one reason: to be the last ${category.toLowerCase()} product you'll ever need to buy.`
        : `We designed the ${name} to be the kind of product you recommend to friends.`;
      const featureParagraph = features.length > 0
        ? `\n\nWhat sets it apart:\n${features.map((f) => `→ ${f}`).join("\n")}`
        : "";
      return `${intro} Built for ${audience} who value substance over hype.${featureParagraph}\n\nThe ${name} isn't just another option — it's the one that ends the search. Thoughtful design, premium materials, and details that reveal themselves over time.\n\n✓ Free shipping on orders over $50\n✓ 30-day hassle-free returns\n✓ Lifetime customer support`;
    },
    bulletTemplate: (name, features) => {
      if (features.length === 0) {
        return [
          `The ${name} — designed for people who notice the details`,
          "Premium materials selected for look, feel, and longevity",
          "Minimalist design that fits seamlessly into your routine",
          "Free shipping and 30-day returns",
        ];
      }
      const shopifyPatterns = [
        (f: string) => `${f} — engineered for the kind of performance you'll notice from day one`,
        (f: string) => `${f} — a considered choice, not a compromise`,
        (f: string) => `${f} — because the best products earn their place in your daily life`,
        (f: string) => `${f} — the detail that turns first-time buyers into repeat customers`,
        (f: string) => `${f} — designed to look and perform better than the price suggests`,
      ];
      const bullets = features.slice(0, 5).map((f, i) => shopifyPatterns[i % shopifyPatterns.length](f));
      bullets.push("Free shipping on orders over $50. 30-day returns");
      return bullets;
    },
  },
  ebay: {
    titleTemplate: (name, features) => {
      const specs = features.slice(0, 2).join(" ");
      return specs
        ? `${name} ${specs} — Brand New — Free Fast Shipping`
        : `${name} — Brand New — Premium Quality — Free Fast Shipping`;
    },
    descriptionTemplate: (name, category, features, audience) => {
      const catLabel = category ? ` (${category})` : "";
      const specs = features.length > 0
        ? `\n\nSpecifications:\n${features.map((f) => `• ${f}`).join("\n")}`
        : "";
      return `FOR SALE: ${name}${catLabel} — Brand New in Box\n\nGrab this ${name.toLowerCase()} before it's gone. Perfect for ${audience} looking for quality without overpaying.${specs}\n\nCondition: Brand new, factory sealed\nShipping: FREE — dispatched within 1 business day\nReturns: 30-day hassle-free return policy\n\n⚡ Buy with confidence — top-rated seller with 100% satisfaction guarantee.\n\nHave questions? Message us — we respond within hours.`;
    },
    bulletTemplate: (name, features) => {
      if (features.length === 0) {
        return [
          `Brand new ${name} — factory sealed in original packaging`,
          "Inspected for quality before every shipment",
          "Priced below retail — same product, better deal",
          "FREE fast shipping — dispatched within 1 business day",
          "30-day hassle-free return policy — no restocking fee",
        ];
      }
      const ebayPatterns = [
        (f: string) => `${f} — brand new, exactly as described`,
        (f: string) => `${f} — same quality you'd get in store, shipped to your door`,
        (f: string) => `${f} — verified and inspected before shipping`,
        (f: string) => `${f} — hard to find at this price point`,
        (f: string) => `${f} — see our reviews from verified buyers`,
      ];
      const bullets = features.slice(0, 5).map((f, i) => ebayPatterns[i % ebayPatterns.length](f));
      bullets.push("FREE fast shipping — dispatched within 1 business day");
      bullets.push("30-day hassle-free returns — buy with confidence");
      return bullets;
    },
  },
  generic: {
    titleTemplate: (name, features) => {
      return features.length > 0 ? `${name} — ${features[0]}` : name;
    },
    descriptionTemplate: (name, category, features, audience) => {
      const featureList = features.length > 0
        ? `\n\nFeatures:\n${features.map((f) => `- ${f}`).join("\n")}`
        : "";
      return `The ${name}${category ? ` for ${category}` : ""} — designed for ${audience} who want quality they can count on.${featureList}\n\nBacked by our satisfaction guarantee. If it doesn't meet your expectations, we'll make it right.`;
    },
    bulletTemplate: (name, features) => {
      if (features.length === 0) {
        return [
          `Premium ${name} — built with quality materials`,
          "Designed for reliability and everyday use",
          "Satisfaction guaranteed",
        ];
      }
      return [
        ...features.slice(0, 5),
        "Satisfaction guaranteed",
      ];
    },
  },
};

export function getDemoListing(input: ProductInput): GeneratedListing {
  const style = marketplaceStyles[input.marketplace] || marketplaceStyles.generic;
  return buildDemoListing(input, style);
}

const MULTI_MARKETPLACES: Marketplace[] = ["amazon", "etsy", "shopify", "ebay"];

export function getDemoListingsForAll(
  input: Omit<ProductInput, "marketplace">
): Record<Marketplace, GeneratedListing> {
  const result = {} as Record<Marketplace, GeneratedListing>;
  for (const mp of MULTI_MARKETPLACES) {
    result[mp] = getDemoListing({ ...input, marketplace: mp });
  }
  return result;
}

export const DEMO_GENERATIONS = [
  {
    id: "demo-1",
    product_name: "Organic Bamboo Cutting Board",
    marketplace: "amazon",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "demo-2",
    product_name: "Hand-Poured Soy Candle",
    marketplace: "etsy",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "demo-3",
    product_name: "Wireless Bluetooth Speaker",
    marketplace: "shopify",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "demo-4",
    product_name: "Vintage Leather Journal",
    marketplace: "ebay",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export const DEMO_PROFILE = {
  email: "demo@quicklistai.com",
  plan: "pro",
  generations_used: 4,
  generations_limit: 250,
};
