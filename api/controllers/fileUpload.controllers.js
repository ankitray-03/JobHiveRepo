import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";
import Resume from "../models/resume.model.js";

export const uploadFile = async (req, res, err) => {
  try {
    // check if file was provided
    if (!req.file) {
      return res.status(400).json({ message: "No file Uploaded" });
    }

    console.log("Uploading to CLoudinary...");

    // uplaod file to cloudinary
    const cloudinaryUplaodResponse = await cloudinary.uploader.upload(
      req.file.path,
      {
        resource_type: "raw",
      }
    );

    // make a public signed url
    const fileUrl = cloudinary.url(cloudinaryUplaodResponse.public_id, {
      secure: true,
      resource_type: "raw",
    });

    await Resume.create({
      userRef: req.user.userId,
      resumeUrl: fileUrl,
      resume_public_id: cloudinaryUplaodResponse.public_id,
    })
      .then(() => {
        fs.unlinkSync(req.file.path);
        return res.status(200).json({
          message: "Uploaded Successfully",
        });
      })
      .catch((err) => {
        fs.unlinkSync(req.file.path);
        return res.status(400).json(err);
      });
  } catch (error) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: error.message });
  }
};
export const deleteFile = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(req.params.public_id, {
      resource_type: "raw",
    });

    if (result.result === "ok") {
      return res.status(200).json({ message: "File deleted successfully" });
    } else {
      return res.status(400).json({ message: "Error deleting file" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ error: "Error deleting file" });
  }
};
