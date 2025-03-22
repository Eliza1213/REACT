import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarTermino = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTermino = async () => {
      try {
        console.log("Obteniendo término con ID:", id); // Depuración
        const response = await fetch(`http://localhost:4000/api/terminos/${id}`);
        if (!response.ok) throw new Error("Error al obtener el término");
        const data = await response.json();
        console.log("Término obtenido:", data); // Depuración
        setTitulo(data.titulo);
        setDescripcion(data.descripcion);
      } catch (error) {
        console.error(error);
        setError("Error al obtener el término.");
      }
    };

    fetchTermino();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTermino = { titulo, descripcion };

    try {
      console.log("Enviando solicitud PUT:", updatedTermino); // Depuración
      const response = await fetch(`http://localhost:4000/api/terminos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTermino),
      });

      if (response.ok) {
        alert("Término actualizado con éxito");
        navigate("/admin/terminos/listar");
      } else {
        throw new Error("Error al actualizar término");
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
      setError(error.message);
    }
  };

  return (
    <div className="terminos-container">
      <h2>Actualizar Término</h2>
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
        <button type="submit">Actualizar Término</button>
      </form>
    </div>
  );
};

export default ActualizarTermino;
