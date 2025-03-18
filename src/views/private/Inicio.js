import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const nombreUsuario = localStorage.getItem("usuario");
    if (!nombreUsuario) {
      navigate("/login");
    } else {
      setUsuario(nombreUsuario);
    }
  }, [navigate]);

  return (
    <section style={{ textAlign: "center", padding: "20px" }}>
      <h2>Bienvenido {usuario ? usuario : "Usuario"}</h2>
      <p>Has iniciado sesión correctamente.</p>
    </section>
  );
};

export default Inicio;