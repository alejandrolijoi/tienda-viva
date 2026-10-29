// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// En un proyecto educativo dejamos la config directamente en el código.
// En un proyecto real iría en variables de entorno con un archivo .env.
const firebaseConfig = {
  apiKey: "PEGAR_ACÁ",
  authDomain: "PEGAR_ACÁ",
  projectId: "PEGAR_ACÁ",
  storageBucket: "PEGAR_ACÁ",
  messagingSenderId: "PEGAR_ACÁ",
  appId: "PEGAR_ACÁ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//para el login
const auth = getAuth(app);

export { db, auth };
