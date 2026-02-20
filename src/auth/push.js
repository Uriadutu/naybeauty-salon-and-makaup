import fs from "fs";
import csv from "csv-parser";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// 🔥 CONFIG KAMU
const firebaseConfig = {
  apiKey: "AIzaSyAv2z60YzF9Epxd7kpo5TGzShjvQi2XgyU",
  authDomain: "neybeauty-f1f24.firebaseapp.com",
  projectId: "neybeauty-f1f24",
  storageBucket: "neybeauty-f1f24.firebasestorage.app",
  messagingSenderId: "74850089867",
  appId: "1:74850089867:web:af81defcf9cd923c15cd8e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  console.log("Mengambil layanan...");

  const layananSnap = await getDocs(collection(db, "layanan"));

  const layananMap = {};
  layananSnap.forEach((doc) => {
    const data = doc.data();
    layananMap[data.nama.trim().toLowerCase()] = doc.id;
  });

  console.log("Layanan ditemukan:", Object.keys(layananMap).length);

  const rows = [];

  fs.createReadStream("menu.csv")
    .pipe(csv())
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      let success = 0;

      for (const row of rows) {
        const namaLayanan = row.layanan?.trim().toLowerCase();
        const namaMenu = row.menu?.trim();
        const harga = Number(row.harga);

        if (!namaLayanan || !namaMenu || isNaN(harga)) continue;

        const layananId = layananMap[namaLayanan];
        if (!layananId) {
          console.log("Layanan tidak ditemukan:", row.layanan);
          continue;
        }

        await addDoc(collection(db, "menu_layanan"), {
          id_layanan: layananId,
          nama_menu: namaMenu,
          harga_menu: harga,
          createdAt: serverTimestamp(),
        });

        success++;
      }

      console.log("Import selesai 🚀");
      console.log("Total berhasil:", success);
      process.exit();
    });
}

run();
