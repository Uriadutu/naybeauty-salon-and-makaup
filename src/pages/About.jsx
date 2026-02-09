import { useEffect, useRef, useState } from "react";

import ney from "../img/ney.jpeg";

// GANTI PATH SESUAI PUNYA KAMU
const images = Array.from({ length: 15 }, (_, i) =>
  require(`../img/s/s (${i + 1}).jpg`),
);

// DUPLIKASI untuk loop
const certificates = [...images, ...images];

const About = () => {
  const scrollRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const getCardWidth = () =>
      container.firstChild?.offsetWidth +
        parseInt(getComputedStyle(container).gap || 16) || 260;

    let autoScroll;

    const startAutoScroll = () => {
      autoScroll = setInterval(() => {
        const cardWidth = getCardWidth();

        // ambil index BERDASARKAN posisi scroll saat ini
        let currentIndex = Math.round(container.scrollLeft / cardWidth);

        const nextIndex = currentIndex + 1;

        container.scrollTo({
          left: nextIndex * cardWidth,
          behavior: "smooth",
        });

        // 🔁 kalau sudah masuk set duplikat → reset posisi TANPA loncat
        if (nextIndex >= certificates.length / 2) {
          setTimeout(() => {
            container.scrollLeft =
              (nextIndex - certificates.length / 2) * cardWidth;
          }, 500);
        }
      }, 1500);
    };

    startAutoScroll();

    // ⏸️ pause & sync saat user scroll manual
    let scrollTimeout;
    const handleManualScroll = () => {
      clearInterval(autoScroll);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        startAutoScroll();
      }, 2000); // lanjut auto setelah user diam
    };

    container.addEventListener("scroll", handleManualScroll);

    return () => {
      clearInterval(autoScroll);
      container.removeEventListener("scroll", handleManualScroll);
    };
  }, []);

  return (
    <section id="about">
      <div className="bg-[#FFF9EB] py-16 px-4 sm:px-8">
        <div>
          <h1 className="judul">Tentang Kami</h1>
          <h1 className="subjudul">Dedikasi Untuk</h1>
          <h1 className="subjudul2">Kecantikan Anda</h1>

          {/* ABOUT */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center mt-10">
            <div className="flex justify-center">
              <img src={ney} className="w-56 rounded-lg" alt="Owner" />
            </div>
            <div className="col-span-2 text-gray-700 leading-relaxed">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum is simply dummy text of the printing and
                typesetting industry Lorem Ipsum is simply dummy text of the
                printing and typesetting industry Lorem Ipsum is simply dummy
                text of the printing and typesetting industry Lorem Ipsum is
                simply dummy text of the printing and typesetting industry Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum is simply dummy text of the printing and
                typesetting industry
              </p>
            </div>
          </div>

          {/* SERTIFIKAT */}
          <h1 className="judul mt-20">Sertifikat</h1>

          <div
            ref={scrollRef}
            className="mt-8 flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
          >
            {certificates.map((img, index) => (
              <div
                key={index}
                className="min-w-[75%] sm:min-w-[260px]
                snap-center
                bg-white p-2 rounded-xl shadow-md"
              >
                <img
                  src={img}
                  alt={`Sertifikat ${index + 1}`}
                  className="w-full h-40 sm:h-48 object-cover rounded-sm cursor-pointer"
                  onClick={() => setPreviewImg(img)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {previewImg && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setPreviewImg(null)}
        >
          <img
            src={previewImg}
            alt="Preview Sertifikat"
            className="
        max-w-full max-h-[90vh]
        rounded-lg shadow-2xl
        animate-fadeIn
      "
          />
        </div>
      )}
    </section>
  );
};

export default About;
