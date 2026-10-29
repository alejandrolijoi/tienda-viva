import { Navigate, Route, Routes } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/CartView/CartView";
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { FormularioProductoContainer } from "./components/FormularioProducto/FormularioProductoContainer";
import { ExitoProducto } from "./components/ExitoProducto/ExitoProducto";

function App() {
  return (
    <Routes>
      {/* ---------------------- RUTAS PÚBLICAS ---------------------- */}
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={<ItemListContainer saludo="Bienvenido a Nuestra Tienda" />}
        />
        <Route
          path="/productos"
          element={<ItemListContainer saludo="Nuestros productos" />}
        />
        <Route
          path="/categoria/:categoryId"
          element={<ItemListContainer saludo="Categoría" />}
        />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<CartView />} />
      </Route>

      {/* el login va afuera del layout de admin para poder entrar sin sesión */}
      <Route path="/login" element={<Login />} />

      {/* -------------------------- ADMIN --------------------------- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="producto/nuevo" element={<FormularioProductoContainer />} />
        <Route path="exito/:id" element={<ExitoProducto />} />
      </Route>
    </Routes>
  );
}

export default App;
