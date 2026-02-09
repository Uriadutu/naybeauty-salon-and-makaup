import { Instagram} from "lucide-react";
import { BsTiktok, BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Beranda", href: "#beranda" },
  { name: "Tentang Kami", href: "#tentang" },
  { name: "Layanan", href: "#layanan" },
  { name: "Harga", href: "#harga" },
  { name: "Galeri", href: "#galeri" },
  { name: "Kontak", href: "#kontak" },
];

const services = [
  "Hair Styling",
  "Facial Treatment",
  "Makeup Artist",
  "Nail Art",
  "Spa & Massage",
  "Lash & Brow",
];

const Footer = () => {
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
                to={"https://www.instagram.com/naybeautymakeup_/"}
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center border transition-colors"
              >
                <Instagram size={18} />
              </Link>

              <Link
                to={"#"}
                aria-label="Tiktok"
                className="w-10 h-10 flex items-center justify-center border transition-colors"
              >
                <BsTiktok size={18} />
              </Link>

              <Link
                to={"#"}
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
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-6 font-chenla">Layanan</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-6 font-chenla">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li>Jl. Purwodadi - Bagelen, Dusun II, Purwodadi, Kec. Purwodadi, Kabupaten Purworejo</li>
              <li>Jawa Tengah, 54173</li>
              <li>081234567890</li>
              <li>naycantik@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-500">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              © 2024 Nay Beauty Salon. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                to={"#"}
                className="text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to={"#"}
                className="text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


export default Footer;