const Product = require("../models/products");

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("", error);
    res.status(500).json({ error: "Something went wrong ☹" });
  }
};
