// components/ListarVisiones.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/ListaVisiones.css"; // Importa el archivo de estilos

const ListarVisiones = () => {
  const [visiones, setVisiones] = useState([]);

  useEffect(() => {
    const fetchVisiones = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/visiones");
        if (!response.ok) throw new Error("Error al obtener visiones");
        const data = await response.json();
        console.log("Visiones obtenidas:", data); // Depuración
        setVisiones(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchVisiones();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta visión?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/visiones/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setVisiones(visiones.filter((vision) => vision._id !== id));
        } else {
          console.error("Error al eliminar la visión");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="visiones-container">
      <h2 className="visiones-titulo">Visiones</h2>
      {/* Botón para crear una nueva visión */}
      <Link to="/admin/visiones/crear" className="btn-crear">
        ➕ Crear Nueva Visión
      </Link>
      {visiones.length === 0 ? (
        <p className="visiones-vacio">No hay visiones disponibles</p>
      ) : (
        <table className="visiones-tabla">
          <thead>
            <tr>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visiones.map((vision) => (
              <tr key={vision._id} className="vision-fila">
                <td>{vision.titulo}</td>
                <td className="acciones">
                  <Link
                    to={`/admin/visiones/actualizar/${vision._id}`}
                    className="btn-accion btn-actualizar"
                  >
                    Actualizar
                  </Link>
                  <button
                    onClick={() => handleEliminar(vision._id)}
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

export default ListarVisiones;
