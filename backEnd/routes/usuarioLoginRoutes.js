const express = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "El email y la contraseña son obligatorios" });
      }
  
      const usuario = await Usuario.findOne({ email });
  
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      const isMatch = await usuario.comparePassword(password);
  
      if (!isMatch) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }
  
      const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  });

module.exports = router;