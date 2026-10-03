/**
 * Shopify Admin API service.
 *
 * In a real Shopify app these functions would use an authenticated session
 * obtained via the Shopify OAuth flow. For now they return realistic mock
 * data so the UI can be developed and demonstrated without a live store.
 */

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: { src: string }[];
  status: "active" | "draft" | "archived";
  vendor: string;
  productType: string;
  handle: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopifySession {
  shop: string;
  accessToken: string;
}

// ---------- Mock product catalog ----------

const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: "gid://shopify/Product/1001",
    title: "Vintage Leather Messenger Bag",
    description:
      "A classic leather messenger bag. Good for work or school. Brown color.",
    tags: ["bag", "leather", "messenger"],
    images: [{ src: "https://placehold.co/400x400?text=Messenger+Bag" }],
    status: "active",
    vendor: "QuickList Demo",
    productType: "Bags",
    handle: "vintage-leather-messenger-bag",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-01T14:30:00Z",
  },
  {
    id: "gid://shopify/Product/1002",
    title: "Organic Cotton T-Shirt",
    description: "Soft cotton t-shirt. Available in multiple sizes. Unisex.",
    tags: ["tshirt", "cotton", "organic"],
    images: [{ src: "https://placehold.co/400x400?text=T-Shirt" }],
    status: "active",
    vendor: "QuickList Demo",
    productType: "Clothing",
    handle: "organic-cotton-tshirt",
    createdAt: "2024-02-10T08:00:00Z",
    updatedAt: "2024-05-20T09:15:00Z",
  },
  {
    id: "gid://shopify/Product/1003",
    title: "Wireless Bluetooth Earbuds",
    description:
      "Bluetooth earbuds with charging case. Good sound quality. Battery lasts long.",
    tags: ["earbuds", "bluetooth", "wireless"],
    images: [{ src: "https://placehold.co/400x400?text=Earbuds" }],
    status: "active",
    vendor: "QuickList Demo",
    productType: "Electronics",
    handle: "wireless-bluetooth-earbuds",
    createdAt: "2024-03-05T12:00:00Z",
    updatedAt: "2024-07-10T16:45:00Z",
  },
  {
    id: "gid://shopify/Product/1004",
    title: "Handmade Ceramic Coffee Mug",
    description: "Ceramic mug, handmade. Holds 12oz. Dishwasher safe.",
    tags: ["mug", "ceramic", "handmade"],
    images: [{ src: "https://placehold.co/400x400?text=Coffee+Mug" }],
    status: "active",
    vendor: "QuickList Demo",
    productType: "Kitchen",
    handle: "handmade-ceramic-coffee-mug",
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-04-15T10:30:00Z",
  },
  {
    id: "gid://shopify/Product/1005",
    title: "Yoga Mat Premium",
    description: "Thick yoga mat. Non-slip surface. Comes with carrying strap.",
    tags: ["yoga", "mat", "fitness"],
    images: [{ src: "https://placehold.co/400x400?text=Yoga+Mat" }],
    status: "active",
    vendor: "QuickList Demo",
    productType: "Fitness",
    handle: "yoga-mat-premium",
    createdAt: "2024-04-01T09:00:00Z",
    updatedAt: "2024-08-01T13:00:00Z",
  },
  {
    id: "gid://shopify/Product/1006",
    title: "Stainless Steel Water Bottle",
    description:
      "Water bottle made of stainless steel. Keeps drinks cold. 32oz capacity.",
    tags: ["bottle", "water", "stainless steel"],
    images: [{ src: "https://placehold.co/400x400?text=Water+Bottle" }],
    status: "active",
    vendor: "QuickList Demo",
    productType: "Drinkware",
    handle: "stainless-steel-water-bottle",
    createdAt: "2024-02-28T15:00:00Z",
    updatedAt: "2024-06-15T11:00:00Z",
  },
  {
    id: "gid://shopify/Product/1007",
    title: "Scented Soy Candle",
    description: "Soy candle with lavender scent. Burns for 40 hours. Glass jar.",
    tags: ["candle", "soy", "lavender"],
    images: [{ src: "https://placehold.co/400x400?text=Soy+Candle" }],
    status: "active",
    vendor: "QuickList Demo",
    productType: "Home Decor",
    handle: "scented-soy-candle",
    createdAt: "2024-05-10T10:00:00Z",
    updatedAt: "2024-09-01T08:00:00Z",
  },
  {
    id: "gid://shopify/Product/1008",
    title: "Minimalist Leather Wallet",
    description: "Slim leather wallet. Fits cards and cash. RFID blocking.",
    tags: ["wallet", "leather", "minimalist"],
    images: [{ src: "https://placehold.co/400x400?text=Wallet" }],
    status: "active",
    vendor: "QuickList Demo",
    productType: "Accessories",
    handle: "minimalist-leather-wallet",
    createdAt: "2024-03-18T14:00:00Z",
    updatedAt: "2024-07-20T12:00:00Z",
  },
];

// ---------- Public API ----------

/**
 * Create a Shopify app subscription for billing.
 * In production this calls the GraphQL Admin API `appSubscriptionCreate` mutation.
 */
export async function createAppSubscription(
  shop: string,
  plan: { name: string; price: number; trialDays?: number }
): Promise<{ confirmationUrl: string }> {
  console.log(
    `[shopify.server] Creating subscription for ${shop}: ${plan.name} at $${plan.price}/mo`
  );

  // Mock: return a fake confirmation URL
  return {
    confirmationUrl: `https://${shop}/admin/charges/confirm?plan=${plan.name.toLowerCase()}`,
  };
}

/**
 * Fetch products from the store.
 * In production this uses the REST or GraphQL Admin API with the session's access token.
 */
export async function getProducts(
  _shop: string,
  _session?: ShopifySession
): Promise<ShopifyProduct[]> {
  // Return mock data for demo mode
  return MOCK_PRODUCTS;
}

/**
 * Fetch a single product by ID.
 */
export async function getProduct(
  _shop: string,
  productId: string,
  _session?: ShopifySession
): Promise<ShopifyProduct | undefined> {
  return MOCK_PRODUCTS.find((p) => p.id === productId);
}

/**
 * Update a product listing in Shopify.
 * In production this calls PUT /admin/api/2024-10/products/{id}.json
 */
export async function updateProduct(
  _shop: string,
  _session: ShopifySession | undefined,
  productId: string,
  data: { title?: string; description?: string; tags?: string[] }
): Promise<{ success: boolean; product: ShopifyProduct }> {
  console.log(`[shopify.server] Updating product ${productId}:`, data);

  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Product ${productId} not found`);
  }

  // In demo mode, return the updated version without persisting
  return {
    success: true,
    product: {
      ...product,
      title: data.title ?? product.title,
      description: data.description ?? product.description,
      tags: data.tags ?? product.tags,
      updatedAt: new Date().toISOString(),
    },
  };
}

/**
 * Get optimization usage count from Shopify metafields.
 * In production this reads from app metafields on the shop resource.
 */
export async function getOptimizationCount(
  _shop: string
): Promise<{ daily: number; total: number }> {
  return {
    daily: 3,
    total: 127,
  };
}
