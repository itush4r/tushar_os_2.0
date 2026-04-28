import { NextResponse } from "next/server";

import { collections, getDb } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SEED_PROMPTS = [
  "2 adults Mumbai to Goa next Friday return Sunday economy",
  "1 adult Delhi to Bangalore tomorrow business class one-way",
  "Family of 4 (2 adults, 2 kids) Bangalore to Singapore in 3 weeks for 10 days",
  "Solo trip BOM to LHR next month, premium economy, return after 2 weeks",
  "Couple from Chennai to Tokyo around Diwali, business class",
];

export async function GET() {
  const db = await getDb();
  const rows = await db
    .collection(collections.flightDemos)
    .find({ isPublic: true })
    .sort({ createdAt: -1 })
    .limit(20)
    .project({ _id: 0, prompt: 1 })
    .toArray();

  const pool = rows.length > 0 ? rows.map((r) => r.prompt as string) : SEED_PROMPTS;
  const idx = Math.floor(Math.random() * pool.length);
  return NextResponse.json({ prompt: pool[idx] });
}
