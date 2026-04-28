"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

import { Container, Section, SectionLabel } from "@/components/ui";
import type { JdMatchResult } from "@/lib/schemas/jd-match";
import { cn } from "@/lib/utils";

const MIN_LEN = 100;
const MAX_LEN = 5000;

type WallItem = {
  roleTitle: string;
  companyType: string;
  fitScore: number;
  createdAt: string;
};

const STAGES = ["Reading JD...", "Comparing...", "Writing pitch..."];

function scoreClass(score: number) {
  if (score >= 80) return "bg-success/15 text-success border-success/30";
  if (score >= 60) return "bg-amber-500/15 text-amber-400 border-amber-500/30";
  return "bg-red-500/15 text-red-400 border-red-500/30";
}

export function JDMatcher() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<JdMatchResult | null>(null);
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [wall, setWall] = useState<WallItem[]>([]);

  useEffect(() => {
    let alive = true;
    async function fetchWall() {
      try {
        const r = await fetch("/api/match/wall");
        const j = (await r.json()) as { items: WallItem[] };
        if (alive) setWall(j.items ?? []);
      } catch {
        // Silent: wall is non-critical.
      }
    }
    fetchWall();
    const t = setInterval(fetchWall, 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  // Stage cycler while loading.
  useEffect(() => {
    if (!loading) {
      setStage(0);
      return;
    }
    const t = setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 1500);
    return () => clearInterval(t);
  }, [loading]);

  // Animated count-up of score.
  useEffect(() => {
    if (!result) return;
    const target = result.fitScore;
    const start = performance.now();
    const duration = 600;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setScore(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [result]);

  async function submit() {
    if (loading) return;
    if (text.trim().length < MIN_LEN) {
      setError(`Paste at least ${MIN_LEN} characters of the JD.`);
      return;
    }
    if (text.length > MAX_LEN) {
      setError(`JD too long — max ${MAX_LEN} chars.`);
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: text }),
      });
      if (res.status === 429) {
        setError("Rate limit hit (3/hour). Try again later.");
        return;
      }
      if (!res.ok) {
        setError("Couldn't generate a match. Try again.");
        return;
      }
      const j = (await res.json()) as JdMatchResult;
      setResult(j);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyPitch() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.pitch);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <Section id="match">
      <Container>
        <SectionLabel>JD Matcher</SectionLabel>
        <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
          Drop a JD, see if I&apos;m a fit.
        </h2>
        <p className="mt-2 max-w-[60ch] text-sm text-muted">
          Paste a job description. AI compares against my actual experience and
          writes a tailored pitch. Company names are anonymized before anything
          is stored.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-surface p-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Paste the full JD here..."
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:border-muted/60 focus:outline-none"
            disabled={loading}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-muted">
            <span>
              {text.length} / {MAX_LEN}
            </span>
            <button
              onClick={submit}
              disabled={loading || text.trim().length < MIN_LEN}
              className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {loading ? STAGES[stage] : "Match"}
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        </div>

        {result && (
          <div className="mt-6 rounded-xl border border-border bg-surface p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  {result.companyType}
                </p>
                <p className="mt-1 text-lg font-medium text-foreground">
                  {result.roleTitle}
                </p>
              </div>
              <div
                className={cn(
                  "flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border",
                  scoreClass(result.fitScore),
                )}
              >
                <span className="text-2xl font-semibold leading-none">{score}</span>
                <span className="mt-1 text-[10px] uppercase tracking-wider opacity-70">
                  fit
                </span>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-wider text-muted">Top matches</p>
              <ul className="mt-2 space-y-1.5">
                {result.keyMatches.map((m, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="mt-5 border-l-2 border-accent/40 bg-background/40 px-4 py-3 text-sm leading-relaxed text-foreground">
              {result.pitch}
            </blockquote>

            <button
              onClick={copyPitch}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted transition-colors hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-success" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy pitch
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-12">
          <SectionLabel>Roles I&apos;ve been matched against</SectionLabel>
          {wall.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Be the first to match a JD.</p>
          ) : (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {wall.map((m, i) => (
                <li
                  key={`${m.roleTitle}-${m.createdAt}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2 motion-safe:animate-[fadeIn_300ms_ease-out]"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-foreground">{m.roleTitle}</p>
                    <p className="truncate text-xs text-muted">{m.companyType}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2 py-0.5 text-xs",
                      scoreClass(m.fitScore),
                    )}
                  >
                    {m.fitScore}
                  </span>
                </li>
              ))}
            </ul>
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
