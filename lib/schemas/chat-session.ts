import { z } from "zod";

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  at: z.date(),
});

export const chatSessionSchema = z.object({
  sessionId: z.string(),
  ipHash: z.string(),
  startedAt: z.date(),
  messages: z.array(chatMessageSchema),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatSession = z.infer<typeof chatSessionSchema>;
