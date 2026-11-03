import { Link } from "react-router-dom";

export const ListaProductos = ({ productos, error, onEliminar }) => {
  return (
    <section className="lista-productos">
      <header className="lista-header">
        <h2>Productos</h2>

        <Link to="/admin/producto/nuevo" className="btn bg-primary">
          Cargar producto
        </Link>
      </header>

      {error && <p className="error">{error}</p>}

      {productos.length === 0 ? (
        <p className="secondary">Todavía no hay productos cargados.</p>
      ) : (
        <div className="tabla-productos">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>${Number(producto.precio).toLocaleString("es-AR")}</td>
                  <td>{producto.stock ?? "-"}</td>
                  <td className="acciones">
                    <Link
                      to={`/admin/producto/${producto.id}/editar`}
                      className="btn bg-primary"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn bg-delete"
                      onClick={() => onEliminar(producto)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
