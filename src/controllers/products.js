const Product = require("../models/products");
const { uploadToCloudinary, checkFile } = require("../middleware/upload");

exports.createProduct = async (req, res) => {
  try {
    await checkFile(req, res, async () => {
      await uploadToCloudinary(req, res, async () => {
        const newProduct = new Product({
          name: req.body.name,
          description: req.body.description,
          image: req.imageURL,
          price: req.body.price,
          category: req.body.category,
          categoryId: req.body.categoryId,
        });

        await newProduct.save();

        res.status(201).json(newProduct);
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong ☹" });
  }
};
