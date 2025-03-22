import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/ListaPoliticas.css"; // Importa el archivo de estilos

const ListarPoliticas = () => {
  const [politicas, setPoliticas] = useState([]);

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/politicas");
        if (!response.ok) throw new Error("Error al obtener políticas");
        const data = await response.json();
        console.log("Políticas obtenidas:", data); // Depuración
        setPoliticas(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPoliticas();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta política?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/politicas/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPoliticas(politicas.filter((politica) => politica._id !== id));
        } else {
          console.error("Error al eliminar la política");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="politicas-container">
      <h2 className="politicas-titulo">Políticas</h2>
      {/* Botón para crear una nueva política */}
      <Link to="/admin/politicas/crear" className="btn-crear">
        ➕ Crear Nueva Política
      </Link>
      {politicas.length === 0 ? (
        <p className="politicas-vacio">No hay políticas disponibles</p>
      ) : (
        <table className="politicas-tabla">
          <thead>
            <tr>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {politicas.map((politica) => (
              <tr key={politica._id} className="politica-fila">
                <td>{politica.titulo}</td>
                <td className="acciones">
                  <Link
                    to={`/admin/politicas/actualizar/${politica._id}`}
                    className="btn-accion btn-actualizar"
                  >
                    Actualizar
                  </Link>
                  <button
                    onClick={() => handleEliminar(politica._id)}
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

export default ListarPoliticas;