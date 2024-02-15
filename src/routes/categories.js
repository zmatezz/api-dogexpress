const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories");
const { authorize } = require("../middleware/auth");

router.post("/", authorize, categoryController.createCategory);

module.exports = router;
