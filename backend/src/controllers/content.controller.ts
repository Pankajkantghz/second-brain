import { Response } from "express";

import { AuthRequest } from "../types/auth.types";

import {
  addContent,
  getContent,
  deleteContent,
  updateContent,
} from "../services/content.service";

import {
  createContentSchema,
  deleteContentSchema,
  updateContentSchema,
} from "../validators/content.validator";

/* ---------------- Add Content ---------------- */

export const addContentController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized",
      });
    }

    const validated = createContentSchema.safeParse(req.body);

    if (!validated.success) {
      return res.status(400).json({
        success: false,

        message: "Invalid input",

        errors: validated.error.flatten(),
      });
    }

    const { title, link, tags } = validated.data;

    const result = await addContent({
      title,
      link,

      tags: tags || [],

      userId,
    });

    return res.status(201).json({
      success: true,

      message: "Content added successfully",

      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message || "Failed to add content",
    });
  }
};

/* ---------------- Get Content ---------------- */

export const getContentController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized",
      });
    }

    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const content = await getContent(userId, search);

    return res.json({
      success: true,

      message: "Content fetched successfully",

      data: content,
    });
  } catch {
    return res.status(500).json({
      success: false,

      message: "Failed to fetch content",
    });
  }
};

/* ---------------- Delete Content ---------------- */

export const deleteContentController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized",
      });
    }

    const validated = deleteContentSchema.safeParse(req.body);

    if (!validated.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: validated.error.flatten(),
      });
    }

    const result = await deleteContent(validated.data.contentId, userId);

    if (!result.deletedCount) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    return res.json({
      success: true,

      message: "Content deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,

      message: "Failed to delete content",
    });
  }
};

/* ---------------- Update Content ---------------- */

export const updateContentController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized",
      });
    }

    const validated = updateContentSchema.safeParse(req.body);

    if (!validated.success) {
      return res.status(400).json({
        success: false,

        message: "Invalid input",

        errors: validated.error.flatten(),
      });
    }

    const { contentId, title } = validated.data;

    const result = await updateContent({
      contentId,
      title,
      userId,
    });

    if (!result.matchedCount) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    return res.json({
      success: true,

      message: "Content updated successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,

      message: "Failed to update content",
    });
  }
};
