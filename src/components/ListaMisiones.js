import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListarMisiones = () => {
  const [misiones, setMisiones] = useState([]);

  useEffect(() => {
    const fetchMisiones = async () => {
      const response = await fetch("http://localhost:4000/api/misiones");
      const data = await response.json();
      setMisiones(data);
    };

    fetchMisiones();
  }, []);

  // Función para eliminar una misión con confirmación
  const handleEliminar = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar esta misión?"
    );

    if (confirmacion) {
      const response = await fetch(`http://localhost:4000/api/misiones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Actualiza la lista de misiones después de eliminar
        setMisiones(misiones.filter((mision) => mision._id !== id));
      }
    }
  };

  return (
    <div className="misiones-container">
      <h2>Misiones</h2>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {misiones.map((mision) => (
            <tr key={mision._id}>
              <td>{mision.titulo}</td>
              <td>{mision.descripcion}</td>
              <td>
                <Link to={`/misionesAdmin/actualizar/${mision._id}`} className="btn">
                  Actualizar
                </Link>
                <button
                  onClick={() => handleEliminar(mision._id)}
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

export default ListarMisiones;
