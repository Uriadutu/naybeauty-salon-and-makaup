import { motion } from "framer-motion";
import { IoMdCheckmark } from "react-icons/io";

const DetailPaketModal = ({ isOpen, onClose, paket, menuLayanan }) => {
  if (!isOpen || !paket) return null;

  const allMenus = [
    ...new Map(
      paket.services
        ?.flatMap((srv) =>
          menuLayanan.filter((menu) =>
            srv.selectedMenuItems?.includes(menu.id),
          ),
        )
        .map((menu) => [menu.id, menu]),
    ).values(),
  ];

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
            {paket.name}
          </h2>
          <div className="w-10 h-1 bg-black/80 rounded-full mt-2"></div>
        </div>

        {/* Deskripsi */}
        <p className="text-sm text-gray-600 mb-4">{paket.description}</p>

        {/* Harga */}
        <div className="mb-4">
          <p className="line-through text-gray-400 text-sm">
            Rp {paket.basePrice?.toLocaleString("id-ID")}
          </p>
          <p className="text-2xl font-bold">
            Rp {paket.finalPrice?.toLocaleString("id-ID")}
          </p>
        </div>

        {/* Menu List */}
        <div className="h-44 overflow-y-auto pr-2">
          <ul className="text-sm text-gray-600 space-y-2">
            {allMenus.map((menu) => (
              <li key={menu.id} className="flex gap-2 items-center">
                <IoMdCheckmark className="text-[#332407]" />
                {menu.nama_menu}
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="flex justify-end pt-6">
          <button
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

export default DetailPaketModal;