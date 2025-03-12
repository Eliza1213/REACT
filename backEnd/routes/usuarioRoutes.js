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

    if (!nombre || !ap || !am || !username || !email || !password || !telefono || !preguntaSecreta || !respuestaSecreta) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

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
      rol: "usuario",
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario registrado con éxito", usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});
// a partir de aqui es del inicio de sesion
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ error: "Usuario no encontrado" });

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      "secreto",
      { expiresIn: "1h" }
    );

    res.json({ token, rol: usuario.rol });
    res.json({ token, rol: usuario.rol, nombre: usuario.nombre });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});


module.exports = router;