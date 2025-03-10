const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
connectDB();

// Definir rutas (Ejemplo: API para guardar usuarios)
app.use("/api/usuarios", require("./routes/usuarioRoutes"));
app.use("/api/usuarios/login", require("./routes/usuarioLoginRoutes"));   

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});