import { Link } from "react-router-dom";
import "./Item.css";

export const Item = ({ producto }) => {
  const { id, nombre, precio, imagen } = producto;

  return (
    <article className="item-container">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p className="price">${precio.toLocaleString("es-AR")}</p>
      <Link className="btn bg-primary" to={`/item/${id}`}>
        Ver detalle
      </Link>
    </article>
  );
};