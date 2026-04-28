"use client";

import { Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const ChatPanel = dynamic(
  () => import("./chat-panel").then((m) => m.ChatPanel),
  { ssr: false },
);

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-foreground shadow-lg transition-colors hover:border-muted/50"
          aria-label="Open chat about Tushar"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="hidden flex-col text-left leading-tight sm:flex">
            <span className="text-xs font-medium">Ask about Tushar</span>
            <span className="text-[10px] text-muted">AI · Gemini</span>
          </span>
        </button>
      )}
      {open && <ChatPanel onClose={() => setOpen(false)} />}
    </>
  );
}
