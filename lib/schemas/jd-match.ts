import { z } from "zod";

export const jdMatchResultSchema = z.object({
  roleTitle: z.string(),
  companyType: z.string().describe("Anonymized: e.g. 'Series B fintech'"),
  fitScore: z.number().int().min(0).max(100),
  keyMatches: z.array(z.string()).max(5),
  pitch: z.string().describe("150-word tailored pitch"),
});

export const jdMatchSchema = jdMatchResultSchema.extend({
  createdAt: z.date(),
});

export type JdMatchResult = z.infer<typeof jdMatchResultSchema>;
export type JdMatch = z.infer<typeof jdMatchSchema>;
