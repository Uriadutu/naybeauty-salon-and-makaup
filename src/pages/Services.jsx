import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../auth/Firebase";

import { PiFlowerLotus } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { joinWithDan, truncateChars } from "../utils/helper";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1️⃣ listen layanan
    const unsubLayanan = onSnapshot(
      query(collection(db, "layanan"), orderBy("createdAt", "asc")),
      (layananSnap) => {
        const layananMap = {};
        layananSnap.docs.forEach((doc) => {
          layananMap[doc.id] = {
            id: doc.id,
            nama: doc.data().nama,
            deskripsi: "",
            menus: [],
          };
        });

        // 2️⃣ listen menu_layanan
        const unsubMenu = onSnapshot(
          query(collection(db, "menu_layanan"), orderBy("createdAt", "asc")),
          (menuSnap) => {
            menuSnap.docs.forEach((doc) => {
              const menu = doc.data();
              if (layananMap[menu.id_layanan]) {
                layananMap[menu.id_layanan].menus.push(menu.nama_menu);
              }
            });

            // 3️⃣ gabungkan menu jadi deskripsi
            const result = Object.values(layananMap).map((item) => ({
              ...item,
              deskripsi: joinWithDan(item.menus),
            }));

            setServices(result);
            setLoading(false);
          },
        );

        return () => unsubMenu();
      },
    );

    return () => unsubLayanan();
  }, []);

  return (
    <section id="services">
      <div className="py-16 px-4 sm:px-8 bg-[#FFE8DA]">
        <div>
          <h1 className="judul">Layanan dan Menu</h1>
          <h1 className="subjudul">Perawatan Terbaik</h1>
          <h1 className="subjudul2">Untuk Anda</h1>
          <p className="sub-deskripsi">
            Pilih layanan dan menu perawatan terbaik sesuai kebutuhan Anda.
          </p>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 border-b pb-10 border-[#AD9052]">
            {loading ? (
              <p className="col-span-full text-center text-gray-600">
                Memuat layanan...
              </p>
            ) : services.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">
                Belum ada layanan
              </p>
            ) : (
              services.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="bg-white flex flex-col justify-between p-8 pb-1 border border-gray-300 hover:shadow-lg duration-500"
                >
                  <div className="bg-[#FFF9EB] w-14 h-14 mb-6 flex justify-center items-center">
                    <PiFlowerLotus size={28} color="#AD9052" />
                  </div>

                  <div>
                    <h1 className="mb-3 font-cormorant font-semibold text-2xl">
                      {item.nama}
                    </h1>

                    <p className="text-gray-700">
                      {item.deskripsi.length > 0
                        ? `Tersedia Menu ${truncateChars(item.deskripsi, 180)}`
                        : "Belum Ada Menu"}
                    </p>
                  </div>

                  <Link
                    to={`/layanan/${item.id}`}
                    className="underline w-full border-t py-3 border-t-gray-200 mt-10 flex items-end gap-1 text-[#AD9052]"
                  >
                    Selengkapnya <IoIosArrowRoundForward />
                  </Link>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-center p-3 font-dmsans text-[#AD9052] tracking-[3px] uppercase">
            <Link to="/semua-layanan">Lihat Semua Layanan</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
