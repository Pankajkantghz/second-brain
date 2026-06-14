import { z } from "zod";

export const createContentSchema = z.object({
  title: z.string().min(2),

  link: z.string().url(),

  tags: z.array(z.string()).optional(),
});

export const updateContentSchema = z.object({
  contentId: z.string(),

  title: z.string().min(2),
});
