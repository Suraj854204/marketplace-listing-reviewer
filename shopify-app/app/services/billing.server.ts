export interface Plan {
  id: string;
  name: string;
  price: number;
  optimizationsPerDay: number;
  features: string[];
  recommended?: boolean;
}

export const PLANS: Record<string, Plan> = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    optimizationsPerDay: 5,
    features: [
      "5 optimizations per day",
      "Single product optimization",
      "Amazon & Shopify marketplaces",
      "Basic AI suggestions",
      "Before/after preview",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 29,
    optimizationsPerDay: -1,
    recommended: true,
    features: [
      "Unlimited optimizations",
      "Bulk optimization (up to 50 at once)",
      "All 4 marketplaces (Amazon, eBay, Etsy, Shopify)",
      "Advanced AI with brand voice",
      "Before/after preview with diff highlighting",
      "Priority processing",
      "Export optimized listings",
      "Email support",
    ],
  },
  business: {
    id: "business",
    name: "Business",
    price: 79,
    optimizationsPerDay: -1,
    features: [
      "Everything in Pro",
      "Unlimited bulk optimization",
      "Custom marketplace templates",
      "A/B testing suggestions",
      "Competitor analysis insights",
      "API access for automation",
      "Dedicated account manager",
      "Priority phone & email support",
      "Team collaboration (up to 5 seats)",
    ],
  },
};

export function getPlan(planId: string): Plan | undefined {
  return PLANS[planId];
}

export function getAllPlans(): Plan[] {
  return Object.values(PLANS);
}

export function canOptimize(
  planId: string,
  currentDailyCount: number
): boolean {
  const plan = PLANS[planId];
  if (!plan) return false;
  if (plan.optimizationsPerDay === -1) return true;
  return currentDailyCount < plan.optimizationsPerDay;
}

export function getRemainingOptimizations(
  planId: string,
  currentDailyCount: number
): number | null {
  const plan = PLANS[planId];
  if (!plan) return 0;
  if (plan.optimizationsPerDay === -1) return null; // unlimited
  return Math.max(0, plan.optimizationsPerDay - currentDailyCount);
}
