import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, cargando } = useAuth();

  // esperamos a saber si hay sesión antes de redirigir
  if (cargando) return <p className="cargando">Cargando...</p>;

  if (!user) return <Navigate to="/login" />;

  return children;
};
