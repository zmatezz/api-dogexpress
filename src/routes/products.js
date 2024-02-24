const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const { authorize } = require("../middleware/auth");
const { upload, checkFile } = require("../middleware/upload");

router.post(
  "/",
  authorize,
  upload.single("image"),
  checkFile,
  productController.createProduct
);

module.exports = router;
