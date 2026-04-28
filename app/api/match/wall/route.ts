import { NextResponse } from "next/server";

import { collections, getDb } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const db = await getDb();
  const rows = await db
    .collection(collections.jdMatches)
    .find({})
    .sort({ createdAt: -1 })
    .limit(20)
    .project({
      _id: 0,
      roleTitle: 1,
      companyType: 1,
      fitScore: 1,
      createdAt: 1,
    })
    .toArray();

  return NextResponse.json({ items: rows });
}
