import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let errors = [];

    // Validación del email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      errors.push("El campo 'Correo Electrónico' no es válido.");
    }

    // Validación de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.push("La contraseña debe tener al menos 12 caracteres, incluyendo una letra mayúscula, un número y un carácter especial.");
    }

    if (errors.length > 0) {
      Swal.fire({ icon: "error", title: "Error", html: errors.join("<br>"), confirmButtonColor: "#d33" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("usuario", data.nombre);

      Swal.fire({ icon: "success", title: "Inicio de sesión exitoso", text: "Bienvenido de nuevo." });

      navigate(data.rol === "administrador" ? "/admin" : "/usuario");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message, confirmButtonColor: "#d33" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <label>Correo Electrónico:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Contraseña:</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required maxLength={12} />
          <button type="button" onClick={togglePasswordVisibility} style={{ marginLeft: "10px" }}>
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <label>
          ¿Olvidaste la contraseña?{" "}
          <button type="button" onClick={() => navigate("/recup")} style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}>
            Recuperar la contraseña
          </button>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </section>
  );
};

export default FormLogin;