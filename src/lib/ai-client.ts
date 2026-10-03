/**
 * Client-side AI generation using Gemini REST API.
 * Used in static export mode (GitHub Pages) when a user provides their own API key (BYOK).
 * Calls generativelanguage.googleapis.com directly from the browser — no server needed.
 */

import type { ProductInput, GeneratedListing, Marketplace } from "@/types";

const MARKETPLACE_INSTRUCTIONS: Record<Marketplace, string> = {
  amazon: `Optimize for Amazon's A9 search algorithm:
- Title: Include primary keyword first, brand name, key features, size/color. Max 200 characters.
- Bullet points: Start each with a CAPITAL keyword phrase. Focus on benefits over features.
- Description: Use HTML formatting. Include long-tail keywords naturally.
- Backend keywords: Include misspellings, synonyms, and related terms.`,

  etsy: `Optimize for Etsy's search algorithm:
- Title: Use all 140 characters. Front-load with primary keywords. Include long-tail phrases.
- Tags: Use all 13 tags with multi-word phrases. Include gift-related terms if applicable.
- Description: Tell a story about the product. Include materials, dimensions, care instructions.
- Focus on long-tail keywords and niche-specific terminology.`,

  shopify: `Optimize for Shopify brand storytelling and SEO:
- Title: Clean, branded, and keyword-rich. Keep under 70 characters for SEO.
- Description: Lead with brand story and lifestyle benefits. Use rich formatting.
- SEO: Optimize meta title (60 chars) and meta description (155 chars).
- Focus on emotional connection and brand voice consistency.`,

  ebay: `Optimize for eBay's Cassini search engine:
- Title: Use all 80 characters. Include item specifics, brand, model, condition.
- Item specifics: Be as detailed as possible - eBay heavily weights these.
- Description: Include shipping info, return policy mentions, and condition details.
- Use specific product identifiers (UPC, MPN, ISBN) when applicable.`,

  generic: `Create a versatile product listing optimized for general e-commerce:
- Title: Clear, keyword-rich, under 100 characters.
- Description: Benefit-focused with clear formatting.
- Include comprehensive SEO metadata.
- Balance between keyword optimization and readability.`,
};

function buildPrompt(input: ProductInput): string {
  const marketplaceGuide = MARKETPLACE_INSTRUCTIONS[input.marketplace];

  return `You are an expert e-commerce copywriter and SEO specialist. Generate an optimized product listing based on the following information.

PRODUCT DETAILS:
- Product Name: ${input.name}
- Category: ${input.category}
- Key Features: ${input.features}
- Target Marketplace: ${input.marketplace}
${input.targetAudience ? `- Target Audience: ${input.targetAudience}` : ""}
${input.priceRange ? `- Price Range: ${input.priceRange}` : ""}

MARKETPLACE-SPECIFIC GUIDELINES:
${marketplaceGuide}

INSTRUCTIONS:
Generate a complete, optimized product listing. Return ONLY valid JSON with this exact structure:
{
  "title": "Optimized product title",
  "description": "Full product description with rich detail (2-3 paragraphs)",
  "bulletPoints": ["Benefit-focused bullet point 1", "Bullet point 2", "Bullet point 3", "Bullet point 4", "Bullet point 5"],
  "metaTitle": "SEO meta title (max 60 characters)",
  "metaDescription": "SEO meta description (max 155 characters)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8"],
  "imageAltText": "Descriptive alt text for the main product image"
}

IMPORTANT: Return ONLY the JSON object. No markdown, no code fences, no explanation.`;
}

function parseResponse(
  content: string,
  marketplace: Marketplace
): GeneratedListing {
  const cleaned = content
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse AI response. Please try again.");
  }

  const listing: GeneratedListing = {
    title: String(parsed.title || ""),
    description: String(parsed.description || ""),
    bulletPoints: Array.isArray(parsed.bulletPoints)
      ? parsed.bulletPoints.map(String)
      : [],
    metaTitle: String(parsed.metaTitle || ""),
    metaDescription: String(parsed.metaDescription || ""),
    seoKeywords: Array.isArray(parsed.seoKeywords)
      ? parsed.seoKeywords.map(String)
      : [],
    imageAltText: String(parsed.imageAltText || ""),
    marketplace,
  };

  if (!listing.title || !listing.description) {
    throw new Error("AI response missing required fields. Please try again.");
  }

  return listing;
}

async function callGeminiFromBrowser(
  prompt: string,
  apiKey: string
): Promise<string> {
  const model = "gemini-3.5-flash-lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 400 || response.status === 403) {
      throw new Error(
        "Invalid API key. Please check your Gemini API key in Settings."
      );
    }
    if (response.status === 429) {
      throw new Error(
        "Rate limit reached. Please wait a moment and try again."
      );
    }
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    throw new Error("Empty response from Gemini. Please try again.");
  }

  return content;
}

const MARKETPLACES: Marketplace[] = ["amazon", "etsy", "shopify", "ebay"];

export async function generateListingsClientSide(
  input: Omit<ProductInput, "marketplace">,
  apiKey: string
): Promise<{ listings: Record<Marketplace, GeneratedListing>; mode: "live" }> {
  const results = await Promise.all(
    MARKETPLACES.map(async (marketplace) => {
      const prompt = buildPrompt({ ...input, marketplace });
      const content = await callGeminiFromBrowser(prompt, apiKey);
      return parseResponse(content, marketplace);
    })
  );

  const listings = {} as Record<Marketplace, GeneratedListing>;
  MARKETPLACES.forEach((mp, i) => {
    listings[mp] = results[i];
  });

  return { listings, mode: "live" };
}
