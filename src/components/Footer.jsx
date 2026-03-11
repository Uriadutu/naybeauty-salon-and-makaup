import { Instagram } from "lucide-react";
import { BsTiktok, BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../auth/Firebase"; // sesuaikan path firebase kamu

const Footer = () => {
  const [layananData, setLayananData] = useState([]);

  const fetchLayanan = async () => {
    try {
      const q = query(collection(db, "layanan"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLayananData(data);
    } catch (error) {
      console.error("Gagal fetch layanan:", error);
    }
  };

  useEffect(() => {
    fetchLayanan();
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
    <footer className="bg-[#332407]  text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl mb-4 font-crimson">
              <span className="">Nay Beauty</span>
            </h2>

            <p className="text-sm leading-relaxed mb-6">
              Nikmati pengalaman perawatan kecantikan premium dengan layanan
              personal dan berkualitas. Transformasi diri Anda dimulai di
              NayBeauty
            </p>

            <div className="flex items-center gap-3">
              <Link
                target="_blank"
                to={"https://www.instagram.com/naybeautymakeup_/"}
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center border transition-colors"
                >
                <Instagram size={18} />
              </Link>

              <Link
                to={"https://www.tiktok.com/@naybeautysalon_purworejo"}
                target="_blank"
                aria-label="Tiktok"
                className="w-10 h-10 flex items-center justify-center border transition-colors"
                >
                <BsTiktok size={18} />
              </Link>

              <Link
                to={"https://wa.me/6285640577538"}
                target="_blank"
                aria-label="WhatsApp"
                className="w-10 h-10 flex items-center justify-center border transition-colors"
              >
                <BsWhatsapp size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-6 font-chenla">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {menus.map(([label, id]) => (
                <li key={id}>
                  <Link
                    to="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo(id);
                    }}
                    className="block font-medium text-white hover:text-[#FFA095] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-6 font-chenla">
              Layanan
            </h3>
            <ul className="space-y-3">
              {layananData.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <span className="text-sm">{service.nama}</span>
                </li>
              ))}
              <li>......</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-6 font-chenla">
              Kontak
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                Jl. Purwodadi - Bagelen, Dusun II, Purwodadi, Kec. Purwodadi,
                Kabupaten Purworejo
              </li>
              <li>Jawa Tengah, 54173</li>
              <li>+62 856-4057-7538</li>
              <li>naybeautymakeup18@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-500">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2024 Nay Beauty Salon & Makaup.</p>

            {/* <div className="flex items-center gap-6">
              <Link to={"#"} className="text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to={"#"} className="text-sm transition-colors">
                Terms of Service
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
