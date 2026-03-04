import { motion } from "framer-motion";

const DetailLayananModal = ({ isOpen, onClose, dataDetail }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 border border-gray-100"
      >
        {/* Title */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
            {dataDetail?.nama}
          </h2>
          <div className="w-10 h-1 bg-black/80 rounded-full mt-2"></div>
        </div>

        {/* Menu List */}
        <div className="h-44 overflow-y-auto pr-2">
          <ul className="text-sm text-gray-600 space-y-3">
            {dataDetail.menus.map((menu) => (
              <li
                key={menu.id}
                className="flex justify-between items-center border-b border-gray-100 pb-2"
              >
                <span>{menu.nama_menu}</span>
                <span className="font-medium text-gray-800">
                  RP. {menu.harga_menu.toLocaleString("id-ID")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all duration-200"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailLayananModal;