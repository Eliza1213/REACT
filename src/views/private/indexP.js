import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IndexP = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Bienvenido a la página privada</h2>
      <button onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}>Cerrar sesión</button>
    </div>
  );
};

export default IndexP;