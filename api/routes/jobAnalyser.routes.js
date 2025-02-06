import express from "express";
const router = express.Router();
import { genrateEmailAndResume } from "../controllers/jobAnalyser.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/generate-email-resume", verifyToken, genrateEmailAndResume);

export default router;
