import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";

const HeaderDetail = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("layanan")) return "Layanan";
    if (location.pathname.includes("menu")) return "Menu";
    if (location.pathname.includes("paket")) return "Paket";
    if (location.pathname.includes("galeri")) return "Galeri";
    return "Dashboard";
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="px-4 sm:px-8 mx-auto py-3 grid grid-cols-3 items-center">
        <Link to={-1} className="text-2xl font-crimson text-left">
          <span className="text-[black] flex items-center gap-1"> <MdArrowBack /><p className="text-[black] hidden sm:block">Kembali</p> </span>
        </Link>
        {/* Logo */}
        <Link to="/" className="text-2xl font-crimson text-center">
          <span className="text-[black]">Semua {getTitle()} </span>
        </Link>
        <div className="p-1 text-right"></div>
      </div>
    </header>
  );
};

export default HeaderDetail;
