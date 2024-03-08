const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories");
const { authorize } = require("../middleware/auth");

router.get("/", categoryController.getCategories);
router.get("/active", categoryController.getActiveCategories);
router.get("/inactive", categoryController.getInactiveCategories);
router.get("/search", categoryController.searchCategoriesByName);

router.post("/", authorize, categoryController.createCategory);

router.put("/:categoryId", authorize, categoryController.updateCategory);

module.exports = router;
