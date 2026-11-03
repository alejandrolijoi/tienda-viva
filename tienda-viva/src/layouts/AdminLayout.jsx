import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminLayout.css";

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <main>
      <nav className="admin-nav">
        <div className="admin-nav-grupo">
          <Link to="/admin/dashboard">Panel</Link>
          <Link to="/admin/productos">Productos</Link>
          <Link to="/admin/producto/nuevo">Cargar producto</Link>
        </div>

        <div className="admin-nav-grupo">
          <Link to="/">Ver tienda</Link>
          <button className="btn bg-delete" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <Outlet />
    </main>
  );
};
