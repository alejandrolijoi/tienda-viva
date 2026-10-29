export const FormularioProducto = ({
  producto,
  errores,
  cargando,
  onCambio,
  onArchivo,
  onEnvio,
}) => {
  return (
    <section className="formulario-producto">
      <h2>Agregar nuevo producto</h2>

      <form onSubmit={onEnvio}>
        <div className="campo">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={onCambio}
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
        </div>

        <div className="campo">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={onCambio}
            min="0"
          />
          {errores.precio && <p className="error">{errores.precio}</p>}
        </div>

        <div className="campo">
          <label>Categoría</label>
          <input
            type="text"
            name="categoria"
            value={producto.categoria}
            onChange={onCambio}
          />
          {errores.categoria && <p className="error">{errores.categoria}</p>}
        </div>

        <div className="campo">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={onCambio}
          />
          {errores.descripcion && (
            <p className="error">{errores.descripcion}</p>
          )}
        </div>

        <div className="campo">
          <label>Imagen</label>
          <input type="file" accept="image/*" onChange={onArchivo} />
          {errores.imagen && <p className="error">{errores.imagen}</p>}
        </div>

        {errores.general && <p className="error">{errores.general}</p>}

        <button type="submit" className="btn bg-primary" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar producto"}
        </button>
      </form>
    </section>
  );
};
