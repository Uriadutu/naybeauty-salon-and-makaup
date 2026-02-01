import { PiFlowerLotus } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
const Services = () => {
  return (
    <section id="services">
      <div className="py-16 px-4 sm:px-8 bg-[#FFE8DA] sm:h-[100vh]">
        <div className="">
          <h1 className="judul">Layanan</h1>
          <h1 className="subjudul">Layanan Terbaik</h1>
          <h1 className="subjudul2">Untuk Anda</h1>
          <h1 className="text-center text-black">
            Kami menyediakan berbagai layanan kecantikan lengkap untuk memenuhi
            kebutuhan Anda.
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center mt-10">
            <div className="bg-white p-8 pb-1 border border-gray-300 hover:shadow-lg duration-500">
              <div className="bg-[#FFE8DA] w-14 h-14 mb-6  flex justify-center items-center">
                <PiFlowerLotus size={28} color="#AD9052" />
              </div>
              <h1 className="mb-3">Gaya Rambut</h1>
              <h1>
                Potong rambut, coloring, highlights, keratin treatment, dan
                styling untuk berbagai acara spesial
              </h1>
              <button className="underline w-full border-t py-3 border-t-gray-200 mt-10 flex items-end gap-1 text-[#AD9052]">
                Selengkapnya <IoIosArrowRoundForward />
              </button>
            </div>
            <div className="bg-white p-8 pb-1 border border-gray-300 hover:shadow-lg duration-500">
              <div className="bg-[#FFE8DA] w-14 h-14 mb-6  flex justify-center items-center">
                <PiFlowerLotus size={28} color="#AD9052" />
              </div>
              <h1 className="mb-3">Gaya Rambut</h1>
              <h1>
                Potong rambut, coloring, highlights, keratin treatment, dan
                styling untuk berbagai acara spesial
              </h1>
              <button className="underline w-full border-t py-3 border-t-gray-200 mt-10 flex items-end gap-1 text-[#AD9052]">
                Selengkapnya <IoIosArrowRoundForward />
              </button>
            </div>
            <div className="bg-white p-8 pb-1 border border-gray-300 hover:shadow-lg duration-500">
              <div className="bg-[#FFE8DA] w-14 h-14 mb-6  flex justify-center items-center">
                <PiFlowerLotus size={28} color="#AD9052" />
              </div>
              <h1 className="mb-3">Gaya Rambut</h1>
              <h1>
                Potong rambut, coloring, highlights, keratin treatment, dan
                styling untuk berbagai acara spesial
              </h1>
              <button className="underline w-full border-t py-3 border-t-gray-200 mt-10 flex items-end gap-1 text-[#AD9052]">
                Selengkapnya <IoIosArrowRoundForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
