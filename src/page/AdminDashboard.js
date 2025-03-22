import "../style/Admin.css";
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import CrearMision from "../components/CrearMision";
import ListaMisiones from "../components/ListaMisiones";
import ActualizarMision from "../components/ActualizarMision";
import CrearVision from "../components/CrearVision";
import ListaVisiones from "../components/ListaVisiones";
import ActualizarVision from "../components/ActualizarVision";
import CrearTermino from "../components/CrearTermino";
import ListaTerminos from "../components/ListaTerminos";
import ActualizarTermino from "../components/ActualizarTermino";
import CrearPolitica from "../components/CrearPolitica";
import ListaPoliticas from "../components/ListaPoliticas";
import ActualizarPolitica from "../components/ActualizarPolitica";
import CrearPregunta from "../components/CrearPregunta";
import ListaPreguntas from "../components/ListaPreguntas";
import ActualizarPregunta from "../components/ActualizarPregunta";
import CrearContacto from "../components/CrearContacto"; // Nuevo
import ListaContactos from "../components/ListaContactos"; // Nuevo
import ActualizarContacto from "../components/ActualizarContacto"; // Nuevo

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      {/* Menú de navegación */}
      <nav className="admin-nav">
        <h1>Panel de Administración</h1>
        <ul className="nav-links">
          <li>
            <Link to="/admin/misiones">Misiones</Link>
          </li>
          <li>
            <Link to="/admin/visiones">Visiones</Link>
          </li>
          <li>
            <Link to="/admin/terminos">Términos</Link>
          </li>
          <li>
            <Link to="/admin/politicas">Políticas</Link>
          </li>
          <li>
            <Link to="/admin/preguntas">Preguntas</Link>
          </li>
          <li>
            <Link to="/admin/contactos">Contactos</Link> {/* Nuevo */}
          </li>
        </ul>
      </nav>

      {/* Contenido dinámico */}
      <div className="admin-content">
        <Routes>
          {/* Rutas para Misiones */}
          <Route path="misiones" element={<ListaMisiones />} />
          <Route path="misiones/crear" element={<CrearMision />} />
          <Route path="misiones/actualizar/:id" element={<ActualizarMision />} />

          {/* Rutas para Visiones */}
          <Route path="visiones" element={<ListaVisiones />} />
          <Route path="visiones/crear" element={<CrearVision />} />
          <Route path="visiones/actualizar/:id" element={<ActualizarVision />} />

          {/* Rutas para Términos */}
          <Route path="terminos" element={<ListaTerminos />} />
          <Route path="terminos/crear" element={<CrearTermino />} />
          <Route path="terminos/actualizar/:id" element={<ActualizarTermino />} />

          {/* Rutas para Políticas */}
          <Route path="politicas" element={<ListaPoliticas />} />
          <Route path="politicas/crear" element={<CrearPolitica />} />
          <Route path="politicas/actualizar/:id" element={<ActualizarPolitica />} />

          {/* Rutas para Preguntas */}
          <Route path="preguntas" element={<ListaPreguntas />} />
          <Route path="preguntas/crear" element={<CrearPregunta />} />
          <Route path="preguntas/actualizar/:id" element={<ActualizarPregunta />} />

          {/* Rutas para Contactos (Nuevo) */}
          <Route path="contactos" element={<ListaContactos />} />
          <Route path="contactos/crear" element={<CrearContacto />} />
          <Route path="contactos/actualizar/:id" element={<ActualizarContacto />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
