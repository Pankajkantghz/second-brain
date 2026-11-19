import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(3).max(100),

  email: z.string().trim().email().toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be no more than 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
});

export const signinSchema = z.object({
  email: z.string().email(),

  password: z.string().min(6),
});
