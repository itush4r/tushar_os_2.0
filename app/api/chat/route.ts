import { streamText, type ModelMessage } from "ai";

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

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(40),
  sessionId: z.string().uuid().optional(),
});

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

  const { messages, sessionId: providedSessionId } = parsed.data;
  const sessionId = providedSessionId ?? crypto.randomUUID();
  const ipHash = hashIp(getClientIp(req));
  const startedAt = new Date();
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  const result = streamText({
    model: google(MODEL_ID),
    system: ABOUT_TUSHAR_SYSTEM_PROMPT,
    messages: messages as ModelMessage[],
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
