require("dotenv").config();

const express = require("express");
const db = require("./db/config");
const mongoose = require("mongoose");
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const userRoutes = require("./routes/user"); // Corrigido para userRoutes
const authRoutes = require("./routes/auth"); // Importe as rotas de autenticação

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

db.connect();

app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes); // Corrigido para userRoutes
app.use("/auth", authRoutes); // Utilize as rotas de autenticação em /auth

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
