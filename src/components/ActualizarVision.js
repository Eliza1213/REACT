// components/ActualizarVision.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarVision = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVision = async () => {
      try {
        console.log("Obteniendo visión con ID:", id); // Depuración
        const response = await fetch(`http://localhost:4000/api/visiones/${id}`);
        if (!response.ok) throw new Error("Error al obtener la visión");
        const data = await response.json();
        console.log("Visión obtenida:", data); // Depuración
        setTitulo(data.titulo);
        setDescripcion(data.descripcion);
      } catch (error) {
        console.error(error);
        setError("Error al obtener la visión.");
      }
    };

    fetchVision();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedVision = { titulo, descripcion };

    try {
      console.log("Enviando solicitud PUT:", updatedVision); // Depuración
      const response = await fetch(`http://localhost:4000/api/visiones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVision),
      });

      if (response.ok) {
        alert("Visión actualizada con éxito");
        navigate("/admin/visiones/listar");
      } else {
        throw new Error("Error al actualizar visión");
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
      setError(error.message);
    }
  };

  return (
    <div className="visiones-container">
      <h2>Actualizar Visión</h2>
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
        <button type="submit">Actualizar Visión</button>
      </form>
    </div>
  );
};

export default ActualizarVision;
