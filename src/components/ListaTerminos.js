import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/ListaTerminos.css"; // Importa el archivo de estilos

const ListarTerminos = () => {
  const [terminos, setTerminos] = useState([]);

  useEffect(() => {
    const fetchTerminos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/terminos");
        if (!response.ok) throw new Error("Error al obtener términos");
        const data = await response.json();
        console.log("Términos obtenidos:", data); // Depuración
        setTerminos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTerminos();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este término?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/terminos/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setTerminos(terminos.filter((termino) => termino._id !== id));
        } else {
          console.error("Error al eliminar el término");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="terminos-container">
      <h2 className="terminos-titulo">Términos</h2>
      {/* Botón para crear un nuevo término */}
      <Link to="/admin/terminos/crear" className="btn-crear">
        ➕ Crear Nuevo Término
      </Link>
      {terminos.length === 0 ? (
        <p className="terminos-vacio">No hay términos disponibles</p>
      ) : (
        <table className="terminos-tabla">
          <thead>
            <tr>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {terminos.map((termino) => (
              <tr key={termino._id} className="termino-fila">
                <td>{termino.titulo}</td>
                <td className="acciones">
                  <Link
                    to={`/admin/terminos/actualizar/${termino._id}`}
                    className="btn-accion btn-actualizar"
                  >
                    Actualizar
                  </Link>
                  <button
                    onClick={() => handleEliminar(termino._id)}
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

export default ListarTerminos;
