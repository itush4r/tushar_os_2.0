import { z } from 'zod';

export const ContactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }).max(1000),
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }).optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  metric: z.string(),
  category: z.enum(['professional', 'personal']),
});

export type Project = z.infer<typeof ProjectSchema>;
