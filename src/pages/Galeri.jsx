import galeri1 from "../img/galeri1.jpeg"
import galeri2 from "../img/galeri2.jpeg"
import galeri3 from "../img/galeri3.jpeg"
import galeri4 from "../img/galeri4.png"
import galeri5 from "../img/galeri5.png"
import galeri6 from "../img/galeri6.png"

const images = [
  {
    src: galeri1,
    title: "Hair Styling",
  },
  {
    src: galeri2,
    title: "Makeup Artist",
  },
  {
    src: galeri3,
    title: "Facial Treatment",
  },
  {
    src: galeri4,
    title: "Nail Art",
  },
  {
    src: galeri5,
    title: "Spa & Relax",
  },
  {
    src: galeri6,
    title: "Lash & Brow",
  },
];

const Galeri = () => {
  return (
    <section id="galeri" className="bg-[#FFE8DA]">
      <div className="py-16 px-4 sm:px-8 mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="judul">Galeri</h1>
          <h1 className="subjudul">Hasil Karya</h1>
          <h1 className="subjudul2">Salon Kami</h1>
          <p className="text-black/70 max-w-2xl mx-auto mt-4">
            Lihatlah transformasi menakjubkan yang telah diciptakan untuk
            klien-klien kami.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition duration-500"
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-[300px] object-cover transform group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold tracking-wide">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Galeri;
