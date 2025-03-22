import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación
import "../style/Home.css"; // Importa los estilos

const Home = () => {
  const [leftSliderOpen, setLeftSliderOpen] = useState(false);

  const toggleLeftSlider = () => {
    setLeftSliderOpen(!leftSliderOpen);
  };

  return (
    <div className="home-container">
      {/* Botón para abrir el deslizador izquierdo */}
      <button className="slider-toggle left" onClick={toggleLeftSlider}>
        ☰
      </button>

      {/* Deslizador izquierdo */}
      <div className={`left-slider ${leftSliderOpen ? "open" : ""}`}>
        <div className="slider-content">
          <h2>Menú</h2>
          <Link to="/informacion-tortugas" onClick={toggleLeftSlider}>
            Información de tortugas
          </Link>
          <Link to="/productos" onClick={toggleLeftSlider}>
            Productos
          </Link>
          <Link to="/quienes-somos" onClick={toggleLeftSlider}>
            Quiénes somos
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="home-content">
        <h1>Bienvenido a TORTU-TERRA</h1>
        

        {/* Contenedores para imágenes */}
        <div className="image-container">
          {/* Este contenedor está listo para una imagen */}
          <p>Contenedor para imagen 1</p>
        </div>
        <div className="image-container">
          {/* Este contenedor está listo para una imagen */}
          <p>Contenedor para imagen 2</p>
        </div>
      </div>
    </div>
  );
};

export default Home;