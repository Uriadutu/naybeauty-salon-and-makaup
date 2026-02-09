import {
  FiHome,
  FiGrid,
  FiList,
  FiBox,
  FiImage,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-[#FFF9EB] shadow-lg transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b">
          <h1 className="font-bold text-lg text-gray-900">
            Nay<span className="text-gray-500">Admin</span>
          </h1>
          <button
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          <MenuItem icon={<FiHome />} label="Dashboard" />
          <MenuItem icon={<FiGrid />} label="Layanan" />
          <MenuItem icon={<FiList />} label="Menu" />
          <MenuItem icon={<FiBox />} label="Paket" />
          <MenuItem icon={<FiImage />} label="Galeri" />

          <hr className="my-4" />

          <MenuItem
            icon={<FiLogOut />}
            label="Logout"
            danger
          />
        </nav>
      </aside>
    </>
  );
};

const MenuItem = ({ icon, label, danger }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition
      ${
        danger
          ? "text-red-600 hover:bg-red-100"
          : "text-gray-700 hover:bg-[#FFE8DA]"
      }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

export default Sidebar;
