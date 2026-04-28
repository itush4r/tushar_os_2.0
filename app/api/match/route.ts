import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { google } from "@/lib/ai-sdk-google";
import { collections, getDb } from "@/lib/mongo";
import { withRateLimit } from "@/lib/rate-limit";
import {
  JD_MATCH_SYSTEM,
  TUSHAR_PROFILE_FOR_MATCH,
} from "@/lib/prompts/jd-match";
import { jdMatchResultSchema } from "@/lib/schemas/jd-match";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  jobDescription: z.string().min(100).max(5000),
});

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

  const { jobDescription } = parsed.data;

  const { object } = await generateObject({
    model: google(MODEL_ID),
    schema: jdMatchResultSchema,
    system: `${JD_MATCH_SYSTEM}\n\n${TUSHAR_PROFILE_FOR_MATCH}`,
    prompt: `Job description:\n\n${jobDescription}`,
  });

  // Final guard: re-validate, then save ONLY the anonymized fields.
  // The raw JD never enters Mongo.
  const safe = jdMatchResultSchema.safeParse(object);
  if (!safe.success) {
    return NextResponse.json({ error: "model_output_invalid" }, { status: 502 });
  }

  try {
    const db = await getDb();
    await db.collection(collections.jdMatches).insertOne({
      ...safe.data,
      createdAt: new Date(),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[match] persistence error", err);
  }

  return NextResponse.json(safe.data);
}

export const POST = withRateLimit(handler, {
  endpoint: "match",
  limit: 3,
  windowMs: 60 * 60 * 1000,
});
