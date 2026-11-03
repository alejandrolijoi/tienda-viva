import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormularioProducto } from "./FormularioProducto";
import { validarProducto } from "../../utils/validarProducto";
import { subirImagen } from "../../services/subirImagen";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../services/productosService";
import "./FormularioProducto.css";

const formVacio = {
  nombre: "",
  precio: "",
  categoria: "",
  stock: "",
  descripcion: "",
};

export const FormularioProductoContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [cargando, setCargando] = useState(false);
  const [cargandoProducto, setCargandoProducto] = useState(editando);
  const [errores, setErrores] = useState({});
  const [archivo, setArchivo] = useState(null);
  const [imagenActual, setImagenActual] = useState("");
  const [producto, setProducto] = useState(formVacio);

  // Si viene un id en la url, es porque estamos editando
  useEffect(() => {
    if (!editando) return;

    const traerProducto = async () => {
      try {
        const datos = await getProductById(id);

        setProducto({
          nombre: datos.nombre,
          precio: datos.precio,
          categoria: datos.categoria,
          stock: datos.stock ?? "",
          descripcion: datos.descripcion,
        });
        setImagenActual(datos.imagen);
      } catch {
        setErrores({ general: "No se pudo cargar el producto" });
      } finally {
        setCargandoProducto(false);
      }
    };

    traerProducto();
  }, [id, editando]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0] || null);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    setErrores({});
    setCargando(true);

    const erroresEncontrados = validarProducto({ ...producto, imagen: archivo });

    // Al editar, la foto vieja sigue valiendo si no eligen una nueva
    if (editando && !archivo) {
      delete erroresEncontrados.imagen;
    }

    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      setCargando(false);
      return;
    }

    try {
      // primero subimos la foto y después guardamos el producto
      const urlImagen = archivo ? await subirImagen(archivo) : imagenActual;

      const datosProducto = {
        ...producto,
        nombre: producto.nombre.trim(),
        categoria: producto.categoria.trim(),
        descripcion: producto.descripcion.trim(),
        precio: Number(producto.precio),
        stock: Number(producto.stock),
        imagen: urlImagen,
      };

      if (editando) {
        await updateProduct(id, datosProducto);
        navigate("/admin/productos", { replace: true });
        return;
      }

      const nuevoId = await createProduct(datosProducto);

      setProducto(formVacio);
      setArchivo(null);

      navigate(`/admin/exito/${nuevoId}`, { replace: true });
    } catch (error) {
      setErrores({ general: error.message });
    } finally {
      setCargando(false);
    }
  };

  if (cargandoProducto) {
    return <p className="secondary">Cargando producto...</p>;
  }

  return (
    <FormularioProducto
      producto={producto}
      errores={errores}
      cargando={cargando}
      editando={editando}
      onCambio={manejarCambio}
      onArchivo={manejarArchivo}
      onEnvio={manejarEnvio}
    />
  );
};
