// handles job application logic
import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, message: "Job Not created" });
  }
};

export const fetchJobsWithId = async (req, res) => {
  if (req.user.userId === req.params.id) {
    try {
      const jobs = await Job.find({ userRef: req.params.id });
      return res.status(200).json(jobs);
    } catch (err) {
      return res.staus(401).json(err);
    }
  } else {
    return res
      .status(401)
      .json({ message: "You can Only view only yours jobs" });
  }
};

export const deleteJobWithId = async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    return res.status(400).json("Job not found");
  } else if (!job.userRef.equals(req.user.userId)) {
    console.log(req.user.userId === job.userRef);
    return res.status(400).json("You can only delete your own lisitngs!");
  } else {
    try {
      await Job.findByIdAndDelete(req.params.jobId);
      return res
        .status(200)
        .json({ success: true, message: "Job has been deleted!" });
    } catch (error) {
      return res.status(400).json({ success: false, message: "Server error" });
    }
  }
};

export const fetchSingleJob = async (req, res) => {
  // console.log(req.params.id);
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(400).json({ success: false, message: "No Job found" });
  }

  if (!job.userRef.equals(req.user.userId)) {
    return res
      .status(400)
      .json({ success: false, message: "You can Only update your Jobs" });
  }

  return res.status(200).json({ success: true, job });
};

export const updateJob = async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    return res.status(400).json({ success: false, message: "Job not found" });
  }

  if (!job.userRef.equals(req.user.userId)) {
    return res
      .status(400)
      .json({ success: false, message: "You can only edit your own Jobs" });
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
      new: true,
    });

    return res
      .status(200)
      .json({ success: true, message: "Updated job SuccessFully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Server Error" });
  }
};
// exports.getJobListings = async (req, res) => {};
