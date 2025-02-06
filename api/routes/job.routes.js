// routes for job application
import express from "express";

import {
  createJob,
  fetchJobsWithId,
  deleteJobWithId,
  fetchSingleJob,
  updateJob,
} from "../controllers/job.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-job", verifyToken, createJob);
router.get("/getMyJobs/:id", verifyToken, fetchJobsWithId);
router.get("/singleJob/:id", verifyToken, fetchSingleJob);
router.delete("/deleteJob/:jobId", verifyToken, deleteJobWithId);
router.post("/updateJob/:jobId", verifyToken, updateJob);

export default router;
