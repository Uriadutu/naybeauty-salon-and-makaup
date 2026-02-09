import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Firebase config (gantilah dengan konfigurasi proyek Firebase Anda)
const firebaseConfig = {
  apiKey: "AIzaSyC61zPpzCNREL_ZI4Pw6TO3x9MKgJtUTbw",
  authDomain: "naybeautysalon-d61ea.firebaseapp.com",
  projectId: "naybeautysalon-d61ea",
  storageBucket: "naybeautysalon-d61ea.firebasestorage.app",
  messagingSenderId: "994962508559",
  appId: "1:994962508559:web:f3f2221bd1335b0cb04c7a",
  measurementId: "G-MLMCC6YSBR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);

export { auth, storage };
