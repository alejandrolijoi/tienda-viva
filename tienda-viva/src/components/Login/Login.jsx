import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [datosForm, setDatosForm] = useState({
    email: "",
    password: "",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosForm((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      await login(datosForm.email, datosForm.password);
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Email o contraseña incorrectos");
    }
  };

  // si ya hay sesión, no tiene sentido pedir el login de nuevo
  if (user) return <Navigate to="/admin" replace />;

  return (
    <form className="login" onSubmit={manejarEnvio}>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={datosForm.email}
        onChange={manejarCambio}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={datosForm.password}
        onChange={manejarCambio}
        required
      />

      <button type="submit" className="btn bg-primary">
        Ingresar
      </button>
    </form>
  );
};
