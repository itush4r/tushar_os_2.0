"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

type Props = {
  role: "user" | "assistant";
  text: string;
};

export function ChatMessage({ role, text }: Props) {
  const isUser = role === "user";
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-accent/15 text-foreground"
            : "border border-border bg-surface text-foreground",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <div className="markdown space-y-2 [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-background/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_p]:m-0 [&_strong]:text-foreground">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
