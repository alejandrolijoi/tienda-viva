import { useEffect, useState } from "react";
import { ListaProductos } from "./ListaProductos";
import { deleteProduct, getProducts } from "../../services/productosService";
import "./ListaProductos.css";

export const ListaProductosContainer = ({ mostrarEncabezado = true }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const traerProductos = async () => {
      try {
        const datos = await getProducts();
        setProductos(datos);
      } catch {
        setError("No se pudieron traer los productos");
      } finally {
        setCargando(false);
      }
    };

    traerProductos();
  }, []);

  const eliminarProducto = async (producto) => {
    const confirmado = window.confirm(
      `¿Seguro que querés eliminar "${producto.nombre}"?`
    );

    if (!confirmado) return;

    try {
      await deleteProduct(producto.id);
      setProductos((prev) => prev.filter((p) => p.id !== producto.id));
    } catch {
      setError("No se pudo eliminar el producto");
    }
  };

  if (cargando) {
    return <p className="secondary">Cargando productos...</p>;
  }

  return (
    <ListaProductos
      productos={productos}
      error={error}
      mostrarEncabezado={mostrarEncabezado}
      onEliminar={eliminarProducto}
    />
  );
};
