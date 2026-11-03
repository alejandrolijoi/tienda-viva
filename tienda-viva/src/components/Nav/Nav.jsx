import { Link } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/categoria/audio">Audio</Link></li>
        <li><Link to="/categoria/perifericos">Periféricos</Link></li>
        <li><Link to="/categoria/computacion">Computación</Link></li>
        <li><Link to="/categoria/disco">Discos</Link></li>
      </ul>
    </nav>
  );
};