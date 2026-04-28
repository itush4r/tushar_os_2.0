import assert from "node:assert/strict";
import { decideRateLimit } from "../lib/rate-limit";

const limit = 10;
const windowMs = 60 * 60 * 1000;
const now = new Date("2026-04-28T12:00:00.000Z");

// 1. Below limit, within window → allowed, count + 1
{
  const d = decideRateLimit({
    count: 5,
    windowStart: new Date(now.getTime() - 10_000),
    limit,
    windowMs,
    now,
  });
  assert.equal(d.allowed, true);
  assert.equal(d.allowed && d.count, 6);
  assert.equal(d.allowed && d.remaining, 4);
}

// 2. At the limit (count=10), within window → 11th is blocked
{
  const d = decideRateLimit({
    count: 10,
    windowStart: new Date(now.getTime() - 10_000),
    limit,
    windowMs,
    now,
  });
  assert.equal(d.allowed, false);
  assert.ok(!d.allowed && d.retryAfterSec > 0);
}

// 3. Reset boundary: windowStart older than windowMs → counter resets
{
  const d = decideRateLimit({
    count: 99,
    windowStart: new Date(now.getTime() - windowMs - 1),
    limit,
    windowMs,
    now,
  });
  assert.equal(d.allowed, true);
  assert.equal(d.allowed && d.count, 1);
  assert.equal(d.allowed && d.remaining, limit - 1);
}

// 4. Exact boundary (elapsed === windowMs) → resets
{
  const d = decideRateLimit({
    count: 99,
    windowStart: new Date(now.getTime() - windowMs),
    limit,
    windowMs,
    now,
  });
  assert.equal(d.allowed, true);
  assert.equal(d.allowed && d.count, 1);
}

// 5. retryAfterSec rounds up (never returns 0 inside window when blocked)
{
  const d = decideRateLimit({
    count: 10,
    windowStart: new Date(now.getTime() - (windowMs - 500)),
    limit,
    windowMs,
    now,
  });
  assert.equal(d.allowed, false);
  assert.equal(d.allowed === false && d.retryAfterSec, 1);
}

// eslint-disable-next-line no-console
console.log("✓ rate-limit logic tests pass");
