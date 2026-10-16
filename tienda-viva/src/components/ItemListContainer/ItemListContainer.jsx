import "./ItemListContainer.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import "./ItemListContainer.css";

export const ItemListContainer = ({ saludo }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch("/data/productos.json");

        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener los productos");
        }

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  const productosFiltrados = categoryId
    ? productos.filter((producto) => producto.categoria === categoryId)
    : productos;

  return (
    <section className="item-list-container">
      <h2>{categoryId || saludo}</h2>
      <p>Explora nuestros productos destacados.</p>

      {cargando && <p className="cargando">Cargando productos...</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && <ItemList productos={productosFiltrados} />}
    </section>
  );
}