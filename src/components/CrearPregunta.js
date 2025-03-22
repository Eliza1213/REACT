import React, { useState } from "react";

const CrearPregunta = () => {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPregunta = { pregunta, respuesta };

    const response = await fetch("http://localhost:4000/api/preguntas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPregunta),
    });

    if (response.ok) {
      alert("Pregunta creada con éxito");
    } else {
      alert("Error al crear pregunta");
    }
  };

  return (
    <div className="preguntas-container">
      <h2>Crear Pregunta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pregunta"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          required
        />
        <textarea
          placeholder="Respuesta"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          required
        />
        <button type="submit">Crear Pregunta</button>
      </form>
    </div>
  );
};

export default CrearPregunta;
