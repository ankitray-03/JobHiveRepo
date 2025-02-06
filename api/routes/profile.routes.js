import express from "express";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Profile route
router.get("/profile", protect, (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
});

export default router;
