import Link from "next/link";

import {
  getSummary,
  listConversations,
  listJdMatches,
  listTopQuestions,
  type DateRange,
} from "@/lib/admin-data";

export const dynamic = "force-dynamic";

const RANGES: DateRange[] = ["today", "7d", "30d", "all"];
const TABS = [
  { key: "conversations", label: "Conversations" },
  { key: "questions", label: "Top Questions" },
  { key: "matches", label: "JD Matches" },
] as const;

type Tab = (typeof TABS)[number]["key"];

type SP = { tab?: string; range?: string; page?: string };

function asTab(v: string | undefined): Tab {
  if (v === "questions" || v === "matches") return v;
  return "conversations";
}

function asRange(v: string | undefined): DateRange {
  if (v === "today" || v === "7d" || v === "30d" || v === "all") return v;
  return "7d";
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<SP>;
}) {
  const sp = (await searchParams) ?? {};
  const tab = asTab(sp.tab);
  const range = asRange(sp.range);
  const page = Number.parseInt(sp.page ?? "0", 10) || 0;
  const pageSize = 20;

  const summary = await getSummary(range);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Admin</h1>
        <p className="text-xs text-muted">range: {range}</p>
      </header>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <SummaryCard label="Conversations" value={String(summary.totalConversations)} />
        <SummaryCard label="Unique visitors" value={String(summary.uniqueIps)} />
        <SummaryCard label="Avg msgs / session" value={String(summary.avgMessagesPerSession)} />
      </div>

      <nav className="mt-8 flex flex-wrap items-center gap-3 border-b border-border pb-3">
        <div className="flex gap-1">
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <Link
                key={t.key}
                href={`/admin?tab=${t.key}&range=${range}`}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active ? "bg-surface text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
        <div className="ml-auto flex gap-1">
          {RANGES.map((r) => {
            const active = range === r;
            return (
              <Link
                key={r}
                href={`/admin?tab=${tab}&range=${r}`}
                className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                  active ? "bg-surface text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {r}
              </Link>
            );
          })}
        </div>
        <a
          href={`/api/admin/export?tab=${tab}&range=${range}`}
          className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted hover:text-foreground"
          download
        >
          ↓ CSV
        </a>
      </nav>

      <main className="mt-6">
        {tab === "conversations" && (
          <ConversationsTab range={range} page={page} pageSize={pageSize} />
        )}
        {tab === "questions" && <QuestionsTab range={range} />}
        {tab === "matches" && <MatchesTab range={range} />}
      </main>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-[11px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

async function ConversationsTab({
  range,
  page,
  pageSize,
}: {
  range: DateRange;
  page: number;
  pageSize: number;
}) {
  const { items, total } = await listConversations({ range, page, pageSize });
  const lastPage = Math.max(0, Math.ceil(total / pageSize) - 1);

  if (items.length === 0) {
    return <p className="text-sm text-muted">No conversations in this range yet.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((c) => (
        <details
          key={c.sessionId}
          className="rounded-xl border border-border bg-surface p-4 [&[open]>summary>span:last-child]:rotate-180"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between">
            <div>
              <p className="text-xs text-muted">
                {new Date(c.startedAt).toLocaleString()} · {c.messageCount} messages · ip{" "}
                {c.ipHash.slice(0, 8)}
              </p>
              <p className="mt-1 text-sm text-foreground">{c.preview || "(no user message)"}</p>
            </div>
            <span className="text-muted transition-transform">▾</span>
          </summary>
          <ConversationFull sessionId={c.sessionId} />
        </details>
      ))}
      <div className="flex items-center justify-between pt-2 text-xs text-muted">
        <span>
          page {page + 1} of {lastPage + 1} · {total} total
        </span>
        <div className="flex gap-2">
          <PagerLink range={range} page={Math.max(0, page - 1)} disabled={page === 0}>
            ← prev
          </PagerLink>
          <PagerLink
            range={range}
            page={Math.min(lastPage, page + 1)}
            disabled={page >= lastPage}
          >
            next →
          </PagerLink>
        </div>
      </div>
    </div>
  );
}

function PagerLink({
  range,
  page,
  disabled,
  children,
}: {
  range: DateRange;
  page: number;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) return <span className="opacity-30">{children}</span>;
  return (
    <Link
      href={`/admin?tab=conversations&range=${range}&page=${page}`}
      className="hover:text-foreground"
    >
      {children}
    </Link>
  );
}

async function ConversationFull({ sessionId }: { sessionId: string }) {
  const { getConversation } = await import("@/lib/admin-data");
  const c = await getConversation(sessionId);
  if (!c) return null;
  return (
    <div className="mt-4 space-y-2 border-t border-border pt-4">
      {c.messages.map((m, i) => (
        <div key={i} className="text-sm">
          <span className="text-muted">{m.role}:</span>{" "}
          <span className="whitespace-pre-wrap text-foreground">{m.content}</span>
        </div>
      ))}
    </div>
  );
}

async function QuestionsTab({ range }: { range: DateRange }) {
  const items = await listTopQuestions({ range, limit: 20 });
  if (items.length === 0) {
    return <p className="text-sm text-muted">No questions in this range yet.</p>;
  }
  const max = Math.max(...items.map((i) => i.askedCount));
  return (
    <div className="space-y-2">
      {items.map((q, i) => (
        <div key={i} className="rounded-lg border border-border bg-surface p-3">
          <div className="flex items-baseline justify-between gap-3">
            <p className="flex-1 truncate text-sm text-foreground">{q.question}</p>
            <span className="text-xs text-muted">
              {q.askedCount} · {q.category}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
            <div
              className="h-full bg-accent/60"
              style={{ width: `${(q.askedCount / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

async function MatchesTab({ range }: { range: DateRange }) {
  const items = await listJdMatches({ range, limit: 50 });
  if (items.length === 0) {
    return <p className="text-sm text-muted">No JD matches yet.</p>;
  }
  return (
    <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
      {items.map((m, i) => (
        <li key={i} className="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-sm text-foreground">{m.roleTitle}</p>
            <p className="text-xs text-muted">{m.companyType}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                m.fitScore >= 80
                  ? "bg-success/15 text-success"
                  : m.fitScore >= 60
                    ? "bg-accent/15 text-accent"
                    : "bg-background text-muted"
              }`}
            >
              {m.fitScore}
            </span>
            <span className="text-xs text-muted">
              {new Date(m.createdAt).toLocaleDateString()}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
