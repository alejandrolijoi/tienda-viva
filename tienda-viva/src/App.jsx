import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ItemListContainer saludo="Bienvenido a Nuestra Tienda" />} />
          <Route path="/productos" element={<ItemListContainer saludo="Nuestros productos" />} />
          <Route path="/categoria/:categoryId" element={<ItemListContainer saludo="Categoría" />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;