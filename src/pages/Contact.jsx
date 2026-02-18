import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  mt-10 mx-auto">
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
                      Telepon
                    </p>
                    <p>08123456789</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFE8DA] flex items-center p-5 h-[8rem]">
                <div className="grid grid-cols-6 w-full items-center gap-5">
                  <div className="py-5 h-[4rem] w-full bg-[#FFF9EB] flex items-center justify-center col-span-1">
                    <MdOutlineEmail className="text-[#AD9052]" size={25} />
                  </div>

                  <div className="col-span-5">
                    <p className="font-semibold text-lg text-[#3B2F2F]">
                      Email
                    </p>
                    <p>email1@gmail.com</p>
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
              <div className=" bg-[#FFE8DA] shadow-md p-8">
                <h2 className="text- font-semibold">
                  Reservasi
                </h2>
                <h1>Isi form dibawah ini dan kirim pesan untuk melakukan reservasi online</h1>
                <input type="text" className="bg-white border border-gray-100 w-full mt-4 p-3" placeholder="Nama Lengkap" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" className="bg-white border border-gray-100 w-full mt-4 p-3" placeholder="Email" />
                  <input type="text" className="bg-white border border-gray-100 w-full mt-4 p-3" placeholder="Nomor Telepon" />
                </div>
                <textarea name="" id="" className="resize-none w-full mt-3 h-32 p-3" placeholder="Pesan Atau Layanan Yang Diinginkan"></textarea>
                <button className="bg-[#332407] w-full p-3 text-white mt-3">Kirim Pesan</button>
                {/* <ContactForm /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
