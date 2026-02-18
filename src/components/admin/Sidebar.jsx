import {
  FiHome,
  FiGrid,
  FiList,
  FiBox,
  FiImage,
  FiLogOut,
} from "react-icons/fi";
import { PiFlowerLotus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

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
        className={`fixed top-0 left-0 z-40 w-64 bg-[#332407] shadow-lg
  transform transition-transform duration-300 h-full
  ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center justify-between px-6 h-[75px] border-b border-[#413826]">
            <div className="flex items-center gap-3">
              <h1 className="bg-[#CB9B00] p-1 text-[#332407] rounded">
                <PiFlowerLotus size={23} />
              </h1>
              <h1 className="font-bold  text-lg text-white font-crimson">NayBeauty</h1>
            </div>
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {/* Menu */}
          <div className="flex items-start h-full w-full">
            <nav className="p-4 space-y-2 w-full ">
              <MenuItem icon={<FiHome />} label="Dashboard" to="/dashboard" />
              <MenuItem icon={<FiGrid />} label="Layanan" to="/layanan" />
              <MenuItem icon={<FiList />} label="Menu" to="/menu" />
              <MenuItem icon={<FiBox />} label="Paket" to="/paket" />
              <MenuItem icon={<FiImage />} label="Galeri" to="/galeri" />

              {/* <hr className="my-4" /> */}
            </nav>
          </div>
          <div className="w-full border-t border-[#413826] px-4 py-5">
            <MenuItem icon={<FiLogOut />} label="Logout" danger />
          </div>
        </div>
      </aside>
    </>
  );
};

const MenuItem = ({ icon, label, danger, to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition font-cormorant
      ${
        danger
          ? "text-gray-700 hover:bg-[#413826]"
          : "text-gray-700 hover:bg-[#413826]"
      }`}
    >
      <span className="text-xl text-[#CB9B00]">{icon}</span>
      <span className="font-medium text-white">{label}</span>
    </button>
  );
};

export default Sidebar;
