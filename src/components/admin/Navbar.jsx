import { FiMenu, FiUser } from "react-icons/fi";

const Navbar = ({ setIsOpen }) => {

  return (
    <header className="h-16 bg-white sm:pl-[303px] border-b border-[#E8DFD7] flex items-center justify-between p-6 sticky top-0 z-20">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu />
        </button>

        <h2 className="font-semibold text-gray-800 text-xl font-crimson">
          Admin Panel
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#CB9B00] rounded-full flex items-center justify-center">
          <FiUser className="" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
