import type { ProductInput, GeneratedListing, Marketplace } from "@/types";
import { isDemoMode, getDemoListing } from "@/lib/demo";

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

type AIProvider = "gemini" | "anthropic";

function getProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || "").toLowerCase();
  if (provider === "gemini") return "gemini";
  return "anthropic";
}

async function callAnthropicAPI(
  prompt: string,
  overrideKey?: string
): Promise<string> {
  const apiKey = overrideKey || process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === "your-key-here") {
    throw new Error(
      "ANTHROPIC_API_KEY is not configured. Please add a valid API key to .env.local"
    );
  }

  const model = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;

  if (!content) {
    throw new Error("Empty response from Anthropic API");
  }

  return content;
}

async function callGeminiAPI(
  prompt: string,
  overrideKey?: string
): Promise<string> {
  const apiKey = overrideKey || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your-key-here") {
    throw new Error(
      "GEMINI_API_KEY is not configured. Please add a valid API key to .env.local"
    );
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
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
    const error = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    throw new Error("Empty response from Gemini API");
  }

  return content;
}

function parseAIResponse(
  content: string,
  marketplace: ProductInput["marketplace"]
): GeneratedListing {
  let parsed: Record<string, unknown>;
  try {
    const cleaned = content
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse AI response as JSON");
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
    throw new Error("AI response missing required fields (title, description)");
  }

  return listing;
}

export interface GenerateOptions {
  apiKey?: string;
  provider?: AIProvider;
}

export async function generateListing(
  input: ProductInput,
  options?: GenerateOptions
): Promise<GeneratedListing> {
  const hasOverrideKey = !!options?.apiKey;

  if (!hasOverrideKey && isDemoMode()) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getDemoListing(input);
  }

  const prompt = buildPrompt(input);
  const provider = options?.provider || getProvider();

  const content =
    provider === "gemini"
      ? await callGeminiAPI(prompt, options?.apiKey)
      : await callAnthropicAPI(prompt, options?.apiKey);

  return parseAIResponse(content, input.marketplace);
}
