// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { decodeToken } = require("../services/auth");

function authorize(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido." });
  }

  jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Falha na autenticação do token." });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { authorize };
