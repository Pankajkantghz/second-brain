import { Request, Response } from "express";

import {
  addContent,
  getContent,
  deleteContent,
  updateContent,
} from "../services/content.service";

import {
  createContentSchema,
  updateContentSchema,
} from "../validators/content.validator";

/* ---------------- Add Content ---------------- */

export const addContentController = async (req: Request, res: Response) => {
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

export const getContentController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized",
      });
    }

    const search = req.query.search as string;

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

export const deleteContentController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized",
      });
    }

    const { contentId } = req.body;

    await deleteContent(contentId, userId);

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

export const updateContentController = async (req: Request, res: Response) => {
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

    const { contentId, title, link, tags } = validated.data;

    await updateContent({
      contentId,
      title,
      link,

      tags: tags || [],

      userId,
    });

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
