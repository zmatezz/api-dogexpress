const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

router.post("/", productController.createProduct);

module.exports = router;
