import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormularioProducto } from "./FormularioProducto";
import { validarProducto } from "../../utils/validarProducto";
import { subirImagen } from "../../services/subirImagen";
import { createProduct } from "../../services/productosService";
import "./FormularioProducto.css";

const formVacio = {
  nombre: "",
  precio: "",
  categoria: "",
  descripcion: "",
};

export const FormularioProductoContainer = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});
  const [archivo, setArchivo] = useState(null);
  const [producto, setProducto] = useState(formVacio);

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

    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      setCargando(false);
      return;
    }

    try {
      // primero subimos la foto y después guardamos el producto
      const urlImagen = await subirImagen(archivo);

      const datosProducto = {
        ...producto,
        precio: Number(producto.precio),
        imagen: urlImagen,
      };

      const id = await createProduct(datosProducto);

      setProducto(formVacio);
      setArchivo(null);

      navigate(`/admin/exito/${id}`, { replace: true });
    } catch (error) {
      setErrores({ general: error.message });
    } finally {
      setCargando(false);
    }
  };

  return (
    <FormularioProducto
      producto={producto}
      errores={errores}
      cargando={cargando}
      onCambio={manejarCambio}
      onArchivo={manejarArchivo}
      onEnvio={manejarEnvio}
    />
  );
};
