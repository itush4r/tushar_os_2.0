import { streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { google } from "@/lib/ai-sdk-google";
import { collections, getDb } from "@/lib/mongo";
import { withRateLimit } from "@/lib/rate-limit";
import { flightQuoteSchema } from "@/lib/schemas/flight-demo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  prompt: z.string().min(5).max(500),
});

const SYSTEM = `
You convert a plain-English flight request into a structured quote draft.
Use IATA airport codes (e.g. BOM, DEL, GOI). Dates must be ISO YYYY-MM-DD.
If the user says "next Friday", resolve relative to today's date in UTC.
If a return date isn't clearly mentioned, set returnDate to null.
If something is genuinely missing or ambiguous, make the most reasonable
default (1 adult, 0 children, economy) — do NOT invent specific airports
or dates that the user didn't say.
`.trim();

const MODEL_ID = process.env.GEMINI_MODEL_PRO ?? "gemini-2.5-flash";

async function handler(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_body", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { prompt } = parsed.data;

  const result = streamObject({
    model: google(MODEL_ID),
    schema: flightQuoteSchema,
    system: SYSTEM,
    prompt: `Today is ${new Date().toISOString().slice(0, 10)}.\n\nRequest: ${prompt}`,
    onFinish: async ({ object }) => {
      try {
        if (!object) return;
        // Final Zod validation to catch any provider drift.
        const safe = flightQuoteSchema.safeParse(object);
        if (!safe.success) return;
        const db = await getDb();
        await db.collection(collections.flightDemos).insertOne({
          prompt,
          generatedQuote: safe.data,
          createdAt: new Date(),
          isPublic: true,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[quote] persistence error", err);
      }
    },
  });

  return result.toTextStreamResponse();
}

export const POST = withRateLimit(handler, {
  endpoint: "quote",
  limit: 5,
  windowMs: 60 * 60 * 1000,
});
