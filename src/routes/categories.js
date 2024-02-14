const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories"); // Corrigido para categories

router.post("/", categoryController.createCategory);

module.exports = router;
