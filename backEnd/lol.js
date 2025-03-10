const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const connectDB = require("./db"); // Importa la conexión a MongoDB

const port = 3019;
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conectar a la base de datos
connectDB();

const datosUsuario = new mongoose.Schema({
  nombre: String,
  ap: String,
  am: String,
  email: String,
  password: String,
  confirm_password: String,
});

const Usuario = mongoose.model("usuarios", datosUsuario);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/post", async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    const { nombre, ap, am, email, password, confirm_password } = req.body;

    if (!nombre || !ap || !am || !email || !password || !confirm_password) {
      return res.status(400).send("Todos los campos son obligatorios");
    }

    const nuevoUsuario = new Usuario({
      nombre,
      ap,
      am,
      email,
      password,
      confirm_password,
    });

    await nuevoUsuario.save();
    console.log("Usuario guardado:", nuevoUsuario);
    res.send("Registro exitoso");
  } catch (error) {
    console.error("Error al guardar datos:", error);
    res.status(500).send("Error al procesar el formulario");
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
});
