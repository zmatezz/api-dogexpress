const express = require("express");
const db = require("./db/config");
const mongoose = require("mongoose");
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const products = require("./models/products");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

db.connect();

app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
