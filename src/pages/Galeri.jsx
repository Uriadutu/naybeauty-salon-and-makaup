import { PiFlowerLotus } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
const Galeri = () => {
  return (
    <section id="galeri">
      <div className="py-16 px-4 sm:px-8 bg-[#FFE8DA] sm:h-[100vh]">
        <div className="">
          <h1 className="judul">Galeri</h1>
          <h1 className="subjudul">Hasil Karya</h1>
          <h1 className="subjudul2">Salon Kami</h1>
          <h1 className="text-center text-black">
            Lihatlah transformasi menakjubkan yang telah diciptakan untuk
            klien-klien kami.
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center mt-10">
            <div className="bg-white p-8 pb-1 border border-gray-300 hover:shadow-lg duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Galeri;
