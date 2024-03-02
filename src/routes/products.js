const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const { authorize } = require("../middleware/auth");
const { upload, checkFile } = require("../middleware/upload");

router.get("/", productController.getProducts);
router.get("/active", productController.getActiveProducts);
router.get("/inactive", productController.getInactiveProducts);
router.get("/search", productController.searchProductsByName);

router.post(
  "/",
  authorize,
  upload.single("image"),
  checkFile,
  productController.createProduct
);

router.delete("/:productId", authorize, productController.deleteProduct);

module.exports = router;
