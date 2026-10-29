import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

// Todas las funciones usan esta colección.
// La creamos una sola vez acá y no en cada función.
const productosRef = collection(db, "productos");

/* -------------------------------------------------------------------------- */
/*                               TRAER PRODUCTOS                              */
/* -------------------------------------------------------------------------- */
export const getProducts = async () => {
  try {
    // getDocs no devuelve los productos directamente, sino un "snapshot"
    // con todos los documentos de la colección a ese momento.
    const snapshot = await getDocs(productosRef);

    const productos = snapshot.docs.map((documento) => {
      return { id: documento.id, ...documento.data() };
    });

    return productos;
  } catch (error) {
    console.error("Error al traer productos", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                          FILTRAR POR CATEGORÍA                             */
/* -------------------------------------------------------------------------- */
export const getByCategory = async (categoria) => {
  try {
    const consulta = categoria
      ? query(productosRef, where("categoria", "==", categoria))
      : productosRef;

    const snapshot = await getDocs(consulta);

    const productos = snapshot.docs.map((documento) => {
      return { id: documento.id, ...documento.data() };
    });

    return productos;
  } catch (error) {
    console.error("Error al filtrar productos", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                            TRAER PRODUCTO POR ID                           */
/* -------------------------------------------------------------------------- */
export const getProductById = async (id) => {
  try {
    // Referencia al documento puntual
    const productoRef = doc(productosRef, id);

    const snapshot = await getDoc(productoRef);

    if (!snapshot.exists()) {
      throw new Error("Producto no encontrado");
    }

    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error("Error al traer el producto", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                              ALTA DE PRODUCTO                              */
/* -------------------------------------------------------------------------- */
export const createProduct = async (producto) => {
  try {
    const documento = await addDoc(productosRef, producto);

    return documento.id; // el id que genera firestore
  } catch (error) {
    console.error("Error al crear el producto", error);
    throw error;
  }
};
