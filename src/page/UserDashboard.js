import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "../style/userDashboard.css";
import TerrarioControl from "../components/TerrarioControl"; // Importa el nuevo componente

const UserDashboard = () => {
  const [sliderOpen, setSliderOpen] = useState(false);

  const toggleSlider = () => {
    setSliderOpen(!sliderOpen);
  };

  return (
    <div className="user-dashboard">
      {/* Contenedor del perfil y gestor */}
      <div className="profile-manager">
        <button onClick={toggleSlider} className="profile-link">
          Menú
        </button>
      </div>

      {/* Deslizador del perfil */}
      <div className={`profile-slider ${sliderOpen ? "open" : ""}`}>
        <div className="profile-slider-content">
          <h2>Mi Perfil</h2>
          <Link to="/perfil" onClick={toggleSlider}>
            Editar Perfil
          </Link>
          <Link to="/configuraciones" onClick={toggleSlider}>
            Configuraciones de IOT
          </Link>
          <Link to="/cerrar-sesion" onClick={toggleSlider}>
            Cerrar Sesión
          </Link>
        </div>
      </div>

      <h1>Bienvenido, usuario</h1>

      {/* Ruta para el TerrarioControl */}
      <Routes>
        <Route path="/configuraciones" element={<TerrarioControl />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;