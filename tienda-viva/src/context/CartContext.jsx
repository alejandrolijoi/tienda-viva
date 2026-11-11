import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// leemos el carrito guardado en el navegador.
// si no hay nada o está corrupto, arrancamos con el carrito vacío.
const leerCarrito = () => {
  try {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(leerCarrito);

  // guardamos el carrito para que no se pierda al recargar la página
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existe = prevItems.find((i) => i.id === item.id);

      if (existe) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, cantidad: i.cantidad + item.cantidad } : i
        );
      }

      return [...prevItems, item];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cantidad, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};