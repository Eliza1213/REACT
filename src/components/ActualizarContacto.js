import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarContacto = () => {
  const { id } = useParams(); // Obtiene el ID del contacto desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [redesSociales, setRedesSociales] = useState([]);

  useEffect(() => {
    const fetchContacto = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/contactos/${id}`);
        if (!response.ok) throw new Error("Error al obtener el contacto");
        const data = await response.json();
        setEmail(data.email);
        setTelefono(data.telefono);
        setUbicacion(data.ubicacion);
        setRedesSociales(data.redes_sociales || []);
      } catch (error) {
        console.error("Error al obtener el contacto:", error);
      }
    };

    fetchContacto();
  }, [id]);

  const handleAgregarRedSocial = () => {
    setRedesSociales([...redesSociales, { nombre: "", enlace: "" }]);
  };

  const handleEliminarRedSocial = (index) => {
    const nuevasRedes = redesSociales.filter((_, i) => i !== index);
    setRedesSociales(nuevasRedes);
  };

  const handleCambiarRedSocial = (index, campo, valor) => {
    const nuevasRedes = [...redesSociales];
    nuevasRedes[index][campo] = valor;
    setRedesSociales(nuevasRedes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedContacto = { email, telefono, ubicacion, redes_sociales: redesSociales };

    try {
      const response = await fetch(`http://localhost:4000/api/contactos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContacto),
      });

      if (response.ok) {
        alert("Contacto actualizado con éxito");
        navigate("/admin/contactos/listar"); // Redirige a la lista de contactos
      } else {
        alert("Error al actualizar contacto");
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return (
    <div className="contactos-container">
      <h2>Actualizar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />

        <h4>Redes Sociales</h4>
        {redesSociales.map((red, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Nombre de la red social"
              value={red.nombre}
              onChange={(e) => handleCambiarRedSocial(index, "nombre", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enlace"
              value={red.enlace}
              onChange={(e) => handleCambiarRedSocial(index, "enlace", e.target.value)}
              required
            />
            <button type="button" onClick={() => handleEliminarRedSocial(index)}>
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAgregarRedSocial}>
          Agregar Red Social
        </button>

        <button type="submit">Actualizar Contacto</button>
      </form>
    </div>
  );
};

export default ActualizarContacto;
