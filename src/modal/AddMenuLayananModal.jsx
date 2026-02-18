import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../auth/Firebase";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const AddMenuLayananModal = ({ isOpen, onClose, onSuccess }) => {
  const { id } = useParams();

  const [namaMenu, setNamaMenu] = useState("");
  const [harga, setHarga] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaMenu || !harga) return;

    const hargaNumber = Number(harga);
    if (isNaN(hargaNumber)) {
      alert("Harga harus angka");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "menu_layanan"), {
        id_layanan: id,          // 🔗 RELASI
        nama_menu: namaMenu,
        harga_menu: hargaNumber,
        createdAt: serverTimestamp(),
      });

      setNamaMenu("");
      setHarga("");

      onSuccess?.(id);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-md rounded-xl shadow-xl p-6"
      >
        <h2 className="text-lg font-semibold mb-4">
          Tambah Menu Layanan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Nama Menu
            </label>
            <input
              value={namaMenu}
              onChange={(e) => setNamaMenu(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg border"
              placeholder="Contoh: Facial Basic"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Harga
            </label>
            <input
              type="number"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg border"
              placeholder="50000"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddMenuLayananModal;
