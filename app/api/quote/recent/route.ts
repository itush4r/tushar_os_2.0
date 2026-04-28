import { NextResponse } from "next/server";

import { collections, getDb } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const db = await getDb();
  const rows = await db
    .collection(collections.flightDemos)
    .find({ isPublic: true })
    .sort({ createdAt: -1 })
    .limit(5)
    .project({ _id: 0, prompt: 1, generatedQuote: 1, createdAt: 1 })
    .toArray();
  return NextResponse.json({ items: rows });
}
