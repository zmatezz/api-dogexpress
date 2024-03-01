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
