import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarMision = () => {
  const { id } = useParams(); // Obtiene el ID de la misión desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const fetchMision = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/misiones/${id}`);
        if (!response.ok) throw new Error("Error al obtener la misión");
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

    const updatedMision = { titulo, descripcion };

    try {
      const response = await fetch(`http://localhost:4000/api/misiones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMision),
      });

      if (response.ok) {
        alert("Misión actualizada con éxito");
        navigate("/admin/misiones/listar"); // Redirige a la lista de misiones
      } else {
        alert("Error al actualizar misión");
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return (
    <div className="misiones-container">
      <h2>Actualizar Misión</h2>
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
        <button type="submit">Actualizar Misión</button>
      </form>
    </div>
  );
  
};

export default ActualizarMision;
