import express from "express";

import {
  addContentController,
  getContentController,
  deleteContentController,
  updateContentController,
} from "../controllers/content.controller";

import { userMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/content", userMiddleware, addContentController);

router.get("/content", userMiddleware, getContentController);

router.delete("/content", userMiddleware, deleteContentController);

router.put("/content", userMiddleware, updateContentController);

export default router;
