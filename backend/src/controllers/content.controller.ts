import { Request, Response } from "express";

import {
  addContent,
  getContent,
  deleteContent,
  updateContent,
} from "../services/content.service";

/* Add Content */

export const addContentController = async (req: Request, res: Response) => {
  try {
    const result = await addContent(req.body, req.userId!);

    return res.status(result.status).json(result);
  } catch {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* Get Content */

export const getContentController = async (req: Request, res: Response) => {
  try {
    const result = await getContent(req.userId!);

    return res.status(result.status).json(result);
  } catch {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* Delete Content */

export const deleteContentController = async (req: Request, res: Response) => {
  try {
    const result = await deleteContent(req.body.contentId, req.userId!);

    return res.status(result.status).json(result);
  } catch {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* Update Content */

export const updateContentController = async (req: Request, res: Response) => {
  try {
    const result = await updateContent(req.body, req.userId!);

    return res.status(result.status).json(result);
  } catch {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
