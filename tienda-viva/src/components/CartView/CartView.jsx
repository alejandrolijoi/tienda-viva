import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Checkout } from "../Checkout/Checkout";
import { useState } from "react";
import "./CartView.css";

export const CartView = () => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [compraTerminada, setCompraTerminada] = useState(false);

  if (cartItems.length === 0 && !compraTerminada) {
    return (
      <section className="cart-view">
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="btn bg-primary">Volver a la tienda</Link>
      </section>
    );
  }

  if (compraTerminada) {
    return (
      <section className="cart-view">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu pedido fue registrado correctamente.</p>
        <Link to="/" className="btn bg-primary">Seguir comprando</Link>
      </section>
    );
  }

  return (
    <section className="cart-view">
      <h2>Tu carrito</h2>

      <div className="cart-lista">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.imagen} alt={item.nombre} />
            <div className="cart-item-info">
              <h3>{item.nombre}</h3>
              <p className="secondary">Cantidad: {item.cantidad}</p>
            </div>
            <p className="precio">${(item.precio * item.cantidad).toLocaleString("es-AR")}</p>
            <button className="btn bg-delete" onClick={() => removeFromCart(item.id)}>
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <p className="secondary">Total</p>
        <p className="precio-total">${getTotalPrice().toLocaleString("es-AR")}</p>
      </div>

      <div className="cart-acciones">
        <button className="btn bg-delete" onClick={clearCart}>Vaciar carrito</button>
        <Checkout onCompraTerminada={() => setCompraTerminada(true)} />
      </div>
    </section>
  );
};