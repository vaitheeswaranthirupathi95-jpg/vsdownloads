type RateLimitStore = Map<string, { count: number; resetTime: number }>;

const analyzeStore: RateLimitStore = new Map();
const downloadStore: RateLimitStore = new Map();

const ANALYZE_LIMIT = parseInt(process.env.RATE_LIMIT_ANALYZE || "10", 10);
const DOWNLOAD_LIMIT = parseInt(process.env.RATE_LIMIT_DOWNLOAD || "5", 10);
const WINDOW_MS = 60 * 1000; // 1 minute

function cleanStore(store: RateLimitStore) {
  const now = Date.now();
  for (const [ip, data] of store.entries()) {
    if (now > data.resetTime) {
      store.delete(ip);
    }
  }
}

export function checkRateLimit(
  ip: string,
  type: "analyze" | "download"
): { allowed: boolean; remaining: number; resetTime: number } {
  const store = type === "analyze" ? analyzeStore : downloadStore;
  const limit = type === "analyze" ? ANALYZE_LIMIT : DOWNLOAD_LIMIT;
  const now = Date.now();

  cleanStore(store);

  const clientData = store.get(ip);

  if (!clientData) {
    const resetTime = now + WINDOW_MS;
    store.set(ip, { count: 1, resetTime });
    return { allowed: true, remaining: limit - 1, resetTime };
  }

  if (now > clientData.resetTime) {
    const resetTime = now + WINDOW_MS;
    store.set(ip, { count: 1, resetTime });
    return { allowed: true, remaining: limit - 1, resetTime };
  }

  if (clientData.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: clientData.resetTime };
  }

  clientData.count += 1;
  return { allowed: true, remaining: limit - clientData.count, resetTime: clientData.resetTime };
}
