import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListarVisiones = () => {
  const [visiones, setVisiones] = useState([]);

  useEffect(() => {
    const fetchVisiones = async () => {
      const response = await fetch("http://localhost:4000/api/visiones");
      const data = await response.json();
      setVisiones(data);
    };

    fetchVisiones();
  }, []);

  // Función para eliminar una visión con confirmación
  const handleEliminar = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar esta visión?"
    );

    if (confirmacion) {
      const response = await fetch(`http://localhost:4000/api/visiones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Actualiza la lista de visiones después de eliminar
        setVisiones(visiones.filter((vision) => vision._id !== id));
      }
    }
  };

  return (
    <div className="visiones-container">
      <h2>Visiones</h2>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {visiones.map((vision) => (
            <tr key={vision._id}>
              <td>{vision.titulo}</td>
              <td>{vision.descripcion}</td>
              <td>
                <Link to={`/visionesAdmin/actualizar/${vision._id}`} className="btn">
                  Actualizar
                </Link>
                <button
                  onClick={() => handleEliminar(vision._id)}
                  className="btn"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarVisiones;
