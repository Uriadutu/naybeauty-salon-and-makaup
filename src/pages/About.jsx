import ney from "../img/ney.jpeg";
const About = () => {
  return (
    <section id="about">
      <div className="bg-[#FFF9EB] py-16 px-4 sm:px-8 sm:h-[100vh]">
        <div className="">
          <h1 className="judul">Tentang Kami</h1>
          <h1 className="subjudul">Dedikasi Untuk</h1>
          <h1 className="subjudul2">Kecantikan Anda</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center mt-10">
            <div className="flex justify-center">
              <img src={ney} className="w-56 " alt="" />
            </div>
            <div className="col-span-2">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
          <h1 className="judul">Sertifikat</h1>
          <div className="grid mt-10 grid-cols-1 sm:grid-cols-4 gap-x-3 mx-4">
            <div className="bg-white p-2 ">serti 12345</div>
            <div className="bg-white p-2 ">serti 12345</div>
            <div className="bg-white p-2 ">serti 12345</div>
            <div className="bg-white p-2 h-52">serti 12345</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
