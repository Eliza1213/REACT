import { useState } from "react";
import Swal from "sweetalert2";
import '../styles/registro.css';

const FormRegistro = () => {
  const [step, setStep] = useState(0);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const togglePassword = (id) => {
    const input = document.getElementById(id);
    if (input) {
      input.type = input.type === "password" ? "text" : "password";
    }
  };

  const validarFormulario = async (e) => {
    e.preventDefault();
    console.log(formData); 
    const {
      nombre,
      ap,
      am,
      username,
      email,
      password,
      confirmPassword,
      telefono,
      preguntaSecreta,
      respuestaSecreta,
      terminos,
    } = formData;

    const soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    const letrasYNumeros = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/;
    const telefonoRegex = /^[0-9]{10}$/;

    let errorMessage = "";

    if (!soloLetras.test(nombre)) errorMessage += "El campo 'Nombre/s' solo debe contener letras.\n";
    if (!soloLetras.test(ap)) errorMessage += "El campo 'Apellido Paterno' solo debe contener letras.\n";
    if (!soloLetras.test(am)) errorMessage += "El campo 'Apellido Materno' solo debe contener letras.\n";
    if (!letrasYNumeros.test(username)) errorMessage += "El campo 'Nombre de Usuario/Alias' solo debe contener letras y números.\n";
    if (!emailRegex.test(email)) errorMessage += "El campo 'Correo Electrónico' no es válido.\n";
    if (!passwordRegex.test(password)) errorMessage += "La contraseña debe tener al menos 12 caracteres, incluyendo una letra mayúscula, un número y un carácter especial.\n";
    if (password !== confirmPassword) errorMessage += "Las contraseñas no coinciden.\n";
    if (!telefonoRegex.test(telefono)) errorMessage += "El campo 'Número de Teléfono' debe contener exactamente 10 dígitos.\n";
    if (!soloLetras.test(respuestaSecreta)) errorMessage += "El campo 'Respuesta Secreta' solo debe contener letras.\n";
    if (!terminos) errorMessage += "Debe aceptar los términos y condiciones.\n";

    if (errorMessage) {
      Swal.fire({ title: "Errores en el formulario", text: errorMessage, icon: "error" });
    } else {
      try {
        // Enviar los datos al servidor
        const response = await fetch("http://localhost:4000/api/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            ap,
            am,
            username,
            email,
            password,
            telefono,
            preguntaSecreta,
            respuestaSecreta,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          Swal.fire({
            title: "Registro exitoso",
            text: data.mensaje,
            icon: "success",
          }).then(() => {
            // Limpiar formulario si es exitoso
            setFormData({
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
          });
        } else {
          Swal.fire({
            title: "Error",
            text: data.error || "Hubo un error al registrar el usuario.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo conectar con el servidor.",
          icon: "error",
        });
      }
    }
  };  

  return (
    <section id="registro">
      <h2>Registro de Usuario</h2>
      <form onSubmit={validarFormulario} style={{ maxWidth: "400px", margin: "auto" }}>
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
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required maxLength={12}/>
            <button type="button" onClick={() => togglePassword("password")}>👁️</button>
            <label>Confirmar Contraseña:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required maxLength={12}/>
            <button type="button" onClick={() => togglePassword("confirmPassword")}>👁️</button>
            <button type="button" onClick={() => setStep(0)}>Atrás</button>
            <button type="button" onClick={() => setStep(2)}>Siguiente</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label>Número de Teléfono:</label>
            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
            <label>Pregunta Secreta:</label>
            <select name="preguntaSecreta" value={formData.preguntaSecreta} onChange={handleChange} required>
              <option value="">Seleccione una pregunta</option>
              <option value="personaje-favorito">¿Cuál es tu personaje favorito?</option>
              <option value="pelicula-favorita">¿Cuál es tu película favorita?</option>
              <option value="mejor-amigo">¿Quién es tu mejor amigo?</option>
              <option value="nombre-mascota">¿Cuál es el nombre de tu mascota?</option>
              <option value="deporte-favorito">¿Cuál es tu deporte favorito?</option>
            </select>
            <label>Respuesta Secreta:</label>
            <input type="text" name="respuestaSecreta" value={formData.respuestaSecreta} onChange={handleChange} required />
            <label>
              <input type="checkbox" name="terminos" checked={formData.terminos} onChange={handleChange} required /> Acepto los Términos y Condiciones
            </label>
            <button type="button" onClick={() => setStep(1)}>Atrás</button>
            <button type="submit">Registrarse</button>
          </div>
        )}
      </form>
    </section>
  );
};

export default FormRegistro;