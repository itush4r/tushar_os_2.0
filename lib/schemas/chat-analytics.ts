import { z } from "zod";

export const chatCategorySchema = z.enum([
  "experience",
  "skills",
  "availability",
  "project_detail",
  "casual",
  "other",
]);

export const chatAnalyticsSchema = z.object({
  question: z.string(),
  normalizedQuestion: z.string(),
  askedCount: z.number().int().nonnegative(),
  lastAskedAt: z.date(),
  category: chatCategorySchema,
});

export type ChatCategory = z.infer<typeof chatCategorySchema>;
export type ChatAnalytics = z.infer<typeof chatAnalyticsSchema>;

export function normalizeQuestion(q: string): string {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}
