import "./Header.css";
import { Nav } from "../Nav/Nav";

export const Header = () => {
  return (
    <header className="header">
      <h1>Tienda Viva</h1>
      <Nav />
    </header>
  );
};