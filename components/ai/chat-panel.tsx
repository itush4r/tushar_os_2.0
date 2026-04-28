"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Send, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { ChatMessage } from "./chat-message";
import { cn } from "@/lib/utils";

const SESSION_KEY = "tushar-os-chat-session";

const SUGGESTED = [
  "What's his strongest project?",
  "What kind of role is he looking for?",
  "Tell me about the Flight Quote CMS",
];

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function messageText(m: UIMessage): string {
  return m.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text" && typeof (p as { text?: string }).text === "string")
    .map((p) => p.text)
    .join("");
}

type Props = {
  onClose: () => void;
};

export function ChatPanel({ onClose }: Props) {
  const [sessionId, setSessionId] = useState("");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ messages, body }) => ({
          body: {
            ...body,
            messages,
            sessionId:
              typeof window !== "undefined"
                ? window.localStorage.getItem(SESSION_KEY)
                : undefined,
          },
        }),
      }),
    [],
  );

  const { messages, sendMessage, status, error, regenerate } = useChat({
    transport,
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, status]);

  const isStreaming = status === "submitted" || status === "streaming";

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-0 sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:items-end sm:p-0">
      <div
        className={cn(
          "flex h-full w-full flex-col overflow-hidden border border-border bg-surface text-foreground shadow-2xl",
          "sm:h-[540px] sm:w-[380px] sm:rounded-2xl",
        )}
        role="dialog"
        aria-label="Chat about Tushar"
      >
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium">Ask about Tushar</p>
              <p className="text-[11px] text-muted">AI · Gemini · session {sessionId.slice(0, 8)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="rounded-full p-1.5 text-muted transition-colors hover:bg-background hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted">
                Ask anything about Tushar&apos;s work, projects, or what
                he&apos;s looking for.
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    disabled={isStreaming}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted transition-colors hover:border-muted/50 hover:text-foreground disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <ChatMessage
                key={m.id}
                role={m.role === "assistant" ? "assistant" : "user"}
                text={messageText(m)}
              />
            ))
          )}

          {status === "submitted" && (
            <div className="flex w-full justify-start">
              <div className="rounded-2xl border border-border bg-surface px-3 py-2.5">
                <span className="flex items-center gap-1">
                  <Dot delay={0} />
                  <Dot delay={150} />
                  <Dot delay={300} />
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-border bg-background/40 px-3 py-2 text-xs text-muted">
              <p>AI is busy. Try again in a moment.</p>
              <button
                onClick={() => regenerate()}
                className="mt-1 text-foreground underline underline-offset-2"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2 border-t border-border bg-surface px-3 py-3"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about a project, role, or stack..."
            rows={1}
            className="max-h-32 min-h-[36px] flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:border-muted/60 focus:outline-none"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-background transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
