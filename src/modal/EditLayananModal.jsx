import React, { useEffect, useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../auth/Firebase";
import { motion } from "framer-motion";

const EditLayananModal = ({ isOpen, onClose, data, onSuccess }) => {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setNama(data.nama || "");
      setDeskripsi(data.deskripsi || "");
    }
  }, [data]);

  if (!isOpen || !data) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const layananRef = doc(db, "layanan", data.id);

      await updateDoc(layananRef, {
        nama,
        deskripsi,
        updatedAt: serverTimestamp(),
      });

      onClose();
    } catch (error) {
      console.error("Gagal update layanan:", error);
      alert("Gagal menyimpan perubahan");
    } finally {
      setLoading(false);
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.25 }}
        className="bg-[#FFF9EB] w-full max-w-md rounded-xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Edit Layanan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nama Layanan
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-[#FFE8DA]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
              rows="3"
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-[#FFE8DA]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditLayananModal;
