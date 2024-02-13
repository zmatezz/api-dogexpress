const express = require("express");
const db = require("./db/config");
const mongoose = require("mongoose");
const categoriesRoutes = require("./routes/categories");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

db.connect();

app.use("/categories", categoriesRoutes);

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
