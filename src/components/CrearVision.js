// components/CrearVision.js
import React, { useState } from "react";

const CrearVision = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVision = { titulo, descripcion };

    try {
      console.log("Enviando solicitud POST:", newVision); // Depuración
      const response = await fetch("http://localhost:4000/api/visiones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVision),
      });

      if (response.ok) {
        alert("Visión creada con éxito");
        setTitulo("");
        setDescripcion("");
      } else {
        throw new Error("Error al crear visión");
      }
    } catch (error) {
      console.error("Error en la creación de visión:", error);
      setError(error.message);
    }
  };

  return (
    <div className="visiones-container">
      <h2>Crear Visión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
