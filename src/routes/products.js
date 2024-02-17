const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const { authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post(
  "/",
  authorize,
  upload.single("image"),
  productController.createProduct
);

module.exports = router;
