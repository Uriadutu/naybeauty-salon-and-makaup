import { FiMenu, FiUser } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const Navbar = ({ setIsOpen }) => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("layanan")) return "Layanan";
    if (location.pathname.includes("menu")) return "Menu";
    if (location.pathname.includes("paket")) return "Paket";
    if (location.pathname.includes("galeri")) return "Galeri";
    return "Dashboard";
  };

  return (
    <header className="h-16 bg-[#FFF9EB] border-b flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu />
        </button>

        <h2 className="font-semibold text-gray-800 text-lg">
          {getTitle()}
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-800">
            Admin
          </p>
          <p className="text-xs text-gray-500">
            admin@naybeauty.com
          </p>
        </div>

        <div className="w-10 h-10 bg-[#FFE8DA] rounded-full flex items-center justify-center">
          <FiUser />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
