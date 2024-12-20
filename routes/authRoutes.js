const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Registro de usuarios
router.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya existe." });
    }
    res.status(500).json({
      message: "Error al registrar el usuario.",
      error: error.message,
    });
  }
});

// Inicio de sesión
router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, message: "Inicio de sesión exitoso." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al iniciar sesión.", error: error.message });
  }
});

module.exports = router;
