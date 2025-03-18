import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  
  useEffect(() => {
    const nombreUsuario = localStorage.getItem("usuario");
    if (nombreUsuario) {
      setUsuario(nombreUsuario);
    }
  }, []);

  const login = (nombre) => {
    localStorage.setItem("usuario", nombre);
    setUsuario(nombre);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
