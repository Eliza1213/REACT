import '../../styles/Visiones.css';
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CrearVision from "../../components/CrearVision";
import ListaVisiones from "../../components/ListaVisiones";
import ActualizarVision from "../../components/ActualizarVision";

const VisionesAdmin = () => {
  return (
    <div className="visiones-container">
      <h1>Administración de Visión</h1>

      <div className="visiones-buttons">
        <Link to="/visionesAdmin/crear" className="btn">➕ Alta Visión</Link>
        <Link to="/visionesAdmin/listar" className="btn">📋 Ver Visiones</Link>
      </div>

      <Routes>
        <Route path="crear" element={<CrearVision />} />
        <Route path="listar" element={<ListaVisiones />} />
        <Route path="actualizar/:id" element={<ActualizarVision />} />
      </Routes>
    </div>
  );
};

export default VisionesAdmin;