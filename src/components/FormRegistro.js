import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormRegistro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    ap: "",
    am: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    preguntaSecreta: "",
    respuestaSecreta: "",
    terminos: false,
  });

  const [step, setStep] = useState(0); // Paso actual del formulario
  const [showPassword, setShowPassword] = useState(false); // Mostrar/ocultar contraseña
  const navigate = useNavigate();

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Mostrar/ocultar contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validar el paso actual del formulario
  const validarPaso = (step) => {
    const {
      nombre,
      ap,
      am,
      username,
      email,
      password,
      confirmPassword,
      telefono,
      respuestaSecreta,
      terminos,
    } = formData;

    const soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    const letrasYNumeros = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/;
    const telefonoRegex = /^[0-9]{10}$/;

    let errores = [];

    if (step === 0) {
      if (!soloLetras.test(nombre)) errores.push("El campo 'Nombre/s' solo debe contener letras.");
      if (!soloLetras.test(ap)) errores.push("El campo 'Apellido Paterno' solo debe contener letras.");
      if (!soloLetras.test(am)) errores.push("El campo 'Apellido Materno' solo debe contener letras.");
    }

    if (step === 1) {
      if (!letrasYNumeros.test(username)) errores.push("El campo 'Nombre de Usuario' solo debe contener letras y números.");
      if (!emailRegex.test(email)) errores.push("El campo 'Correo Electrónico' no es válido.");
      if (!passwordRegex.test(password)) errores.push("La contraseña debe tener al menos 12 caracteres, incluyendo una letra mayúscula, un número y un carácter especial.");
      if (password !== confirmPassword) errores.push("Las contraseñas no coinciden.");
    }

    if (step === 2) {
      if (!telefonoRegex.test(telefono)) errores.push("El campo 'Teléfono' debe contener exactamente 10 dígitos.");
      if (!soloLetras.test(respuestaSecreta)) errores.push("El campo 'Respuesta Secreta' solo debe contener letras.");
      if (!terminos) errores.push("Debes aceptar los términos y condiciones.");
    }

    if (errores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Errores en el formulario",
        html: errores.join("<br>"),
      });
      return false;
    }
    return true;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarPaso(2)) return; // Validar el último paso antes de enviar

    try {
      const response = await fetch("http://localhost:4000/api/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          ap: formData.ap,
          am: formData.am,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          telefono: formData.telefono,
          preguntaSecreta: formData.preguntaSecreta,
          respuestaSecreta: formData.respuestaSecreta,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "¡Bienvenido! Por favor, inicia sesión.",
      }).then(() => {
        navigate("/login"); // Redirigir al login después del registro
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <div>
            <label>Nombre/s:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>Apellido Paterno:</label>
            <input type="text" name="ap" value={formData.ap} onChange={handleChange} required />

            <label>Apellido Materno:</label>
            <input type="text" name="am" value={formData.am} onChange={handleChange} required />

            <button type="button" onClick={() => setStep(1)}>Siguiente</button>
          </div>
        )}

        {step === 1 && (
          <div>
            <label>Nombre de Usuario:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />

            <label>Correo Electrónico:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Contraseña:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "🙈" : "👁️"}
            </button>

            <label>Confirmar Contraseña:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="button" onClick={() => setStep(0)}>Atrás</button>
            <button type="button" onClick={() => setStep(2)}>Siguiente</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label>Teléfono:</label>
            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />

            <label>Pregunta Secreta:</label>
            <select name="preguntaSecreta" value={formData.preguntaSecreta} onChange={handleChange} required>
              <option value="">Selecciona una pregunta</option>
              <option value="personaje-favorito">¿Cuál es tu personaje favorito?</option>
              <option value="pelicula-favorita">¿Cuál es tu película favorita?</option>
              <option value="mejor-amigo">¿Quién es tu mejor amigo?</option>
              <option value="nombre-mascota">¿Cuál es el nombre de tu mascota?</option>
              <option value="deporte-favorito">¿Cuál es tu deporte favorito?</option>
            </select>

            <label>Respuesta Secreta:</label>
            <input type="text" name="respuestaSecreta" value={formData.respuestaSecreta} onChange={handleChange} required />

            <label>
              <input
                type="checkbox"
                name="terminos"
                checked={formData.terminos}
                onChange={handleChange}
                required
              />
              Acepto los términos y condiciones
            </label>

            <button type="button" onClick={() => setStep(1)}>Atrás</button>
            <button type="submit">Registrarse</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormRegistro;