const mongoose = require("mongoose");

const fillCategoryId = async function (next) {
  try {
    if (typeof this.category === "string") {
      const category = await mongoose
        .model("Category")
        .findOne({ name: this.category });
      if (category) {
        this.categoryId = category._id;
      } else {
        throw new Error("Categoria não encontrada");
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { fillCategoryId };
