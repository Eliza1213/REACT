import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarVision = () => {
  const { id } = useParams(); // Obtiene el ID de la misión desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const fetchMision = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/visiones/${id}`);
        if (!response.ok) throw new Error("Error al obtener la visión");
        const data = await response.json();
        setTitulo(data.titulo);
        setDescripcion(data.descripcion);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMision();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedVision = { titulo, descripcion };

    try {
      const response = await fetch(`http://localhost:4000/api/visiones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVision),
      });

      if (response.ok) {
        alert("Visión actualizada con éxito");
        navigate("/admin/visiones/listar"); // Redirige a la lista de misiones
      } else {
        alert("Error al actualizar Visión");
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return (
    <div className="visiones-container">
      <h2>Actualizar Visión</h2>
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
