import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Nav } from "../Nav/Nav";
import { CartWidget } from "../CartWidget/CartWidget";
import "./Header.css";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <h1>Tienda Viva</h1>
      <Nav />
      <div className="header-acciones">
        <CartWidget />

        {/* si ya hay sesión, el botón lleva directo al panel */}
        <Link to={user ? "/admin" : "/login"} className="header-login">
          {user ? "Panel" : "Ingresar"}
        </Link>
      </div>
    </header>
  );
};
