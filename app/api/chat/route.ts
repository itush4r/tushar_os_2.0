import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { google } from "@/lib/ai-sdk-google";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { ABOUT_TUSHAR_SYSTEM_PROMPT } from "@/lib/prompts/about-tushar";
import { categorize } from "@/lib/categorize";
import { getClientIp, withRateLimit } from "@/lib/rate-limit";
import { hashIp } from "@/lib/hash-ip";
import { collections, getDb } from "@/lib/mongo";
import { normalizeQuestion } from "@/lib/schemas/chat-analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// We accept two shapes:
// 1. Simple: { role, content } — what an external curl/test would send.
// 2. UI: { role, parts: [{type:'text', text}] } — what useChat from
//    @ai-sdk/react sends. Normalized below before reaching the model.
const simpleMessage = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const uiMessage = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant", "system"]),
  parts: z
    .array(
      z.object({
        type: z.string(),
        text: z.string().optional(),
      }),
    )
    .min(1),
});

const bodySchema = z.object({
  id: z.string().optional(),
  messages: z.array(z.union([simpleMessage, uiMessage])).min(1).max(40),
  sessionId: z.string().uuid().optional(),
});

type ParsedMessage = z.infer<typeof simpleMessage> | z.infer<typeof uiMessage>;

function toSimple(m: ParsedMessage): { role: "user" | "assistant"; content: string } {
  if ("content" in m) return { role: m.role, content: m.content };
  const text = m.parts
    .filter((p) => p.type === "text" && typeof p.text === "string")
    .map((p) => p.text!)
    .join("");
  // Skip system messages from clients; only user/assistant get persisted.
  return { role: m.role === "system" ? "user" : m.role, content: text };
}

const MODEL_ID = process.env.GEMINI_MODEL_FLASH ?? "gemini-2.5-flash-lite";

async function handler(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_body", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { messages: rawMessages, sessionId: providedSessionId } = parsed.data;
  const messages = rawMessages.map(toSimple).filter((m) => m.content.trim().length > 0);
  if (messages.length === 0) {
    return NextResponse.json({ error: "no_text_content" }, { status: 400 });
  }
  const sessionId = providedSessionId ?? crypto.randomUUID();
  const ipHash = hashIp(getClientIp(req));
  const startedAt = new Date();
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  // Build UIMessages so we can use convertToModelMessages — this is what
  // streamText expects in v6.
  const uiMessages: UIMessage[] = messages.map((m, i) => ({
    id: `${sessionId}-${i}`,
    role: m.role,
    parts: [{ type: "text", text: m.content }],
  }));

  const modelMessages = await convertToModelMessages(uiMessages);

  const result = streamText({
    model: google(MODEL_ID),
    system: ABOUT_TUSHAR_SYSTEM_PROMPT,
    messages: modelMessages,
    onFinish: async ({ text }) => {
      try {
        const db = await getDb();
        const fullMessages = [
          ...messages.map((m) => ({ ...m, at: startedAt })),
          { role: "assistant" as const, content: text, at: new Date() },
        ];

        await db.collection(collections.chatSessions).updateOne(
          { sessionId },
          {
            $setOnInsert: { sessionId, ipHash, startedAt },
            $set: { messages: fullMessages },
          },
          { upsert: true },
        );

        if (lastUser) {
          const normalized = normalizeQuestion(lastUser.content);
          if (normalized.length > 0) {
            const category = await categorize(lastUser.content).catch(() => "other" as const);
            await db.collection(collections.chatAnalytics).updateOne(
              { normalizedQuestion: normalized },
              {
                $setOnInsert: {
                  normalizedQuestion: normalized,
                  question: lastUser.content,
                  category,
                },
                $inc: { askedCount: 1 },
                $set: { lastAskedAt: new Date() },
              },
              { upsert: true },
            );
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[chat] persistence error", err);
      }
    },
  });

  return result.toUIMessageStreamResponse({
    headers: { "x-session-id": sessionId },
  });
}

export const POST = withRateLimit(handler, {
  endpoint: "chat",
  limit: 10,
  windowMs: 60 * 60 * 1000,
});
