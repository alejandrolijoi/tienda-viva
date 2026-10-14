import "./Header.css";


export const Header = () => {
  return (
    <header>
      <h1>Tienda Viva</h1>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/productos">Productos</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};