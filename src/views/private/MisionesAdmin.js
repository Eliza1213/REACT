import '../../styles/Misiones.css';
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CrearMision from "../../components/CrearMision";
import ListaMisiones from "../../components/ListaMisiones";
import ActualizarMision from "../../components/ActualizarMision";

const MisionesAdmin = () => {
  return (
    <div className="misiones-container">
      <h1>Administración de Mision</h1>

      <div className="misiones-buttons">
        <Link to="/misionesAdmin/crear" className="btn">➕ Alta Misión</Link>
        <Link to="/misionesAdmin/listar" className="btn">📋 Ver Misiones</Link>
      </div>

      <Routes>
        <Route path="crear" element={<CrearMision />} />
        <Route path="listar" element={<ListaMisiones />} />
        <Route path="actualizar/:id" element={<ActualizarMision />} />
      </Routes>
    </div>
  );
};

export default MisionesAdmin;
