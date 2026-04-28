import { generateObject } from "ai";
import { z } from "zod";

import { google } from "@/lib/ai-sdk-google";

const SLUR_LIST = [
  // A short, conservative fallback list for when Gemini fails open. Not
  // exhaustive — the real moderation is done by the AI call.
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "nigger",
  "faggot",
  "retard",
];

const moderationSchema = z.object({
  approved: z.boolean(),
  reason: z.string(),
});

const SYSTEM = `
You moderate guestbook messages on a developer portfolio.
Reject:
- Spam / promotional links / cryptocurrency pitches
- Harassment, slurs, threats, doxxing
- Gibberish or zero-effort posts ("asdfasdf")
- Off-topic content (politics, advertisements)
Accept:
- Compliments, thoughtful feedback, hellos, project comments,
  hiring inquiries, friendly notes.
Return JSON: { approved: boolean, reason: string }.
The reason must be short (max 80 chars) and never include slurs.
`.trim();

const MODEL_ID = process.env.GEMINI_MODEL_FLASH ?? "gemini-2.5-flash-lite";

export async function moderateMessage(input: {
  name: string;
  message: string;
}): Promise<{ approved: boolean; reason: string }> {
  // Quick fallback filter before spending a Gemini call.
  const lower = `${input.name} ${input.message}`.toLowerCase();
  for (const slur of SLUR_LIST) {
    if (lower.includes(slur)) {
      return { approved: false, reason: "Contains language we don't allow." };
    }
  }

  try {
    const { object } = await generateObject({
      model: google(MODEL_ID),
      schema: moderationSchema,
      system: SYSTEM,
      prompt: `Name: ${input.name}\nMessage: ${input.message}`,
    });
    return moderationSchema.parse(object);
  } catch {
    // Fail closed: if AI moderation breaks, reject the message rather
    // than letting unchecked content through.
    return { approved: false, reason: "Couldn't moderate right now. Try again." };
  }
}
