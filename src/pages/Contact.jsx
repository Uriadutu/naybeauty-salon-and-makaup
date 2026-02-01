import ContactForm from "../components/ContactForm";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
const Contact = () => {
  return (
    <section id="contact">
      <div className="py-16 px-4 sm:px-8 sm:h-[100vh] bg-[#FFF9EB]">
        <div className="">
          <h1 className="judul">Kontak</h1>
          <h1 className="subjudul">Hubungi Kami</h1>
          <h1 className="subjudul2">Disini</h1>
          <h1 className="text-center text-black">
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
            </div>

            <div>
              <div className=" bg-[#FFE8DA] shadow-md p-8">
                <h2 className="text-2xl font-bold text-pink-700 mb-6">
                  Kirim Pesan
                </h2>
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
