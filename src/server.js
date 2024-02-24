require("dotenv").config();

const express = require("express");
const db = require("./db/config");
const mongoose = require("mongoose");
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

db.connect();

app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
