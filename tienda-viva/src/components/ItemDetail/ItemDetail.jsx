import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";

export const ItemDetail = ({ producto }) => {
  const { nombre, categoria, descripcion, precio, imagen, stock } = producto;
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();

  // los productos dados de alta desde el panel pueden no tener stock
  const stockDisponible = stock ?? Infinity;

  const restar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));
  const sumar = () =>
    setCantidad((prev) => (prev < stockDisponible ? prev + 1 : prev));

  const manejarAgregar = () => {
    addToCart({ ...producto, cantidad });
    setCantidad(1);
  };

  return (
    <article className="item-detail">
      <img src={imagen} alt={nombre} />

      <div className="info">
        <p className="categoria">{categoria}</p>
        <h2>{nombre}</h2>
        <p className="descripcion">{descripcion}</p>
        <p className="price">${precio.toLocaleString("es-AR")}</p>

        <div className="cantidad">
          <button onClick={restar}>−</button>
          <span>{cantidad}</span>
          <button onClick={sumar}>+</button>
        </div>

        <button className="btn bg-primary" onClick={manejarAgregar}>
          Agregar al carrito
        </button>
      </div>
    </article>
  );
};