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
  if (req.method === "POST" && !req.file) {
    console.log("File not provided during creation");
    return res.status(400).json({ error: "File not provided" });
  }

  next();
};

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (req.method === "POST" && !req.file) {
      return res.status(400).json({ error: "File not provided" });
    }

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = uploader.upload_stream(
          {
            resource_type: "image",
            folder: "dogexpress",
          },
          (error, result) => {
            if (error) {
              console.error("Error uploading file to Cloudinary:", error);
              reject(error);
            } else {
              req.imageURL = result.secure_url;
              resolve(result);
            }
          }
        );

        uploadStream.end(req.file.buffer);
      });
    }

    next();
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    res.status(500).json({ error: "Something went wrong ☹" });
  }
};

module.exports = { upload, checkFile, uploadToCloudinary };
