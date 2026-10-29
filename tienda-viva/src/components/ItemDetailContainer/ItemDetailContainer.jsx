import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductById } from "../../services/productosService";

export const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const obtenerProducto = async () => {
      setCargando(true);
      setError(null);

      try {
        const encontrado = await getProductById(id);
        setProducto(encontrado);
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) return <p className="cargando">Cargando producto...</p>;
  if (error) return <p className="error">{error}</p>;

  return <ItemDetail producto={producto} />;
};
