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

      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    versionKey: false,
  }
);

schema.pre("save", productCategory.fillCategoryId);

module.exports = mongoose.model("Product", schema);
