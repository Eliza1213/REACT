import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Preguntas.css"; // Importa el archivo de estilos

const ListarPreguntas = () => {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/preguntas");
        if (!response.ok) {
          throw new Error("No se pudo cargar las preguntas");
        }
        const data = await response.json();
        console.log("Preguntas cargadas:", data); // Verifica los datos en consola
        setPreguntas(data);
      } catch (error) {
        console.error("Error al cargar las preguntas:", error);
      }
    };

    fetchPreguntas();
  }, []);

  // Función para eliminar una pregunta con confirmación
  const handleEliminar = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar esta pregunta?"
    );

    if (confirmacion) {
      try {
        const response = await fetch(`http://localhost:4000/api/preguntas/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Actualiza la lista de preguntas después de eliminar
          setPreguntas((prevPreguntas) =>
            prevPreguntas.filter((pregunta) => pregunta._id !== id)
          );
        } else {
          console.error("No se pudo eliminar la pregunta");
        }
      } catch (error) {
        console.error("Error al eliminar la pregunta:", error);
      }
    }
  };

  return (
    <div className="preguntas-container">
      <h2>Preguntas</h2>
      {/* Botón para crear una nueva pregunta */}
      <Link to="/preguntasAdmin/crear" className="btn-crear">
        ➕ Crear Nueva Pregunta
      </Link>
      {preguntas.length === 0 ? (
        <p className="preguntas-vacio">No hay preguntas disponibles</p>
      ) : (
        <table className="preguntas-tabla">
          <thead>
            <tr>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {preguntas.map((pregunta) => (
              <tr key={pregunta._id} className="pregunta-fila">
                <td>{pregunta.pregunta || "Sin título"}</td>
                <td className="acciones">
                  <Link
                    to={`/preguntasAdmin/actualizar/${pregunta._id}`}
                    className="btn-accion btn-actualizar"
                  >
                    Actualizar
                  </Link>
                  <button
                    onClick={() => handleEliminar(pregunta._id)}
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

export default ListarPreguntas;