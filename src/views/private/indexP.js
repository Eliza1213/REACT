import InicioP from "./Inicio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalogo from "./components/catalogo";
import Footer from "./components/footer";
import Registro from "./views/public/registro";
import Login from "./views/public/login";

const Inicio = () => {
  return (
    <>
    <InicioP />
    <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
    </Routes>
    <Footer />
    </>
  );
};

export default Inicio;