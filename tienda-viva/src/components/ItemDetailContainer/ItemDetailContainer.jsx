import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";

export const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const respuesta = await fetch("/data/productos.json");

        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el producto");
        }

        const datos = await respuesta.json();
        const encontrado = datos.find((p) => p.id === Number(id));

        if (!encontrado) {
          throw new Error("Producto no encontrado");
        }

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