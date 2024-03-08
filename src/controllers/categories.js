const { isValidObjectId } = require("mongoose");
const Category = require("../models/categories");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong ☹" });
  }
};

exports.getActiveCategories = async (req, res) => {
  try {
    const activeCategories = await Category.find({ active: true });
    res.status(200).json(activeCategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch active categories" });
  }
};

exports.getInactiveCategories = async (req, res) => {
  try {
    const activeCategories = await Category.find({ active: false });
    res.status(200).json(activeCategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inactive categories" });
  }
};

exports.searchCategoriesByName = async (req, res) => {
  try {
    const categoryName = req.query.name;
    const categories = await Category.find({
      name: new RegExp(categoryName, "i"),
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to search categories by name" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const { active, name, changeMeat } = req.body;

    const updatedCategoryData = {
      active,
      name,
      changeMeat,
    };

    const originalCategory = await Category.findById(categoryId);

    if (!originalCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const isDataModified = !(
      originalCategory.active === updatedCategoryData.active &&
      originalCategory.name === updatedCategoryData.name &&
      originalCategory.changeMeat === updatedCategoryData.changeMeat
    );

    if (!isDataModified) {
      return res.status(204).end();
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedCategoryData,
      { new: true }
    );

    res.json(updatedCategory);
  } catch (error) {
    console.error("Failed to update category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
