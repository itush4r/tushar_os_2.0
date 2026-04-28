// TEMP: verification endpoint for issue #5. Remove once /api/chat is live.
import { NextRequest, NextResponse } from "next/server";
import { withRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

async function handler(_req: NextRequest) {
  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}

export const POST = withRateLimit(handler, {
  endpoint: "test",
  limit: 10,
  windowMs: 60 * 60 * 1000,
});
