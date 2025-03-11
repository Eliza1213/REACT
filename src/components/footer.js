import '../styles/Footer.css';  

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li><a href="../views/public/content/quienesSomos.js" className="footer-link">¿Quiénes somos?</a></li>
          <li><a href="../views/public/content/mision.js" className="footer-link">Misión</a></li>
          <li><a href="../views/public/content/vision.js" className="footer-link">Visión</a></li>
          <li><a href="../views/public/content/historia.js" className="footer-link">Historia</a></li>
          <li><a href="../views/public/content/politicas.js" className="footer-link">Políticas de privacidad</a></li>
          <li><a href="../views/public/content/contacto.js" className="footer-link">Contacto</a></li>
          <li><a href="../views/public/content/cartaDeContacto.js" className="footer-link">Carta de contacto</a></li>
          <li><a href="../views/public/content/ubicacion.js" className="footer-link">Ubicación</a></li>
        </ul>
        <p className="footer-text">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
