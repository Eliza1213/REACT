import React, { useState } from "react";

const CrearVision = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVision = { titulo, descripcion };

    const response = await fetch("http://localhost:4000/api/visiones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVision),
    });

    if (response.ok) {
      alert("Visión creada con éxito");
    } else {
      alert("Error al crear visión");
    }
  };

  return (
    <div className="visiones-container">
      <h2>Crear Visión</h2>
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
        <button type="submit">Crear Visión</button>
      </form>
    </div>
  );
};

export default CrearVision;
