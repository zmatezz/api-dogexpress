const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const { authorize } = require("../middleware/auth");

router.post("/", authorize, productController.createProduct);

module.exports = router;
