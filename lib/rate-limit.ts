// run in memory rate limiting (we should use redis for production)
const resetRateLimit = new Map<string, { count: number; expires: number }>();

export function checkRateLimit(email: string) {
  const now = Date.now();
  const entry = resetRateLimit.get(email);

  if (!entry || entry.expires < now) {
    resetRateLimit.set(email, {
      count: 1,
      expires: now + 15 * 60 * 1000,
    });
    return true;
  }

  if (entry.count >= 3) return false;

  entry.count += 1;
  return true;
}
