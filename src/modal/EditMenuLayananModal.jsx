import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../auth/Firebase";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const EditMenuLayananModal = ({ isOpen, onClose, onSuccess, data }) => {
  const [namaMenu, setNamaMenu] = useState(data.nama_menu);
  const [harga, setHarga] = useState(data.harga_menu);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  if (!isOpen) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await updateDoc(doc(db, "menu_layanan", data.id), {
        nama_menu: namaMenu,
        harga_menu: Number(harga),
      });

      onSuccess?.(id);
      onClose();
    } catch (error) {
      console.error("Gagal update:", error);
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
        <h2 className="text-lg font-semibold mb-4">Edit Menu Layanan</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nama Menu</label>
            <input
              value={namaMenu}
              onChange={(e) => setNamaMenu(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg border"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Harga</label>
            <input
              type="number"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg border"
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
              className="px-4 py-2 bg-gray-900 text-white rounded-lg"
            >
              {loading ? "Menyimpan..." : "Update"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditMenuLayananModal;
