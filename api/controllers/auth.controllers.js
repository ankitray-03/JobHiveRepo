// Handles authentication logic
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookies.js";
import {
  sendVerificationEMail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../utils/email.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

// register user
export const signup = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const userExits = await User.findOne({ email });

  if (userExits) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const user = new User({
    email,
    name,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    isVerified: false,
  });

  await user
    .save()
    .then((userData) => {
      // for jwt token
      generateTokenAndSetCookie(res, userData._id);

      sendVerificationEMail(email, verificationToken);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
          ...userData._doc,
          verificationToken: undefined,
          password: undefined,
        },
      });
    })
    .catch((error) => {
      return res.status(400).json({ success: false, message: error.message });
    });
};

// login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// logout user
export const logout = async (req, res) => {
  res.clearCookie("access_token");
  return res
    .status(200)
    .json({ success: true, message: "Logged out Successfully" });
};

// verify email
export const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  try {
    // should also chek by email
    const user = await User.findOne({
      email,
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid " });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user
      .save()
      .then(() => {
        sendWelcomeEmail(user.email, user.name);
        return res.status(200).json({
          success: true,
          message: "Email verified succesfully",
          user: {
            ...user._doc,
            password: undefined,
          },
        });
      })
      .catch((error) => {
        return res
          .status(400)
          .json({ success: false, message: "Not verified yet" });
      });
  } catch (error) {
    console.log("Error in verifyEmail", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // generate token
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordEpiresAt = Date.now() + 1 * 60 * 60 * 10000; // 1 hour

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordEpiresAt = resetPasswordEpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FONTEND_URL}/reset-password/${resetPasswordToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (err) {
    console.log("Error in forgotPasword:", err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;

  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordEpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // update password

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordEpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    console.log("Error in resetPassword", err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
