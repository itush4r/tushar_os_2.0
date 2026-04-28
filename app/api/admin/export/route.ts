import { NextRequest, NextResponse } from "next/server";

import {
  listConversations,
  listJdMatches,
  listTopQuestions,
  toCsv,
  type DateRange,
} from "@/lib/admin-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function asRange(v: string | null): DateRange {
  if (v === "today" || v === "7d" || v === "30d" || v === "all") return v;
  return "7d";
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const tab = sp.get("tab") ?? "conversations";
  const range = asRange(sp.get("range"));

  let csv = "";
  let filename = "export.csv";

  if (tab === "questions") {
    const rows = await listTopQuestions({ range, limit: 1000 });
    csv = toCsv(rows);
    filename = `top-questions-${range}.csv`;
  } else if (tab === "matches") {
    const rows = await listJdMatches({ range, limit: 1000 });
    csv = toCsv(rows);
    filename = `jd-matches-${range}.csv`;
  } else {
    const { items } = await listConversations({ range, page: 0, pageSize: 1000 });
    csv = toCsv(items);
    filename = `conversations-${range}.csv`;
  }

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
