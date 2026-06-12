
import express from "express";

import {
  shareBrain,
  getSharedBrain,
} from "../controllers/brain.controller";

import {
  userMiddleware,
} from "../middleware/auth.middleware";

const router =
  express.Router();

router.post(
  "/brain/share",
  userMiddleware,
  shareBrain
);

router.get(
  "/brain/:shareLink",
  getSharedBrain
);

export default router;
