"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Check, Shuffle, Sparkles, Wand2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { flightQuoteSchema } from "@/lib/schemas/flight-demo";

const PLACEHOLDERS = [
  "2 adults Mumbai to Goa next Friday return Sunday economy",
  "Family of 4 BLR to Singapore in 3 weeks for 10 days",
  "Solo trip Delhi to Tokyo around Diwali, business class",
  "Couple BOM to LHR next month, premium economy, 2 weeks",
];

type FieldKey =
  | "origin"
  | "destination"
  | "departureDate"
  | "returnDate"
  | "paxAdults"
  | "paxChildren"
  | "cabinClass";

const FIELDS: { key: FieldKey; label: string; format?: (v: unknown) => string }[] = [
  { key: "origin", label: "Origin" },
  { key: "destination", label: "Destination" },
  { key: "departureDate", label: "Departure" },
  {
    key: "returnDate",
    label: "Return",
    format: (v) => (v ? String(v) : "one-way"),
  },
  { key: "paxAdults", label: "Adults" },
  { key: "paxChildren", label: "Children" },
  { key: "cabinClass", label: "Class", format: (v) => String(v).replace(/_/g, " ") },
];

export function PromptToFormDemo() {
  const [prompt, setPrompt] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const lastFilledRef = useRef<Set<FieldKey>>(new Set());

  useEffect(() => {
    const t = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const { object, submit, isLoading, error } = useObject({
    api: "/api/quote",
    schema: flightQuoteSchema,
  });

  useEffect(() => {
    if (!error) return;
    const msg = error.message ?? "";
    if (msg.includes("429") || /rate/i.test(msg)) {
      setErrorMessage("Hit the rate limit — try again in a few minutes.");
    } else if (msg.includes("400")) {
      setErrorMessage(
        "Couldn't parse that. Try '2 adults Mumbai to Delhi next week'.",
      );
    } else {
      setErrorMessage("Something went wrong. Try again.");
    }
  }, [error]);

  function go(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setErrorMessage(null);
    lastFilledRef.current = new Set();
    submit({ prompt: trimmed });
  }

  async function surprise() {
    if (isLoading) return;
    try {
      const r = await fetch("/api/quote/random");
      const j = (await r.json()) as { prompt?: string };
      if (j.prompt) {
        setPrompt(j.prompt);
        go(j.prompt);
      }
    } catch {
      setErrorMessage("Couldn't load a random prompt.");
    }
  }

  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-accent" />
        <p className="text-xs uppercase tracking-wider text-accent">Try it live</p>
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && go(prompt)}
          placeholder={PLACEHOLDERS[placeholderIdx]}
          className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:border-muted/60 focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={() => go(prompt)}
          disabled={isLoading || !prompt.trim()}
          aria-label="Generate"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {isLoading ? (
            <span aria-hidden="true">...</span>
          ) : (
            <>
              <Wand2 className="h-4 w-4 sm:hidden" aria-hidden="true" />
              <span className="hidden sm:inline">Generate</span>
            </>
          )}
        </button>
        <button
          onClick={surprise}
          disabled={isLoading}
          aria-label="Surprise me"
          className="rounded-lg border border-border bg-surface px-3 text-muted transition-colors hover:border-muted/50 hover:text-foreground disabled:opacity-40"
        >
          <Shuffle className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {FIELDS.map((f) => {
          const raw = (object as Record<string, unknown> | undefined)?.[f.key];
          const filled = raw !== undefined && raw !== null && String(raw).length > 0;
          const display = filled ? (f.format ? f.format(raw) : String(raw)) : "";
          return <FieldCell key={f.key} label={f.label} value={display} filled={filled} loading={isLoading && !filled} />;
        })}
      </div>

      {errorMessage && (
        <p className="mt-3 text-xs text-muted">{errorMessage}</p>
      )}
    </div>
  );
}

function FieldCell({
  label,
  value,
  filled,
  loading,
}: {
  label: string;
  value: string;
  filled: boolean;
  loading: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-surface px-3 py-2 transition-colors",
        filled ? "border-accent/40" : "border-border",
      )}
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted">
        <span>{label}</span>
        {filled && <Check className="h-3 w-3 text-success" aria-label="filled" />}
      </div>
      <div className="mt-1 h-5">
        {filled ? (
          <span className="text-sm text-foreground">{value}</span>
        ) : loading ? (
          <span className="block h-3 w-2/3 animate-pulse rounded bg-border" />
        ) : (
          <span className="text-sm text-subtle">—</span>
        )}
      </div>
    </div>
  );
}
