const express = require("express");
const {
  registerUser,
  loginUser,
  getUsuarios,
  updateUsuario,
  updateRol,
  deleteUsuario,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas públicas (no requieren autenticación)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Ruta protegida para usuarios autenticados
router.get("/perfil", authMiddleware(), (req, res) => {
  res.json({ mensaje: "Bienvenido a tu perfil", usuario: req.user });
});

// Rutas protegidas solo para administradores
router.get("/admin/usuarios", authMiddleware(["admin"]), getUsuarios);
router.put("/admin/usuarios/:id", authMiddleware(["admin"]), updateUsuario); 
router.put("/admin/usuarios/:id/rol", authMiddleware(["admin"]), updateRol);
router.delete("/admin/usuarios/:id", authMiddleware(["admin"]), deleteUsuario);

module.exports = router;