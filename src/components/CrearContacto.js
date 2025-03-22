import React, { useState } from "react";

const CrearContacto = () => {
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [redesSociales, setRedesSociales] = useState([]); // Inicialmente, sin redes sociales

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoContacto = { email, telefono, ubicacion, redes_sociales: redesSociales };

    const response = await fetch("http://localhost:4000/api/contactos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoContacto),
    });

    if (response.ok) {
      alert("Contacto creado con éxito");
    } else {
      alert("Error al crear contacto");
    }
  };

  const handleAgregarRedSocial = () => {
    setRedesSociales([...redesSociales, { nombre: "", enlace: "" }]); // Agrega una nueva red social vacía
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

  return (
    <div className="contactos-container">
      <h2>Crear Contacto</h2>
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

        <button type="submit">Crear Contacto</button>
      </form>
    </div>
  );
};

export default CrearContacto;
