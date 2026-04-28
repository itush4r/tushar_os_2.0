import { z } from "zod";

export const rateLimitDocSchema = z.object({
  ipHash: z.string(),
  endpoint: z.string(),
  count: z.number().int().nonnegative(),
  windowStart: z.date(),
});

export type RateLimitDoc = z.infer<typeof rateLimitDocSchema>;
