import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { collections, getDb } from "@/lib/mongo";
import { moderateMessage } from "@/lib/moderation";
import { withRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const postSchema = z.object({
  name: z.string().min(1).max(50),
  message: z.string().min(1).max(300),
  // Honeypot — bots fill it, humans don't.
  website: z.string().max(0).optional().or(z.literal("")),
});

async function handlePost(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = postSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_body", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const { name, message, website } = parsed.data;

  // Honeypot tripped — silently say success without doing anything so the
  // bot doesn't learn it was rejected.
  if (website && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const moderation = await moderateMessage({ name, message });

  const db = await getDb();
  await db.collection(collections.guestbook).insertOne({
    name,
    message,
    moderationStatus: moderation.approved ? "approved" : "rejected",
    moderationReason: moderation.approved ? null : moderation.reason,
    createdAt: new Date(),
  });

  if (!moderation.approved) {
    return NextResponse.json(
      {
        success: false,
        reason: "We couldn't post that. Try a different note.",
      },
      { status: 200 },
    );
  }

  return NextResponse.json({ success: true });
}

export const POST = withRateLimit(handlePost, {
  endpoint: "guestbook",
  limit: 3,
  windowMs: 24 * 60 * 60 * 1000,
});

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const page = Math.max(0, Number.parseInt(sp.get("page") ?? "0", 10) || 0);
  const pageSize = 10;

  const db = await getDb();
  const filter = { moderationStatus: "approved" };
  const total = await db.collection(collections.guestbook).countDocuments(filter);
  const rows = await db
    .collection(collections.guestbook)
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .project({ _id: 0, name: 1, message: 1, createdAt: 1 })
    .toArray();

  return NextResponse.json({
    items: rows,
    total,
    page,
    pageSize,
    hasMore: (page + 1) * pageSize < total,
  });
}
