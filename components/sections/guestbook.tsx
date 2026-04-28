"use client";

import { useEffect, useState } from "react";

import { Container, Section, SectionLabel } from "@/components/ui";

type Entry = {
  name: string;
  message: string;
  createdAt: string;
};

function relativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

type SubmitState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "rejected"; message: string }
  | { kind: "error"; message: string };

export function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submit, setSubmit] = useState<SubmitState>({ kind: "idle" });
  const [entries, setEntries] = useState<Entry[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());

  async function fetchPage(p: number, mode: "replace" | "append" | "merge") {
    try {
      const r = await fetch(`/api/guestbook?page=${p}`);
      const j = (await r.json()) as { items: Entry[]; hasMore: boolean };
      const items = j.items ?? [];
      if (mode === "replace") {
        setEntries(items);
        setKnownIds(new Set(items.map((e) => e.createdAt)));
      } else if (mode === "append") {
        setEntries((prev) => [...prev, ...items]);
        setKnownIds((prev) => {
          const next = new Set(prev);
          items.forEach((e) => next.add(e.createdAt));
          return next;
        });
      } else {
        // merge — only prepend genuinely new entries
        setEntries((prev) => {
          const fresh = items.filter((e) => !knownIds.has(e.createdAt));
          if (fresh.length === 0) return prev;
          return [...fresh, ...prev];
        });
        setKnownIds((prev) => {
          const next = new Set(prev);
          items.forEach((e) => next.add(e.createdAt));
          return next;
        });
      }
      setHasMore(j.hasMore);
    } catch {
      // wall is non-critical; ignore.
    }
  }

  useEffect(() => {
    fetchPage(0, "replace");
    const t = setInterval(() => fetchPage(0, "merge"), 30_000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (submit.kind === "loading") return;
    if (!name.trim() || !message.trim()) return;
    setSubmit({ kind: "loading" });
    try {
      const r = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, website }),
      });
      if (r.status === 429) {
        setSubmit({ kind: "error", message: "You've posted enough today. Try tomorrow." });
        return;
      }
      const j = (await r.json()) as { success: boolean; reason?: string };
      if (j.success) {
        setSubmit({ kind: "success" });
        setName("");
        setMessage("");
        // Refresh wall on success.
        await fetchPage(0, "replace");
        setPage(0);
        setTimeout(() => setSubmit({ kind: "idle" }), 2500);
      } else {
        setSubmit({
          kind: "rejected",
          message: j.reason ?? "We couldn't post that. Try a different note.",
        });
      }
    } catch {
      setSubmit({ kind: "error", message: "Network error. Try again." });
    }
  }

  return (
    <Section>
      <Container>
        <SectionLabel>Guestbook</SectionLabel>
        <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
          Drop a note. AI keeps things civil.
        </h2>

        <form onSubmit={send} className="mt-6 space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            placeholder="Your name"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:border-muted/60 focus:outline-none"
            disabled={submit.kind === "loading"}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={300}
            rows={3}
            placeholder="Say hi, leave feedback, share a thought..."
            className="w-full resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:border-muted/60 focus:outline-none"
            disabled={submit.kind === "loading"}
          />
          {/* Honeypot: invisible to humans, bots fill it. */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            aria-hidden="true"
            name="website"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted">
              {message.length} / 300 · 3 posts per day
            </p>
            <button
              type="submit"
              disabled={submit.kind === "loading" || !name.trim() || !message.trim()}
              className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {submit.kind === "loading"
                ? "Posting..."
                : submit.kind === "success"
                  ? "Posted!"
                  : "Post"}
            </button>
          </div>
          {submit.kind === "rejected" && (
            <p className="text-xs text-amber-400">{submit.message}</p>
          )}
          {submit.kind === "error" && (
            <p className="text-xs text-red-400">{submit.message}</p>
          )}
        </form>

        <div className="mt-10">
          {entries.length === 0 ? (
            <p className="text-sm text-muted">No notes yet. Be the first.</p>
          ) : (
            <ul className="space-y-3">
              {entries.map((e) => (
                <li
                  key={e.createdAt}
                  className="rounded-xl border border-border bg-surface p-4 motion-safe:animate-[fadeIn_400ms_ease-out]"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-medium text-foreground">{e.name}</p>
                    <p className="text-xs text-muted">{relativeTime(e.createdAt)}</p>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-muted">
                    {e.message}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {hasMore && (
            <button
              onClick={() => {
                const next = page + 1;
                setPage(next);
                fetchPage(next, "append");
              }}
              className="mt-4 text-xs text-muted underline-offset-2 hover:text-foreground hover:underline"
            >
              Load more
            </button>
          )}
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Section>
  );
}
