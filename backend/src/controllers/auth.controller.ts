import { Response } from "express";

import { AuthRequest } from "../types/auth.types";

import { signupUser, signinUser } from "../services/auth.service";

import { signupSchema, signinSchema } from "../validators/auth.validation";

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
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Signup failed",
    });
  }
};

/* Signin */
export const signin = async (req: AuthRequest, res: Response) => {
  try {
    const validated = signinSchema.parse(req.body);

    const result = await signinUser(validated.email, validated.password);

    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Signin failed",
    });
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
