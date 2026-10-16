import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CartWidget.css";

export const CartWidget = () => {
  const { getTotalItems } = useCart();

  return (
    <Link to="/cart" className="cart-widget">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {getTotalItems() > 0 && <span className="contador">{getTotalItems()}</span>}
    </Link>
  );
};