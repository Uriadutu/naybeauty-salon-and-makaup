import { IoMdCheckmark } from "react-icons/io";
const MenuPaket = () => {
  return (
    <section id="menu-paket">
      <div className="py-16 px-4 sm:px-8 bg-[#FFF9EB] sm:h-[100vh]">
        <div className="">
          <h1 className="judul">Paket</h1>
          <h1 className="subjudul">Pilih Paket</h1>
          <h1 className="subjudul2">Sesuai Kebutuhan</h1>
          <h1 className="sub-deskripsi">
            Nikmati berbagai paket perawatan eksklusif dengan kombinasi layanan
            terbaik untuk hasil maksimal.
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 justify-center items-center mt-10">
            <div className="bg-white p-8 pb-1 border border-gray-300 hover:shadow-lg duration-500 h-[26rem]">
              <p>Paket 1</p>
              <h1 className="mb-3">
                Perawatan dasar untuk kulit sehat dan terawat
              </h1>
              <h1>Mulai Dari</h1>
              <h1 className="text-3xl">Rp 5K - Rp 10K</h1>
              <ul className="mt-10">
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[#332407]" /> Potong rambut
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[#332407]" /> Potong rambut
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[#332407]" /> Potong rambut
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[#332407]" /> Potong rambut
                </li>
              </ul>
              <div className="w-full flex justify-center">
                <button className="bg-[#332407] text-white w-full mt-5 py-2">
                  Lihat Paket
                </button>
              </div>
            </div>
            <div className="bg-[#332407] text-white p-8 pb-1 border border-gray-300 hover:shadow-lg duration-500 h-[28rem] relative">
              <p>Paket 1</p>
              <h1 className="mb-3">
                Perawatan dasar untuk kulit sehat dan terawat
              </h1>
              <div className="absolute top-0 right-0 bg-[#FFD9C3] text-[#332407] px-6">
                Terlaris
              </div>

              <h1>Mulai Dari</h1>
              <h1 className="text-3xl">Rp 5K - Rp 10K</h1>
              <ul className="mt-10">
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[white]" /> Potong rambut
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[white]" /> Potong rambut
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[white]" /> Potong rambut
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[white]" /> Potong rambut
                </li>
              </ul>
              <div className="w-full flex justify-center">
                <button className="text-[#332407] bg-white w-full mt-5 py-2">
                  Lihat Paket
                </button>
              </div>
            </div>
            <div className="bg-white p-8 pb-1 border border-gray-300 hover:shadow-lg duration-500 h-[26rem]">
              <p>Paket 1</p>
              <h1 className="mb-3">
                Perawatan dasar untuk kulit sehat dan terawat
              </h1>
              <h1>Mulai Dari</h1>
              <h1 className="text-3xl">Rp 5K - Rp 10K</h1>
              <ul className="mt-10">
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[#332407]" /> Potong rambut
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[#332407]" /> Potong rambut
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[#332407]" /> Potong rambut
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[#332407]" /> Potong rambut
                </li>
                <li className="flex gap-2 items-center">
                  <IoMdCheckmark className="text-[#332407]" /> Potong rambut
                </li>
              </ul>
              <div className="w-full flex justify-center">
                <button className="bg-[#332407] text-white w-full mt-5 py-2">
                  Lihat Paket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPaket;
