const Product = require("../models/products");
const { uploadToCloudinary, checkFile } = require("../middleware/upload");
const { isValidObjectId } = require("mongoose");

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

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const name = req.query.name;
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.getActiveProducts = async (req, res) => {
  try {
    const activeProducts = await Product.find({ active: true });
    res.status(200).json(activeProducts);
  } catch (error) {
    console.error("Error fetching active products:", error);
    res.status(500).json({ error: "Failed to fetch active products" });
  }
};

exports.getInactiveProducts = async (req, res) => {
  try {
    const inactiveProducts = await Product.find({ active: false });
    res.status(200).json(inactiveProducts);
  } catch (error) {
    console.error("Error fetching inactive products:", error);
    res.status(500).json({ error: "Failed to fetch inactive products" });
  }
};

exports.searchProductsByName = async (req, res) => {
  try {
    const productName = req.query.name;
    const products = await Product.find({ name: new RegExp(productName, "i") });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products by name:", error);
    res.status(500).json({ error: "Failed to search products by name" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    await checkFile(req, res, async () => {
      await uploadToCloudinary(req, res, async () => {
        const {
          name,
          description,
          image,
          price,
          category,
          categoryId,
          active,
        } = req.body;

        const updatedProductData = {
          name,
          description,
          image: req.imageURL || image,
          price,
          category,
          categoryId,
          active,
        };

        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          updatedProductData,
          { new: true }
        );

        if (!updatedProduct) {
          return res.status(404).json({ error: "Product not found" });
        }

        res.json(updatedProduct);
      });
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Something went wrong ☹" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
