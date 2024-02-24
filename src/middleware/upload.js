const multer = require("multer");
const { uploader } = require("../services/image");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const checkFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "File not provided" });
  }
  next();
};

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File not provided" });
    }

    const result = await uploader.upload_stream(
      {
        resource_type: "image",
        folder: "dogexpress",
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading file to Cloudinary:", error);
          return res.status(500).json({ error: "Something went wrong ☹" });
        }
        req.imageURL = result.secure_url;
        next();
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    res.status(500).json({ error: "Something went wrong ☹" });
  }
};

module.exports = { upload, checkFile, uploadToCloudinary };
