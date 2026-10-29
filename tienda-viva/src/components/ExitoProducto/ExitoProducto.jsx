import { Link, useParams } from "react-router-dom";
import "./ExitoProducto.css";

export const ExitoProducto = () => {
  const { id } = useParams();

  return (
    <section className="exito-producto">
      <h2>Producto cargado con éxito</h2>
      <p className="secondary">ID del producto: {id}</p>

      <Link to="/admin/producto/nuevo" className="btn bg-primary">
        Cargar otro producto
      </Link>
    </section>
  );
};
