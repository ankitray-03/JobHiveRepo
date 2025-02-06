// Job application routes
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: { type: String, required: true },
    position: { type: String, required: true },
    status: {
      type: String,
      default: "Applied",
    },
    dateApplied: { type: Date, default: Date.now },
    location: { type: String, required: true },
    salary: { type: String, default: null },
    jobUrl: { type: String, default: null },
    notes: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
