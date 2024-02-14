// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { generateToken } = require("../services/auth");
const User = require("../models/users");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verificar as credenciais do usuário
  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Se as credenciais estiverem corretas, gerar o token
    const token = await generateToken({ userId: user._id, role: user.role });

    res.json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
});

module.exports = router;
