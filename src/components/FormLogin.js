import { useState } from "react";
import Swal from "sweetalert2";
import '../styles/Login.css';
import { useNavigate } from "react-router-dom";  // Importa useNavigate

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();  // Usa useNavigate aquí para acceder a la función de navegación

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;
    let errorMessage = "";

    // Validación del email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      errorMessage += "El campo 'Correo Electrónico' no es válido.\n";
    }

    // Validación de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/;
    if (!passwordRegex.test(password)) {
      isValid = false;
      errorMessage += "La contraseña debe tener al menos 12 caracteres, incluyendo una letra mayúscula, un número y un carácter especial.\n";
    }

    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
      return;
    }

    // Si la validación pasa, hacer la solicitud POST al backend
    try {
      const response = await fetch("http://localhost:4000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        Swal.fire({
          icon: "success",
          title: "¡Inicio de sesión exitoso!",
          text: "Bienvenido de nuevo.",
          confirmButtonColor: "#4caf50",
        });
        
        // Usar navigate para redirigir a la página privada en lugar de window.location.href
        navigate("/private/indexP");  // Redirige a la página privada
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Hubo un problema con el inicio de sesión.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor. Intenta nuevamente.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Correo Electrónico:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">Contraseña:</label>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          maxLength={12}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <label>
        ¿Olvidaste la contraseña? 
        <a href="verificarCorreo.html">Recuperar la contraseña</a>
      </label>

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default FormLogin;