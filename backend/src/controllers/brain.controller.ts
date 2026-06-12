import { Request, Response } from "express";

import {
  createShareLink,
  fetchSharedBrain,
  removeShareLink,
} from "../services/brain.service";

/* Share Brain */
export const shareBrain = async (req: Request, res: Response) => {
  try {
    const { share } = req.body;

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (share) {
      const result = await createShareLink(userId);

      return res.json(result);
    }

    await removeShareLink(userId);

    return res.json({
      message: "Share link removed",
    });
  } catch {
    return res.status(500).json({
      message: "Failed to share brain",
    });
  }
};

/* Get Shared Brain */
export const getSharedBrain = async (req: Request, res: Response) => {
  try {
    const shareLink = Array.isArray(req.params.shareLink)
      ? req.params.shareLink[0]
      : req.params.shareLink;

    const result = await fetchSharedBrain(shareLink);

    return res.json(result);
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
