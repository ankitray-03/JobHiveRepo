import Resume from "../models/resume.model.js";
import cloudinary from "../config/cloudinary.config.js";

export const getResumeWithUserId = async (req, res) => {
  if (req.user.userId === req.params.id) {
    try {
      const resumes = await Resume.find({ userRef: req.params.id });

      let ResumeData = [];
      resumes.forEach((resume) => {
        ResumeData.push(resume);
      });
      return res.status(200).json(ResumeData);
    } catch (err) {
      return es.staus(401).json(err);
    }
  } else {
    return res
      .status(401)
      .json({ message: "You can Only view only yours resumes" });
  }
};

export const deleteResumeWithId = async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    return res.status(400).json("Listing not found");
  }

  if (!resume.userRef.equals(req.user.userId)) {
    return res.status(400).json("You can only delte your resumes");
  }

  try {
    await deleteFileFromCloudinary(res, resume.resume_public_id);
    await Resume.findByIdAndDelete(req.params.id);
    return res.status(200).json("Resume deleted Successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteFileFromCloudinary = async (res, public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "raw",
    });

    if (result.result === "ok") {
    } else {
      return res.status(400).json({ message: "Error deleting file" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ error: "Error deleting file" });
  }
};
