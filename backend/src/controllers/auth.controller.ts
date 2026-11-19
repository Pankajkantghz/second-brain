import { Response } from "express";

import { AuthRequest } from "../types/auth.types";

import { signupUser, signinUser } from "../services/auth.service";

import { signupSchema, signinSchema } from "../validators/auth.validation";
import { z } from "zod";

/* Signup */
export const signup = async (req: AuthRequest, res: Response) => {
  try {
    const validated = signupSchema.parse(req.body);

    const result = await signupUser(
      validated.name,
      validated.email,
      validated.password,
    );

    return res.status(201).json(result);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.issues[0]?.message || "Invalid signup details",
      });
    }

    if (
      (error instanceof Error && error.message === "User already exists") ||
      (typeof error === "object" && error !== null && "code" in error && error.code === 11000)
    ) {
      return res.status(409).json({ message: "Email already exists" });
    }

    console.error("Signup failed:", error);
    return res.status(500).json({ message: "Signup failed" });
  }
};

/* Signin */
export const signin = async (req: AuthRequest, res: Response) => {
  try {
    const validated = signinSchema.parse(req.body);

    const result = await signinUser(validated.email, validated.password);

    return res.json(result);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.issues[0]?.message || "Invalid signin details",
      });
    }

    if (error instanceof Error && error.message === "Invalid credentials") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.error("Signin failed:", error);
    return res.status(500).json({ message: "Signin failed" });
  }
};

/* Logout */
export const logout = async (req: AuthRequest, res: Response) => {
  try {
    return res.json({
      message: "Logged out successfully",
    });
  } catch {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};
