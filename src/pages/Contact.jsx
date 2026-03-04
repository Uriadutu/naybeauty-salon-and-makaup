import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <section id="contact">
      <div className="py-16 px-4 sm:px-8  bg-[#FFF9EB]">
        <div className="">
          <h1 className="judul">Kontak</h1>
          <h1 className="subjudul">Hubungi Kami</h1>
          <h1 className="subjudul2">Disini</h1>
          <h1 className="sub-deskripsi">
            Siap untuk memulai perjalanan kecantikan Anda? Hubungi kami untuk
            reservasi atau pertanyaan lebih lanjut.
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-12 mt-10 mx-auto">
            <div className="space-y-4">
              <div className="bg-[#FFE8DA] flex items-center p-5 h-[8rem]">
                <div className="grid grid-cols-6 w-full items-center gap-5">
                  <div className="py-5 h-[4rem] w-full bg-[#FFF9EB] flex items-center justify-center col-span-1">
                    <HiOutlineLocationMarker
                      className="text-[#AD9052]"
                      size={25}
                    />
                  </div>

                  <div className="col-span-5">
                    <p className="font-semibold text-lg text-[#3B2F2F]">
                      Alamat
                    </p>
                    <p>
                      Jl. Purwodadi - Bagelen, Dusun II, Purwodadi, Kec.
                      Purwodadi, Kabupaten Purworejo, Jawa Tengah 54173
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFE8DA] flex items-center p-5 h-[8rem]">
                <div className="grid grid-cols-6 w-full items-center gap-5">
                  <div className="py-5 h-[4rem] w-full bg-[#FFF9EB] flex items-center justify-center col-span-1">
                    <BsTelephone className="text-[#AD9052]" size={25} />
                  </div>

                  <div className="col-span-5">
                    <p className="font-semibold text-lg text-[#3B2F2F]">
                      WhatsApp
                    </p>
                    <p>085640577538</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFE8DA] flex items-center p-5 h-[8rem]">
                <div className="grid grid-cols-6 w-full items-center gap-5">
                  <div className="py-5 h-[4rem] w-full bg-[#FFF9EB] flex items-center justify-center col-span-1">
                    <FaRegClock className="text-[#AD9052]" size={25} />
                  </div>

                  <div className="col-span-5">
                    <p className="font-semibold text-lg text-[#3B2F2F]">
                      Jam Operasional
                    </p>
                    <p>Senin - Minggu: 09.00 - 20.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className=" bg-[#FFE8DA] h-full w-full flex flex-col items-center justify-center shadow-md p-8">
                <h2 className="text- font-semibold text-2xl text-center">Reservasi Online</h2>
                <h1 className="text-center mt-4 mb-8">
                  {" "}
                  Pilih layanan yang Anda inginkan, lalu diarahkan langsung ke
                  WhatsApp.
                </h1>
                <Link to={"/reservasi"} className="text-center bg-[#332407] w-full p-3 text-white mt-3">
                  Pilih Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
