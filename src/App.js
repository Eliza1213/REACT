// src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import FormLogin from "./components/FormLogin";
import FormRegistro from "./components/FormRegistro";
import Home from "./components/Home";
import UserDashboard from "./page/UserDashboard";
import AdminDashboard from "./page/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import HeaderPublic from "./components/HeaderPublic";
import Perfil from "./components/Perfil";
import TerrarioControl from "./components/TerrarioControl";

function App() {
  return (
    <div>
      <HeaderPublic />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/registro" element={<FormRegistro />} />

        <Route element={<PrivateRoute />}>
          <Route path="/usuario" element={<UserDashboard />} />
          <Route path="configuraciones" element={<TerrarioControl />}/>
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/*" element={<AdminDashboard />}>
            {/* Añade otras rutas de administración aquí */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
