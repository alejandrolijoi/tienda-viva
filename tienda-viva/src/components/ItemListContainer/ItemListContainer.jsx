import "./ItemListContainer.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { getProducts, getByCategory } from "../../services/productosService";

// Para no mostrar el id crudo de la categoría en el título
const nombresCategoria = {
  audio: "Audio",
  perifericos: "Periféricos",
  computacion: "Computación",
  disco: "Discos",
};

export const ItemListContainer = ({ saludo }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      setError(null);

      try {
        const datos = categoryId
          ? await getByCategory(categoryId)
          : await getProducts();

        setProductos(datos);
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [categoryId]);

  return (
    <section className="item-list-container">
      <h2>{categoryId ? nombresCategoria[categoryId] || categoryId : saludo}</h2>
      <p>Explora nuestros productos destacados.</p>

      {cargando && <p className="cargando">Cargando productos...</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && <ItemList productos={productos} />}
    </section>
  );
};
