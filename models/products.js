const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productCategory = require("../middleware/productCategory");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

schema.pre("save", productCategory.fillCategoryName);

module.exports = mongoose.model("Product", schema);
