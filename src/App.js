import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/headerPublic";
import Catalogo from "./components/catalogo";
import Footer from "./components/footer";
import Registro from "./views/public/registro";
import Login from "./views/public/login";
import Inicio from "./views/private/Inicio";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Inicio />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;