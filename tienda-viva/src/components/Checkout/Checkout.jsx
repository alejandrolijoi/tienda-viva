import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

export const Checkout = ({ onCompraTerminada }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });
  const [orderId, setOrderId] = useState(null);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosForm((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    // simulamos el envío a un servidor
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    setOrderId(id);

    clearCart();
    onCompraTerminada();
  };

  if (orderId) {
    return (
      <div className="checkout-ok">
        <p className="secondary">Tu número de orden es:</p>
        <p className="orden">#{orderId}</p>
      </div>
    );
  }

  return (
    <form className="checkout" onSubmit={manejarEnvio}>
      <h3>Datos para el envío</h3>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre y apellido"
        value={datosForm.nombre}
        onChange={manejarCambio}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={datosForm.email}
        onChange={manejarCambio}
        required
      />
      <input
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        value={datosForm.telefono}
        onChange={manejarCambio}
        required
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección de entrega"
        value={datosForm.direccion}
        onChange={manejarCambio}
        required
      />

      <button type="submit" className="btn bg-success">Confirmar compra</button>
    </form>
  );
};