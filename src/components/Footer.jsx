import { Instagram, Facebook, MessageCircle } from "lucide-react";

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

export default function Footer() {
  return (
    <footer className="bg-[#332407]  text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl mb-4 font-crimson">
              <span className="">Nay Beauty</span>
            </h2>

            <p className="text-sm leading-relaxed mb-6 font-body">
              Nikmati pengalaman perawatan kecantikan premium dengan layanan
              personal dan berkualitas. Transformasi diri Anda dimulai di
              NayBeauty
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center border border-primary-foreground/30 hover:bg-primary-foreground hover:text-foreground transition-colors"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center border border-primary-foreground/30 hover:bg-primary-foreground hover:text-foreground transition-colors"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                aria-label="WhatsApp"
                className="w-10 h-10 flex items-center justify-center border border-primary-foreground/30 hover:bg-primary-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle size={18} />
              </a>
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
                  <a
                    href={link.href}
                    className="text-sm hover: transition-colors font-body"
                  >
                    {link.name}
                  </a>
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
                  <span className="text-sm font-body">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm tracking-widest uppercase mb-6 font-chenla">Kontak</h3>
            <ul className="space-y-3 text-sm font-body">
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
            <p className="/50 text-sm font-body">
              © 2024 Nay Beauty Salon. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="/50 text-sm hover: transition-colors font-body"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="/50 text-sm hover: transition-colors font-body"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
