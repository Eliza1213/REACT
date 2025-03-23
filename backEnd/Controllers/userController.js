const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { nombre, ap, am, username, email, password, telefono, preguntaSecreta, respuestaSecreta } = req.body;

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
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Iniciar sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ error: "Usuario no encontrado" });

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, "secreto", { expiresIn: "1h" });
    res.json({ token, rol: usuario.rol, nombre: usuario.nombre });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Obtener todos los usuarios (solo para administradores)
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, { password: 0 }); // Excluir la contraseña
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Actualizar un usuario (solo para administradores)
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ap, am, username, email, telefono, preguntaSecreta, respuestaSecreta, rol } = req.body;

    // Buscar el usuario por ID
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizar los campos del usuario
    usuario.nombre = nombre || usuario.nombre;
    usuario.ap = ap || usuario.ap;
    usuario.am = am || usuario.am;
    usuario.username = username || usuario.username;
    usuario.email = email || usuario.email;
    usuario.telefono = telefono || usuario.telefono;
    usuario.preguntaSecreta = preguntaSecreta || usuario.preguntaSecreta;
    usuario.respuestaSecreta = respuestaSecreta || usuario.respuestaSecreta;
    usuario.rol = rol || usuario.rol;

    // Guardar los cambios
    await usuario.save();

    // Excluir la contraseña en la respuesta
    const usuarioActualizado = usuario.toObject();
    delete usuarioActualizado.password;

    res.status(200).json({ mensaje: "Usuario actualizado con éxito", usuario: usuarioActualizado });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Actualizar el rol de un usuario (solo para administradores)
const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { rol },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el rol" });
  }
};

// Eliminar un usuario (solo para administradores)
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.findByIdAndDelete(id);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

module.exports = { registerUser, loginUser, getUsuarios, updateUsuario, updateRol, deleteUsuario };