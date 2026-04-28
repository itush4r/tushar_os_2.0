import { z } from "zod";

export const moderationStatusSchema = z.enum([
  "approved",
  "rejected",
  "pending",
]);

export const guestbookEntrySchema = z.object({
  name: z.string().min(1).max(50),
  message: z.string().min(1).max(300),
  moderationStatus: moderationStatusSchema,
  moderationReason: z.string().nullable(),
  createdAt: z.date(),
});

export type ModerationStatus = z.infer<typeof moderationStatusSchema>;
export type GuestbookEntry = z.infer<typeof guestbookEntrySchema>;
