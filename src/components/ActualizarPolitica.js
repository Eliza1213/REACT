import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarPolitica = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPolitica = async () => {
      try {
        console.log("Obteniendo política con ID:", id); // Depuración
        const response = await fetch(`http://localhost:4000/api/politicas/${id}`);
        if (!response.ok) throw new Error("Error al obtener la política");
        const data = await response.json();
        console.log("Política obtenida:", data); // Depuración
        setTitulo(data.titulo);
        setContenido(data.contenido);
      } catch (error) {
        console.error(error);
        setError("Error al obtener la política.");
      }
    };

    fetchPolitica();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPolitica = { titulo, contenido };

    try {
      console.log("Enviando solicitud PUT:", updatedPolitica); // Depuración
      const response = await fetch(`http://localhost:4000/api/politicas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPolitica),
      });

      if (response.ok) {
        alert("Política actualizada con éxito");
        navigate("/admin/politicas/listar");
      } else {
        throw new Error("Error al actualizar política");
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
      setError(error.message);
    }
  };

  return (
    <div className="politicas-container">
      <h2>Actualizar Política</h2>
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
        <button type="submit">Actualizar Política</button>
      </form>
    </div>
  );
};

export default ActualizarPolitica;
