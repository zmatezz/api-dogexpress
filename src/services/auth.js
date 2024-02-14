// services/auth.js
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
  console.log("Dados para geração do token:", data);
  const token = jwt.sign(data, process.env.JWT_PASS, { expiresIn: "1d" });
  console.log("Token gerado:", token); // Adicione esta linha
  return token;
};

exports.decodeToken = async (token) => {
  return jwt.verify(token, process.env.JWT_PASS);
};
