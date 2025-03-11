import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Catalogo from "./components/catalogo";
import Footer from "./components/footer";
import Registro from "./views/public/registro";
import Login from "./views/public/login";
import IndexP from "./views/private/indexP";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private/indexP" element={<IndexP />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;