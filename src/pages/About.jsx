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
  const [previewIndex, setPreviewIndex] = useState(null);
  const totalImages = images.length;

  const stats = [
    {
      id: 1,
      // icon: <FaSmile size={28} />,
      number: "1.200+",
      label: "Customer Senang",
    },
    {
      id: 2,
      // icon: <FaStar size={28} />,
      number: "5.0",
      label: "Rating Pelanggan",
    },
    {
      id: 3,
      // icon: <FaScissors size={28} />,
      number: "20+",
      label: "Menu Tersedia",
    },
    {
      id: 4,
      // icon: <FaAward size={28} />,
      number: "5+",
      label: "Tahun Pengalaman",
    },
  ];

  const handleNext = (e) => {
    e.stopPropagation();
    setPreviewIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setPreviewIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mt-16">
            {/* Foto & Nama */}
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <img
                  src={ney}
                  alt="Owner"
                  className="w-64 rounded-2xl shadow-xl object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5"></div>
              </div>

              <p className="mt-6 text-xl font-semibold text-[#3B2F2F] tracking-wide">
                Nayla Putri Natannia, A.Md.Bns.
              </p>
              <div className="w-12 h-1 bg-[#3B2F2F] mt-3 rounded-full"></div>
            </div>

            {/* Deskripsi */}
            <div className="md:col-span-2 text-gray-700">
              <p className="text-justify leading-relaxed text-base md:text-lg font-cormorant">
                Perkenalkan, nama saya Nayla Putrie Natannia, A.Md.Bns. Sejak
                kecil saya memiliki kecintaan yang mendalam pada dunia seni,
                khususnya melukis artistik. Kecintaan itu kemudian saya tuangkan
                dan kembangkan dalam seni merias wajah, face painting hingga
                body painting.
                Bagi saya kecantikan bukan sekadar tampilan luar, tetapi
                tentang bagaimana seni mampu mengekspresikan karakter, rasa, dan
                kepercayaan diri seseorang. Sejak tahun 2018, di usia 14 tahun,
                saya mulai menekuni dan mengembangkan passion saya di dunia
                kecantikan secara serius.
                Perjalanan tersebut saya lanjutkan dari bangku SMK dengan
                jurusan Tata Kecantikan Kulit dan Rambut, kemudian melanjutkan
                studi Tata Rias hingga lulus pada tahun 2024 dengan predikat
                cumlaude.
                <br />
                <br />
                Sebagai seorang therapist dan stylist, saya meyakini bahwa
                belajar tidak akan pernah berhenti. Dunia kecantikan terus
                berkembang dengan tren yang semakin smart dan modern, sehingga
                saya terus berkomitmen untuk meng-upgrade kemampuan, memperdalam
                teknik, dan mengikuti perkembangan terbaru demi memberikan hasil
                terbaik.
                Bagi saya setiap sentuhan riasan bukan hanya tentang teknik,
                tetapi tentang dedikasi. Setiap karya saya dikerjakan dengan
                sepenuh cinta, ketelitian, dan tanggung jawab profesional.
                Sertifikasi usaha yang saya miliki merupakan bentuk komitmen
                dalam menjaga konsistensi kualitas layanan serta meningkatkan
                kepercayaan pelanggan.
                <br />
                <br />
                Saya percaya bahwa setiap perempuan berhak tampil cantik,
                menarik, dan penuh percaya diri — dan menjadi bagian dari
                perjalanan tersebut adalah sebuah kehormatan bagi saya.
              </p>
            </div>
          </div>
          <div className="grid mt-10 grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg duration-300 text-center border border-gray-100"
              >
                <div className="flex justify-center mb-4 text-[#3B2F2F]">
                  {item.icon}
                </div>

                <h1 className="text-3xl font-bold text-[#3B2F2F]">
                  {item.number}
                </h1>

                <p className="text-gray-500 mt-2 text-sm">{item.label}</p>
              </div>
            ))}
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
                  // onClick={() => setPreviewImg(img)}
                  onClick={() => setPreviewIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {previewIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setPreviewIndex(null)}
        >
          {/* PREV */}
          <button
            onClick={handlePrev}
            className="
        absolute left-4 sm:left-8
        text-white text-4xl
        hover:scale-110 transition
        select-none
      "
          >
            ‹
          </button>

          {/* IMAGE */}
          <img
            src={images[previewIndex]}
            alt="Preview Sertifikat"
            className="
        max-w-full max-h-[90vh]
        rounded-lg shadow-2xl
        animate-fadeIn
      "
          />

          {/* NEXT */}
          <button
            onClick={handleNext}
            className="
        absolute right-4 sm:right-8
        text-white text-4xl
        hover:scale-110 transition
        select-none
      "
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default About;
