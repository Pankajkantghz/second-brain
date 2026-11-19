import { z } from "zod";

export const createContentSchema = z.object({
  title: z.string().trim().min(3).max(200),

  link: z.string().url().refine((value) => /^https?:\/\//i.test(value), {
    message: "Link must use HTTP or HTTPS",
  }),

  tags: z.array(z.string().trim().min(1).max(50)).max(20).optional(),
});

export const updateContentSchema = z.object({
  contentId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid content ID"),

  title: z.string().trim().min(3).max(200),
});

export const deleteContentSchema = z.object({
  contentId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid content ID"),
});
