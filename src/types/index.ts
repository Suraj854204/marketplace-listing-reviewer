export type Marketplace = 'amazon' | 'etsy' | 'shopify' | 'ebay' | 'generic';

export interface ProductInput {
  name: string;
  category: string;
  features: string;
  marketplace: Marketplace;
  targetAudience?: string;
  priceRange?: string;
}

export interface GeneratedListing {
  title: string;
  description: string;
  bulletPoints: string[];
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  imageAltText: string;
  marketplace: Marketplace;
}

export interface GenerationResult {
  id: string;
  input: ProductInput;
  listing: GeneratedListing;
  createdAt: string;
}
