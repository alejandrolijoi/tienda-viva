import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <h2>Panel de administración</h2>

        <div className="dashboard-botones">
          <Link to="/" className="btn bg-primary">
            Volver a la tienda
          </Link>
          <button className="btn bg-delete" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        <Link to="/admin/producto/nuevo" className="dashboard-card">
          Cargar producto
        </Link>
        <span className="dashboard-card deshabilitado">Modificar</span>
        <span className="dashboard-card deshabilitado">Eliminar</span>
      </div>

      <p className="secondary">
        Desde este panel podés cargar los productos de la tienda.
      </p>
    </section>
  );
};
