const STORAGE_KEY = "quicklist-ai-usage";
const BYOK_STORAGE_KEY = "quicklist-ai-byok-usage";
const FREE_LIMIT = 3;
const BYOK_LIMIT = 10;

interface UsageData {
  date: string;
  count: number;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getUsageDataForKey(key: string): UsageData {
  if (typeof window === "undefined") return { date: getToday(), count: 0 };
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { date: getToday(), count: 0 };
    const data: UsageData = JSON.parse(raw);
    if (data.date !== getToday()) return { date: getToday(), count: 0 };
    return data;
  } catch {
    return { date: getToday(), count: 0 };
  }
}

function getUsageData(): UsageData {
  return getUsageDataForKey(STORAGE_KEY);
}

export function getUsageCount(): number {
  return getUsageData().count;
}

export function getRemainingGenerations(authLimit?: number): number {
  const limit = authLimit ?? FREE_LIMIT;
  return Math.max(0, limit - getUsageData().count);
}

export function hasReachedLimit(authLimit?: number): boolean {
  const limit = authLimit ?? FREE_LIMIT;
  return getUsageData().count >= limit;
}

export function incrementUsage(): void {
  const data = getUsageData();
  data.count += 1;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

// BYOK usage tracking
export function getByokUsageCount(): number {
  return getUsageDataForKey(BYOK_STORAGE_KEY).count;
}

export function getByokRemainingGenerations(): number {
  return Math.max(0, BYOK_LIMIT - getUsageDataForKey(BYOK_STORAGE_KEY).count);
}

export function hasByokReachedLimit(): boolean {
  return getUsageDataForKey(BYOK_STORAGE_KEY).count >= BYOK_LIMIT;
}

export function incrementByokUsage(): void {
  const data = getUsageDataForKey(BYOK_STORAGE_KEY);
  data.count += 1;
  if (typeof window !== "undefined") {
    localStorage.setItem(BYOK_STORAGE_KEY, JSON.stringify(data));
  }
}

export const FREE_DAILY_LIMIT = FREE_LIMIT;
export const BYOK_DAILY_LIMIT = BYOK_LIMIT;
