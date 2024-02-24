const express = require("express");
const router = express.Router();
const { generateToken } = require("../services/auth");
const User = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = await generateToken({ userId: user._id, role: user.role });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Algo deu errado." });
  }
});

module.exports = router;
