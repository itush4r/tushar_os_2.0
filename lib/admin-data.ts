import { collections, getDb } from "@/lib/mongo";

export type DateRange = "today" | "7d" | "30d" | "all";

function rangeStart(range: DateRange): Date | null {
  const now = Date.now();
  switch (range) {
    case "today":
      return new Date(new Date().setHours(0, 0, 0, 0));
    case "7d":
      return new Date(now - 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now - 30 * 24 * 60 * 60 * 1000);
    case "all":
      return null;
  }
}

export type ConversationSummary = {
  sessionId: string;
  ipHash: string;
  startedAt: Date;
  messageCount: number;
  preview: string;
};

export type ConversationDetail = ConversationSummary & {
  messages: Array<{ role: string; content: string; at: Date }>;
};

export async function listConversations(opts: {
  range: DateRange;
  page: number;
  pageSize: number;
}): Promise<{ items: ConversationSummary[]; total: number }> {
  const db = await getDb();
  const start = rangeStart(opts.range);
  const filter = start ? { startedAt: { $gte: start } } : {};

  const total = await db.collection(collections.chatSessions).countDocuments(filter);
  const rows = await db
    .collection(collections.chatSessions)
    .find(filter)
    .sort({ startedAt: -1 })
    .skip(opts.page * opts.pageSize)
    .limit(opts.pageSize)
    .toArray();

  const items = rows.map((r) => {
    const msgs = (r.messages ?? []) as Array<{ role: string; content: string }>;
    const firstUser = msgs.find((m) => m.role === "user");
    return {
      sessionId: r.sessionId as string,
      ipHash: r.ipHash as string,
      startedAt: r.startedAt as Date,
      messageCount: msgs.length,
      preview: (firstUser?.content ?? "").slice(0, 100),
    };
  });
  return { items, total };
}

export async function getConversation(sessionId: string): Promise<ConversationDetail | null> {
  const db = await getDb();
  const r = await db.collection(collections.chatSessions).findOne({ sessionId });
  if (!r) return null;
  return {
    sessionId: r.sessionId,
    ipHash: r.ipHash,
    startedAt: r.startedAt,
    messages: (r.messages ?? []) as Array<{ role: string; content: string; at: Date }>,
    messageCount: (r.messages ?? []).length,
    preview: "",
  };
}

export type TopQuestion = {
  question: string;
  askedCount: number;
  category: string;
  lastAskedAt: Date;
};

export async function listTopQuestions(opts: {
  range: DateRange;
  limit: number;
}): Promise<TopQuestion[]> {
  const db = await getDb();
  const start = rangeStart(opts.range);
  const filter = start ? { lastAskedAt: { $gte: start } } : {};
  const rows = await db
    .collection(collections.chatAnalytics)
    .find(filter)
    .sort({ askedCount: -1 })
    .limit(opts.limit)
    .toArray();
  return rows.map((r) => ({
    question: r.question as string,
    askedCount: r.askedCount as number,
    category: r.category as string,
    lastAskedAt: r.lastAskedAt as Date,
  }));
}

export type JdMatchSummary = {
  roleTitle: string;
  companyType: string;
  fitScore: number;
  createdAt: Date;
};

export async function listJdMatches(opts: {
  range: DateRange;
  limit: number;
}): Promise<JdMatchSummary[]> {
  const db = await getDb();
  const start = rangeStart(opts.range);
  const filter = start ? { createdAt: { $gte: start } } : {};
  const rows = await db
    .collection(collections.jdMatches)
    .find(filter)
    .sort({ createdAt: -1 })
    .limit(opts.limit)
    .toArray();
  return rows.map((r) => ({
    roleTitle: r.roleTitle as string,
    companyType: r.companyType as string,
    fitScore: r.fitScore as number,
    createdAt: r.createdAt as Date,
  }));
}

export type AdminSummary = {
  totalConversations: number;
  uniqueIps: number;
  avgMessagesPerSession: number;
};

export async function getSummary(range: DateRange): Promise<AdminSummary> {
  const db = await getDb();
  const start = rangeStart(range);
  const filter = start ? { startedAt: { $gte: start } } : {};
  const col = db.collection(collections.chatSessions);

  const totalConversations = await col.countDocuments(filter);
  const uniqueIpsAgg = await col
    .aggregate([{ $match: filter }, { $group: { _id: "$ipHash" } }, { $count: "n" }])
    .toArray();
  const uniqueIps = (uniqueIpsAgg[0]?.n as number | undefined) ?? 0;

  const avgAgg = await col
    .aggregate([
      { $match: filter },
      { $project: { count: { $size: { $ifNull: ["$messages", []] } } } },
      { $group: { _id: null, avg: { $avg: "$count" } } },
    ])
    .toArray();
  const avgMessagesPerSession = Math.round(((avgAgg[0]?.avg as number | undefined) ?? 0) * 10) / 10;

  return { totalConversations, uniqueIps, avgMessagesPerSession };
}

export function toCsv(rows: Array<Record<string, unknown>>): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]!);
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = v instanceof Date ? v.toISOString() : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const body = rows.map((r) => headers.map((h) => escape(r[h])).join(",")).join("\n");
  return `${headers.join(",")}\n${body}`;
}
