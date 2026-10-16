import "./Header.css";
import { Nav } from "../Nav/Nav";
import { CartWidget } from "../CartWidget/CartWidget";

export const Header = () => {
  return (
    <header className="header">
      <h1>Tienda Viva</h1>
      <Nav />
      <CartWidget />
    </header>
  );
};