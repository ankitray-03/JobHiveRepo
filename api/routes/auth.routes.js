// routes for authentication

import express from "express";
import passport from "passport";
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controllers.js";

import dotenv from "dotenv";
dotenv.config();

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// basic signup,login,logout
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Now forgotpassword, verifyemail,resetPassword
router.post("/verify-email", verifyToken, verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // respond with the token and user information
    const { token, user } = req.user;

    // Set token as a cookie
    // res
    //   .status(200)
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //   })
    //   .json({
    //     success: true,
    //     message: "Logged in successfully",
    //     user: {
    //       ...user._doc,
    //       password: undefined,
    //     },
    //   });

    // res.redirect(`${process.env.FONTEND_URL}/`);
  }
);

export default router;
