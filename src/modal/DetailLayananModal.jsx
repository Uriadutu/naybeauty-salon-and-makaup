import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../auth/Firebase";
import { motion } from "framer-motion";

const DetailLayananModal = ({ isOpen, onClose, dataDetail }) => {
  //   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.3 }}
        className="bg-[#FFF9EB] w-full max-w-md rounded-xl shadow-xl p-6"
      >
        <div className="">
          <p className="text-sm  text-gray-700 subjudul font-bold uppercase">
            {dataDetail?.nama}
          </p>
        </div>
        <div className="h-40 overflow-y-auto scrollbar-hide">
          <p className="text-sm font-medium text-gray-700">
            Deskripsi: {dataDetail?.deskripsi}
          </p>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailLayananModal;
