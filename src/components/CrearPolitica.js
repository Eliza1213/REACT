import React, { useState } from "react";

const CrearPolitica = () => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPolitica = { titulo, contenido };

    try {
      console.log("Enviando solicitud POST:", newPolitica); // Depuración
      const response = await fetch("http://localhost:4000/api/politicas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPolitica),
      });

      if (response.ok) {
        alert("Política creada con éxito");
        setTitulo("");
        setContenido("");
      } else {
        throw new Error("Error al crear política");
      }
    } catch (error) {
      console.error("Error en la creación de política:", error);
      setError(error.message);
    }
  };

  return (
    <div className="politicas-container">
      <h2>Crear Política</h2>
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
          placeholder="Contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
        />
        <button type="submit">Crear Política</button>
      </form>
    </div>
  );
};

export default CrearPolitica;
