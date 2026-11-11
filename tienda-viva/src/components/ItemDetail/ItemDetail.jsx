import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";

export const ItemDetail = ({ producto }) => {
  const { nombre, categoria, descripcion, precio, imagen, stock } = producto;
  const [cantidad, setCantidad] = useState(1);
  const { cartItems, addToCart } = useCart();

  // si un producto no tiene stock cargado, no se puede comprar
  const stockDisponible = stock ?? 0;

  // cuántas unidades de este producto ya están en el carrito
  const enCarrito =
    cartItems.find((item) => item.id === producto.id)?.cantidad ?? 0;

  // lo que falta por agregar sin pasarse del stock
  const restante = Math.max(stockDisponible - enCarrito, 0);

  const sinStock = stockDisponible <= 0;
  const completo = !sinStock && restante <= 0;

  const restar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));
  const sumar = () => setCantidad((prev) => (prev < restante ? prev + 1 : prev));

  const manejarAgregar = () => {
    if (restante <= 0) return;

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

        {stock !== undefined && stock !== null && (
          <p className="secondary">
            {completo
              ? "Ya tenés todo el stock en el carrito"
              : `Stock disponible: ${restante}`}
          </p>
        )}

        <div className="cantidad">
          <button onClick={restar}>−</button>
          <span>{cantidad}</span>
          <button onClick={sumar} disabled={restante <= 0}>
            +
          </button>
        </div>

        <button
          className="btn bg-primary"
          onClick={manejarAgregar}
          disabled={sinStock || completo}
        >
          {sinStock
            ? "Sin stock"
            : completo
              ? "Ya está en tu carrito"
              : "Agregar al carrito"}
        </button>
      </div>
    </article>
  );
};