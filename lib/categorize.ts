import { getModel } from "@/lib/gemini";
import { type ChatCategory, chatCategorySchema } from "@/lib/schemas/chat-analytics";

const SYSTEM = `
You categorize a single visitor question on a developer portfolio assistant.
Reply with ONE word from this list:
- experience
- skills
- availability
- project_detail
- casual
- other
No punctuation, no other text.
`.trim();

export async function categorize(question: string): Promise<ChatCategory> {
  const model = getModel("flash", {
    systemInstruction: SYSTEM,
    temperature: 0,
  });
  const result = await model.generateContent(question);
  const raw = result.response.text().trim().toLowerCase().replace(/[^a-z_]/g, "");
  const parsed = chatCategorySchema.safeParse(raw);
  return parsed.success ? parsed.data : "other";
}
