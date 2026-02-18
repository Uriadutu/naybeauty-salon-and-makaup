import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAv2z60YzF9Epxd7kpo5TGzShjvQi2XgyU",
  authDomain: "neybeauty-f1f24.firebaseapp.com",
  projectId: "neybeauty-f1f24",
  storageBucket: "neybeauty-f1f24.firebasestorage.app",
  messagingSenderId: "74850089867",
  appId: "1:74850089867:web:af81defcf9cd923c15cd8e",
  measurementId: "G-CNVPMHY7VX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);

export { auth, storage };
