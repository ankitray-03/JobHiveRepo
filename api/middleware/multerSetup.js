import multer from "multer";

// multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./api/public/Uploads");
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + file.originalname);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, //10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"), false);
    }

    cb(null, true);
  },
});

export default upload;
