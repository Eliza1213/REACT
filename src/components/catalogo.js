import { useState } from "react";
import '../styles/Catalogo.css';

const productos = [
  { id: 1, name: "Terrario de Vidrio", price: "$50", image: "/images/terrario.jpg" },
  { id: 2, name: "Lámpara UVB", price: "$30", image: "/images/lampara.jpg" },
  { id: 3, name: "Filtro de Agua", price: "$25", image: "/images/filtro.jpg" },
  { id: 4, name: "Alimento para Tortugas", price: "$10", image: "/images/alimento.jpg" }
];

const Catalogo = () => {
  const [carrito, darCarrito] = useState([]);

  const aggCarrito = (producto) => {
    darCarrito([...carrito, producto]);
  };

  return (
    <div className="catalogo">
      <h2 className="catalogo-title">Catálogo de Productos</h2>
      <div className="productos-container">
        {productos.map((producto) => (
          <div key={producto.id} className="producto">
            <img src={producto.image} alt={producto.name} className="producto-img" />
            <h3 className="producto-name">{producto.name}</h3>
            <p className="producto-price">{producto.price}</p>
            <button 
              className="producto-btn"
              onClick={() => aggCarrito(producto)}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
