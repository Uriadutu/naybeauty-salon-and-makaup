import React, { useEffect, useState } from "react";
import { db } from "../auth/Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { joinWithDan, truncateChars } from "../utils/helper";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiFlowerLotus } from "react-icons/pi";
import HeaderDetail from "../components/HeaderDetail";
import { Link } from "react-router-dom";

const DetailServices = () => {
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
    <div>
      <HeaderDetail />
      <section id="services">
        <div className="py-16 px-4 sm:px-8 bg-[#FFE8DA]">
          <h1 className="judul">Detail Layanan</h1>
          <div>
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center mt-10">
              {loading ? (
                <p className="col-span-full text-center text-gray-600">
                  Memuat layanan...
                </p>
              ) : services.length === 0 ? (
                <p className="col-span-full text-center text-gray-600">
                  Belum ada layanan
                </p>
              ) : (
                services.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white flex flex-col justify-between p-8 pb-1 border border-gray-300 hover:shadow-lg duration-500"
                  >
                    <div className="bg-[#FFE8DA] w-14 h-14 mb-6 flex justify-center items-center">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailServices;
