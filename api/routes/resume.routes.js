import express from "express";
import { verifyToken } from "../utils/verifyUser.js";

import {
  getResumeWithUserId,
  deleteResumeWithId,
} from "../controllers/resume.controllers.js";

const router = express.Router();

router.get("/getResume/:id", verifyToken, getResumeWithUserId);
router.delete("/deleteResume/:id", verifyToken, deleteResumeWithId);

export default router;
