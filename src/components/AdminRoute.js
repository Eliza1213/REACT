import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const rol = localStorage.getItem("rol");
  return rol === "admin" ? <Outlet /> : <Navigate to="/usuario" />;
};

export default AdminRoute;