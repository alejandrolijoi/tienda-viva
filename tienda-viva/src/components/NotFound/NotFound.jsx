import { Link } from "react-router-dom";
import "./NotFound.css";

export const NotFound = () => {
  return (
    <section className="not-found">
      <h2>404</h2>
      <p className="secondary">
        La página que buscás no existe o el producto ya no está disponible.
      </p>

      <Link to="/" className="btn bg-primary">
        Volver a la tienda
      </Link>
    </section>
  );
};
