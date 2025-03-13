const mongoose = require("mongoose");

// Definir el esquema de Vision
const visionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
});

const Vision = mongoose.model("Vision", visionSchema);

module.exports = Vision;

