import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarPregunta = () => {
  const { id } = useParams(); // Obtiene el ID de la pregunta desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  useEffect(() => {
    const fetchPregunta = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/preguntas/${id}`);
        if (!response.ok) throw new Error("Error al obtener la pregunta");
        const data = await response.json();
        setPregunta(data.pregunta);
        setRespuesta(data.respuesta);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPregunta();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPregunta = { pregunta, respuesta };

    try {
      const response = await fetch(`http://localhost:4000/api/preguntas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPregunta),
      });

      if (response.ok) {
        alert("Pregunta actualizada con éxito");
        navigate("/admin/preguntas/listar"); // Redirige a la lista de preguntas
      } else {
        alert("Error al actualizar pregunta");
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return (
    <div className="preguntas-container">
      <h2>Actualizar Pregunta</h2>
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
        <button type="submit">Actualizar Pregunta</button>
      </form>
    </div>
  );
};

export default ActualizarPregunta;
