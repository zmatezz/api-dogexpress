const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    changeMeat: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Category", schema);
