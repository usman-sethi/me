import "server-only";

interface Bucket {
  count: number;
  resetAt: number;
}

// In-memory only: resets on redeploy/restart and isn't shared across
// serverless instances. Fine for a single-admin login form on a
// single-region deployment; swap for Upstash Redis (or similar) first if
// this ever runs across multiple instances/regions.
const buckets = new Map<string, Bucket>();

export function isRateLimited(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}
