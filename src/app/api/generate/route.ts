import { NextRequest, NextResponse } from "next/server";
import type { Marketplace, ProductInput, GeneratedListing } from "@/types";
import { isDemoMode, getDemoListingsForAll } from "@/lib/demo";
import { generateListing } from "@/lib/ai";

const MARKETPLACES: Marketplace[] = ["amazon", "etsy", "shopify", "ebay"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, features, targetAudience, priceRange } = body;

    if (!name || !category || !features) {
      return NextResponse.json(
        { error: "Missing required fields: name, category, features" },
        { status: 400 }
      );
    }

    // Check for user-provided API key (BYOK mode)
    const userApiKey = request.headers.get("x-api-key");

    // Determine if we should use demo mode
    const useDemo = !userApiKey && isDemoMode();

    if (useDemo) {
      const listings = getDemoListingsForAll({
        name,
        category,
        features,
        targetAudience: targetAudience || undefined,
        priceRange: priceRange || undefined,
      });
      return NextResponse.json({ listings, mode: "demo" });
    }

    // Determine provider from key format
    const provider = userApiKey?.startsWith("sk-ant-") ? "anthropic" as const : undefined;
    const geminiProvider = userApiKey && !userApiKey.startsWith("sk-ant-") ? "gemini" as const : undefined;

    const options = userApiKey
      ? { apiKey: userApiKey, provider: provider || geminiProvider }
      : undefined;

    // Generate listings for all 4 marketplaces in parallel
    const results = await Promise.all(
      MARKETPLACES.map((marketplace) => {
        const input: ProductInput = {
          name,
          category,
          features,
          marketplace,
          targetAudience: targetAudience || undefined,
          priceRange: priceRange || undefined,
        };
        return generateListing(input, options);
      })
    );

    const listings: Record<string, GeneratedListing> = {};
    MARKETPLACES.forEach((mp, i) => {
      listings[mp] = results[i];
    });

    return NextResponse.json({ listings, mode: "live" });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to generate listings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
