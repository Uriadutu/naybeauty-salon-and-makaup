import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../auth/Firebase";
import { motion } from "framer-motion";

const AddLayananModal = ({ isOpen, onClose, onSuccess }) => {
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "layanan"), {
        nama,
        createdAt: serverTimestamp(),
      });

      setNama("");
      onSuccess && onSuccess();
      onClose();
    } catch (error) {
      console.error("❌ Firestore error:", error);
      alert(error.message || "Gagal menyimpan data");
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
        className="bg-[white] w-full max-w-md rounded-xl shadow-xl p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Tambah Layanan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nama Layanan
            </label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2.5 rounded-lg border"
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

export default AddLayananModal;