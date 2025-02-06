import express from "express";

import upload from "../middleware/multerSetup.js";
import {
  uploadFile,
  deleteFile,
} from "../controllers/fileUpload.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("file"), uploadFile);
router.post("/delete-resume/:public_id", verifyToken, deleteFile);

export default router;
