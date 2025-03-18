// src/components/CrearMision.js
import React, { useState } from "react";

const CrearMision = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMision = { titulo, descripcion };

    const response = await fetch("http://localhost:4000/api/misiones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMision),
    });

    if (response.ok) {
      alert("Misión creada con éxito");
    } else {
      alert("Error al crear misión");
    }
  };

  return (
    <div className="misiones-container">
      <h2>Crear Misión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <button type="submit">Crear Misión</button>
      </form>
    </div>
  );
  
};

export default CrearMision;
