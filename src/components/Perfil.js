// src/components/Perfil.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Perfil.css"; // Importa los estilos

const Perfil = () => {
  const [perfil, setPerfil] = useState({
    nombre: "",
    ap: "",
    am: "",
    username: "",
    email: "",
    telefono: "",
    preguntaSecreta: "",
    respuestaSecreta: "",
  });

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("token");

    // Hacer la solicitud al backend para obtener los datos del perfil
    axios
      .get("http://localhost:4000/api/usuarios/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPerfil(response.data); // Guardar los datos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener el perfil:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil({
      ...perfil,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener el token del localStorage
    const token = localStorage.getItem("token");

    // Enviar los datos actualizados al backend (excluyendo el rol)
    const datosActualizados = { ...perfil };
    delete datosActualizados.rol; // Excluir el campo "rol"

    axios
      .put("http://localhost:4000/api/usuarios/perfil", datosActualizados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Perfil actualizado correctamente");
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
  };

  return (
    <div className="perfil-container">
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={perfil.nombre}
          onChange={handleChange}
        />
        <br />
        <label>Apellido Paterno:</label>
        <input
          type="text"
          name="ap"
          value={perfil.ap}
          onChange={handleChange}
        />
        <br />
        <label>Apellido Materno:</label>
        <input
          type="text"
          name="am"
          value={perfil.am}
          onChange={handleChange}
        />
        <br />
        <label>Nombre de usuario:</label>
        <input
          type="text"
          name="username"
          value={perfil.username}
          onChange={handleChange}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={perfil.email}
          onChange={handleChange}
        />
        <br />
        <label>Teléfono:</label>
        <input
          type="tel"
          name="telefono"
          value={perfil.telefono}
          onChange={handleChange}
        />
        <br />
        <label>Pregunta Secreta:</label>
        <input
          type="text"
          name="preguntaSecreta"
          value={perfil.preguntaSecreta}
          onChange={handleChange}
        />
        <br />
        <label>Respuesta Secreta:</label>
        <input
          type="text"
          name="respuestaSecreta"
          value={perfil.respuestaSecreta}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default Perfil;