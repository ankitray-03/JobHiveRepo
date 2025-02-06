// resume schema
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    resume_public_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
