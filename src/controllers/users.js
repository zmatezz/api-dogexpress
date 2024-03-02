const User = require("../models/users");
const bcrypt = require("bcrypt");
const { generateToken } = require("../services/auth");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong ☹" });
  }
};

exports.login = async (req, res) => {
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
};
