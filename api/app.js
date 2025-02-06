// entry point or main file

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

import cookieParser from "cookie-parser";
import passport from "passport";

import connectDB from "./config/db.config.js";

// all routes imports
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import jobRoutes from "./routes/job.routes.js";
import uplaodRoutes from "./routes/upload.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import anlyseRoutes from "./routes/jobAnalyser.routes.js";

connectDB();

const app = express();

// app.set("trust proxy", 1);
// app.use(
//   cors({
//     origin: process.env.FONTEND_URL,
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: process.env.FONTEND_URL,
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: ["Content-Type", "Access-Control-Allow-Credentials"],
//     credentials: true, // mandoatory for google auths
//   })
// );

// Middleware
app.use(express.json());
app.use(cookieParser());

// import passport config
import "./config/passport.config.js";

app.use(passport.initialize());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// routes

// auth routes
app.use("/api/auth", authRoutes);
// app.use("/", profileRoutes);

// jobs routes
app.use("/api/jobs", jobRoutes);
// resume routes
app.use("/api/resume", resumeRoutes);

// upload routes
app.use("/api/fileUplaod", uplaodRoutes);

// open ai routes
app.use("/api/analyze-job", anlyseRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Multer error middleware
// app.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === "LIMIT_FILE_SIZE") {
//       return res
//         .status(400)
//         .json({ error: "File size must be less than 10MB" });
//     }
//     return res.status(400).json({ error: error.message });
//   }
//   next(error);
// });

// error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
