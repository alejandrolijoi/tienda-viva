export const validarProducto = (producto) => {
  const errores = {};

  if (!producto.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio";
  }

  if (!producto.precio || Number(producto.precio) <= 0) {
    errores.precio = "El precio debe ser mayor que 0";
  }

  if (!producto.descripcion.trim()) {
    errores.descripcion = "La descripción es obligatoria";
  }

  if (!producto.categoria.trim()) {
    errores.categoria = "La categoría es obligatoria";
  }

  if (producto.stock === "" || Number(producto.stock) < 0) {
    errores.stock = "El stock no puede quedar vacío ni ser negativo";
  }

  if (!producto.imagen) {
    errores.imagen = "Tenés que seleccionar una imagen";
  }

  return errores;
};
