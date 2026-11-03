import { Link } from "react-router-dom";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <h2>Panel de administración</h2>
      </header>

      <div className="dashboard-grid">
        <Link to="/admin/producto/nuevo" className="dashboard-card">
          Cargar producto
        </Link>
        <Link to="/admin/productos" className="dashboard-card">
          Modificar
        </Link>
        <Link to="/admin/productos" className="dashboard-card">
          Eliminar
        </Link>
      </div>

      <p className="secondary">
        Desde este panel podés cargar, modificar y eliminar los productos de la
        tienda.
      </p>
    </section>
  );
};
