import { Item } from "../Item/Item";
import "./ItemList.css";

export const ItemList = ({ productos }) => {
  if (productos.length === 0) {
    return <p className="vacio">No hay productos en esta categoría.</p>;
  }

  return (
    <div className="item-list">
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  );
};