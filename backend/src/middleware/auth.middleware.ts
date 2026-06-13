import { Response, NextFunction } from "express";

import { AuthRequest } from "../types/auth.types"

import jwt from "jsonwebtoken";

import { JWT_PASSWORD } from "../config";

interface JwtPayload {
  id: string;
}

export const userMiddleware = (
 req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, JWT_PASSWORD) as JwtPayload;

    if (!decoded?.id) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    req.userId = decoded.id;

    next();
  } catch {
    return res.status(403).json({
      message: "You are not authenticated",
    });
  }
};
