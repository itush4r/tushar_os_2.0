import { NextRequest, NextResponse } from "next/server";
import { getDb, collections } from "@/lib/mongo";
import { hashIp } from "@/lib/hash-ip";

export type RateLimitOpts = {
  endpoint: string;
  limit: number;
  windowMs: number;
};

export type RateLimitDecision =
  | { allowed: true; count: number; remaining: number; resetAt: Date }
  | { allowed: false; retryAfterSec: number };

export function getClientIp(req: NextRequest | Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export function decideRateLimit(args: {
  count: number;
  windowStart: Date;
  limit: number;
  windowMs: number;
  now: Date;
}): RateLimitDecision {
  const { count, windowStart, limit, windowMs, now } = args;
  const elapsed = now.getTime() - windowStart.getTime();

  if (elapsed >= windowMs) {
    const resetAt = new Date(now.getTime() + windowMs);
    return { allowed: true, count: 1, remaining: limit - 1, resetAt };
  }

  const newCount = count + 1;
  if (newCount > limit) {
    const retryAfterSec = Math.ceil((windowMs - elapsed) / 1000);
    return { allowed: false, retryAfterSec };
  }

  const resetAt = new Date(windowStart.getTime() + windowMs);
  return { allowed: true, count: newCount, remaining: limit - newCount, resetAt };
}

export function withRateLimit<R>(
  handler: (req: NextRequest) => Promise<R>,
  opts: RateLimitOpts,
) {
  return async (req: NextRequest): Promise<R | NextResponse> => {
    const ip = getClientIp(req);
    const ipHash = hashIp(ip);
    const now = new Date();

    const db = await getDb();
    const col = db.collection(collections.rateLimits);

    // Atomic upsert + read existing state in one round trip.
    const existing = await col.findOneAndUpdate(
      { ipHash, endpoint: opts.endpoint },
      { $setOnInsert: { ipHash, endpoint: opts.endpoint, count: 0, windowStart: now } },
      { upsert: true, returnDocument: "before" },
    );

    const currentCount = (existing?.count as number | undefined) ?? 0;
    const currentWindowStart = (existing?.windowStart as Date | undefined) ?? now;

    const decision = decideRateLimit({
      count: currentCount,
      windowStart: currentWindowStart,
      limit: opts.limit,
      windowMs: opts.windowMs,
      now,
    });

    if (!decision.allowed) {
      return NextResponse.json(
        { error: "rate_limited", retryAfterSec: decision.retryAfterSec },
        {
          status: 429,
          headers: { "Retry-After": String(decision.retryAfterSec) },
        },
      );
    }

    // Reset window if we crossed the boundary, otherwise increment.
    const elapsed = now.getTime() - currentWindowStart.getTime();
    if (elapsed >= opts.windowMs) {
      await col.updateOne(
        { ipHash, endpoint: opts.endpoint },
        { $set: { count: 1, windowStart: now } },
      );
    } else {
      await col.updateOne(
        { ipHash, endpoint: opts.endpoint },
        { $inc: { count: 1 } },
      );
    }

    return handler(req);
  };
}
