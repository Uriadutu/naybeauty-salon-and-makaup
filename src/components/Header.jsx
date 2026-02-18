import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 FUNGSI SCROLL (INTI SOLUSI)
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsOpen(false); // tutup menu mobile
  };

  const menus = [
    ["Beranda", "home"],
    ["Tentang Kami", "about"],
    ["Layanan & Menu", "services"],
    ["Paket", "menu-paket"],
    ["Galeri", "galeri"],
    ["Kontak", "contact"],
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300
        ${
          isScrolled
            ? "bg-[#FFF9EB] backdrop-blur-md shadow-lg"
            : "sm:bg-transparent bg-[#FFF9EB]"
        }
      `}
    >
      <div className="container mx-auto px-3 sm:px-7 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-crimson">
          <span className="text-black">Nay </span>
          <span className="text-[#FFA095]">Beauty</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {menus.map(([label, id]) => (
              <li key={id}>
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(id);
                  }}
                  className={`font-medium transition-colors duration-300
                    ${
                      isScrolled
                        ? "text-gray-700 hover:text-[#FFA095]"
                        : "text-white hover:text-[#FFA095]"
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Button */}
        <button className="hidden md:block bg-[#332407] py-1 px-6 text-white rounded-sm hover:opacity-90 transition">
          Reservasi
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#FFF9EB] shadow-md
        transition-all duration-300 origin-top
        ${
          isOpen
            ? "scale-y-100 opacity-100 translate-y-0"
            : "scale-y-0 opacity-0 -translate-y-2 pointer-events-none"
        }
      `}
      >
        <ul className="flex flex-col space-y-4 px-6 py-6">
          {menus.map(([label, id]) => (
            <li key={id}>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(id);
                }}
                className="block font-medium text-gray-700 hover:text-[#FFA095] transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}

          <button className="py-2 rounded-sm bg-[#332407] text-white hover:opacity-90 transition">
            Reservasi
          </button>
        </ul>
      </div>
    </header>
  );
};

export default Header;
