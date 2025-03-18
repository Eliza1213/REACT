import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "../styles/Header.css";

const HeaderPublic = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);

  const toggleSubmenu = (menu) => {
    setSubmenuOpen(submenuOpen === menu ? null : menu);
  };

  return (
    <header className="header">
      <div className="logo-title">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="title">Mi Encabezado</h1>
      </div>

      {/* Menú principal en pantallas grandes */}
      <nav className="nav">
        <Link to="/" className="nav-link">Inicio</Link>

        <div className="dropdown">
          <button className="nav-link" onClick={() => toggleSubmenu("sesion")}>
            Sesión
          </button>
          <ul className={`dropdown-menu ${submenuOpen === "sesion" ? "open" : ""}`}>
            <li><Link to="/registro" className="dropdown-item">Formulario de registro</Link></li>
            <li><Link to="/login" className="dropdown-item">Login</Link></li>
            <li><Link to="/recuperacion" className="dropdown-item">Recuperación de contraseña</Link></li>
          </ul>
        </div>

        <div className="dropdown">
          <button className="nav-link" onClick={() => toggleSubmenu("info")}>
            Información de tortugas
          </button>
          <ul className={`dropdown-menu ${submenuOpen === "info" ? "open" : ""}`}>
            <li><Link to="/src/views/public/tortugasAdecuadas" className="dropdown-item">Tortugas adecuadas</Link></li>
            <li><Link to="/src/views/public/cuidadosBasicos" className="dropdown-item">Cuidados básicos</Link></li>
            <li><Link to="/src/views/public/consejos" className="dropdown-item">Consejos para el hábitat</Link></li>
          </ul>
        </div>
      </nav>

      {/* Menú Hamburguesa solo en móviles */}
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menú responsive en móviles */}
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link">Inicio</Link>

        <div className="dropdown">
          <button className="nav-link" onClick={() => toggleSubmenu("sesion")}>
            Sesión
          </button>
          <ul className={`dropdown-menu ${submenuOpen === "sesion" ? "open" : ""}`}>
            <li><Link to="/src/views/public/registro" className="dropdown-item">Formulario de registro</Link></li>
            <li><Link to="/src/views/public/login" className="dropdown-item">Login</Link></li>
            <li><Link to="/src/views/public/recuperacion" className="dropdown-item">Recuperación de contraseña</Link></li>
          </ul>
        </div>

        <div className="dropdown">
          <button className="nav-link" onClick={() => toggleSubmenu("info")}>
            Información de tortugas
          </button>
          <ul className={`dropdown-menu ${submenuOpen === "info" ? "open" : ""}`}>
            <li><Link to="/src/views/public/tortugasAdecuadas" className="dropdown-item">Tortugas adecuadas</Link></li>
            <li><Link to="/src/views/public/cuidadosBasicos" className="dropdown-item">Cuidados básicos</Link></li>
            <li><Link to="/src/views/public/consejos" className="dropdown-item">Consejos para el hábitat</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderPublic;