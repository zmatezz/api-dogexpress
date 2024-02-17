const Product = require("../models/products");

exports.createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File not provided" });
    }

    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.file.path.replace(/\\/g, "/"),
      price: req.body.price,
      category: req.body.category,
      categoryId: req.body.categoryId,
    });

    console.log("Novo produto:", newProduct);

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Something went wrong ☹" });
  }
};
