const express = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      nombre,
      ap,
      am,
      username,
      email,
      password,
      telefono,
      preguntaSecreta,
      respuestaSecreta,
    } = req.body;

    // Verificar qué datos están llegando en la solicitud
    console.log(req.body);  // Verifica si todos los datos están ahí

    if (!nombre || !ap || !am || !username || !email || !password || !telefono || !preguntaSecreta || !respuestaSecreta) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Hash de la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      ap,
      am,
      username,
      email,
      password: hashedPassword, 
      telefono,
      preguntaSecreta,
      respuestaSecreta,
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario registrado con éxito", usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

module.exports = router;