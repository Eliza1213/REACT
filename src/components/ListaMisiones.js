// components/ListarMisiones.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/ListaMisiones.css"; // Importa el archivo de estilos

const ListarMisiones = () => {
  const [misiones, setMisiones] = useState([]);

  useEffect(() => {
    const fetchMisiones = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/misiones");
        if (!response.ok) throw new Error("Error al obtener misiones");
        const data = await response.json();
        console.log("Misiones obtenidas:", data); // Depuración
        setMisiones(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMisiones();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta misión?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/misiones/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setMisiones(misiones.filter((mision) => mision._id !== id));
        } else {
          console.error("Error al eliminar la misión");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="misiones-container">
      <h2 className="misiones-titulo">Misiones</h2>
      {/* Botón para crear una nueva misión */}
      <Link to="/admin/misiones/crear" className="btn-crear">
        ➕ Crear Nueva Misión
      </Link>
      {misiones.length === 0 ? (
        <p className="misiones-vacio">No hay misiones disponibles</p>
      ) : (
        <table className="misiones-tabla">
          <thead>
            <tr>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {misiones.map((mision) => (
              <tr key={mision._id} className="mision-fila">
                <td>{mision.titulo}</td>
                <td className="acciones">
                  <Link
                    to={`/admin/misiones/actualizar/${mision._id}`}
                    className="btn-accion btn-actualizar"
                  >
                    Actualizar
                  </Link>
                  <button
                    onClick={() => handleEliminar(mision._id)}
                    className="btn-accion btn-eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarMisiones;