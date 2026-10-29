// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// En un proyecto educativo dejamos la config directamente en el código.
// En un proyecto real iría en variables de entorno con un archivo .env.
const firebaseConfig = {
  apiKey: "AIzaSyCQMHk_Nco-Zb2y2LFs4TZB23eyhUrSyXQ",
  authDomain: "tienda-viva-4f2c8.firebaseapp.com",
  projectId: "tienda-viva-4f2c8",
  storageBucket: "tienda-viva-4f2c8.firebasestorage.app",
  messagingSenderId: "993820023216",
  appId: "1:993820023216:web:7ddb81810315dc2c75de75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// La base se creó con el nombre "default", así que la pedimos explícitamente.
const db = getFirestore(app, "default");

//para el login
const auth = getAuth(app);

export { db, auth };
