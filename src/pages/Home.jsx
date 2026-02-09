import { IoIosArrowForward } from "react-icons/io";
import bg from "../img/bg.jpeg";
import naylogo from "../img/logo.png";

const Home = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="home">
      <div className="bg-black">
        {/* Hero Section */}
        <section
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative py-20 sm:h-[100vh]"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative container mx-auto px-4 text-center text-white">
            <div className="flex justify-center mt-20">
              <img src={naylogo} alt="naylogo" className="w-80 h-auto mt-0" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold my-9">
              Keindahan Sejati <br />
              Bermula dari Sini
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Nikmati pengalaman perawatan kecantikan premium dengan layanan
              personal dan berkualitas. Transformasi diri Anda dimulai di
              NayBeauty
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button
                className="py-3 px-4 bg-white text-black text-lg hover:bg-gray-100 w-full md:w-auto"
                onClick={() => scrollToSection("contact")}
              >
                <div className="flex items-center gap-2 justify-center">
                  Reservasi Sekarang <IoIosArrowForward />
                </div>
              </button>

              <button
              onClick={()=> scrollToSection("services")}
                className="border-2 border-white hover:bg-white/20 duration-300 py-3 px-4 text-white text-lg w-full md:w-auto text-center"
              >
                Lihat Layanan
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Home;
