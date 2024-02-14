const mongoose = require("mongoose");

const fillCategoryName = async function (next) {
  try {
    const category = await mongoose.model("Category").findById(this.categoryId);
    if (category) {
      this.category = category.name;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { fillCategoryName };
