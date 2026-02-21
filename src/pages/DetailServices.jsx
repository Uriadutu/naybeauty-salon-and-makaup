import { useEffect, useState } from "react";
import { db } from "../auth/Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiFlowerLotus } from "react-icons/pi";
import HeaderDetail from "../components/HeaderDetail";
import { Link } from "react-router-dom";

const DetailServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubLayanan = onSnapshot(
      query(collection(db, "layanan"), orderBy("createdAt", "asc")),
      (layananSnap) => {
        const layananMap = {};

        layananSnap.docs.forEach((doc) => {
          layananMap[doc.id] = {
            id: doc.id,
            nama: doc.data().nama,
            menus: [],
            hargaMulai: 0,
          };
        });

        const unsubMenu = onSnapshot(
          query(collection(db, "menu_layanan"), orderBy("createdAt", "asc")),
          (menuSnap) => {
            menuSnap.docs.forEach((doc) => {
              const menu = { id: doc.id, ...doc.data() };

              if (layananMap[menu.id_layanan]) {
                layananMap[menu.id_layanan].menus.push(menu);
              }
            });

            const result = Object.values(layananMap).map((item) => {
              const hargaList = item.menus.map((m) => m.harga_menu || 0);
              const hargaMulai =
                hargaList.length > 0 ? Math.min(...hargaList) : 0;

              return {
                ...item,
                hargaMulai,
              };
            });

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
          <h1 className="subjudul"></h1>
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
                    className="group bg-white rounded-2xl p-6 border border-gray-100
               shadow-sm hover:shadow-2xl
               transition-all duration-500 flex flex-col justify-between"
                  >
                    {/* ICON */}
                    <div
                      className="w-14 h-14 rounded-xl bg-[#FFE8DA]
                    flex items-center justify-center mb-5
                    group-hover:scale-110 transition"
                    >
                      <PiFlowerLotus size={26} className="text-[#AD9052]" />
                    </div>

                    {/* CONTENT */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-2 tracking-tight">
                        {item.nama}
                      </h2>

                      {/* BADGE */}
                      <span
                        className="inline-block text-xs bg-[#AD9052]/10
                       text-[#AD9052] px-3 py-1 rounded-full mb-3"
                      >
                        {item.menus.length} Menu Tersedia
                      </span>

                      {/* PREVIEW MENU */}
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        {item.menus.slice(0, 3).map((menu) => (
                          <li key={menu.id}>• {menu.nama_menu}</li>
                        ))}

                        {item.menus.length > 3 && (
                          <li className="text-[#AD9052] text-xs">
                            + {item.menus.length - 3} menu lainnya
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-6 border-t pt-4 flex items-center justify-between">
                      <div>
                        {item.hargaMulai > 0 && (
                          <p className="text-sm text-gray-500">Mulai dari</p>
                        )}

                        <p className="text-lg font-semibold text-[#AD9052]">
                          {item.hargaMulai > 0
                            ? `Rp${item.hargaMulai.toLocaleString("id-ID")}`
                            : "-"}
                        </p>
                      </div>

                      <Link
                        to={`/layanan/${item.id}`}
                        className="text-sm font-medium text-[#AD9052]
                   flex items-center gap-1
                   group-hover:gap-2 transition-all"
                      >
                        Detail <IoIosArrowRoundForward size={20} />
                      </Link>
                    </div>
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
