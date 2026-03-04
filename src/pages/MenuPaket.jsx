import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../auth/Firebase";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";

const MenuPaket = () => {
  const [paketList, setPaketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuLayanan, setMenuLayanan] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "menu_layanan"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuLayanan(data);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsubPaket = onSnapshot(collection(db, "paket"), (snap) => {
      if (snap.empty) {
        setPaketList([]);
        setLoading(false);
        return;
      }

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sorted = [...data].sort(
        (a, b) => (a.finalPrice || 0) - (b.finalPrice || 0),
      );

      const termurah = sorted[0];
      const termahal = sorted[sorted.length - 1];

      const middleIndex = Math.floor(sorted.length / 2);
      let tengah = sorted[middleIndex];

      const terlaris = data.find((item) => item.isLaris === true);

      if (terlaris) {
        tengah = terlaris;
      }

      const result = [];
      [termurah, tengah, termahal].forEach((item) => {
        if (item && !result.find((r) => r.id === item.id)) {
          result.push(item);
        }
      });

      const finalResult = result.sort(
        (a, b) => (a.finalPrice || 0) - (b.finalPrice || 0),
      );

      setPaketList(finalResult);
      setLoading(false);
    });

    return () => unsubPaket();
  }, []);
  return (
    <section id="menu-paket">
      
      <div className="py-16 px-4 sm:px-8 bg-[#FFF9EB] ">
        <div>
          <h1 className="judul">Paket</h1>
          <h1 className="subjudul">Pilih Paket</h1>
          <h1 className="subjudul2">Sesuai Kebutuhan</h1>
          <h1 className="sub-deskripsi">
            Nikmati berbagai paket perawatan eksklusif dengan kombinasi layanan
            terbaik untuk hasil maksimal.
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 justify-center mt-14  border-b pb-10 border-[#baa67a]">
            {loading ? (
              <p className="col-span-full text-center">Memuat paket...</p>
            ) : paketList.length === 0 ? (
              <p className="col-span-full text-center">
                Belum ada paket tersedia
              </p>
            ) : (
              paketList.map((item) => {
                const isLaris = item.isLaris;

                const profitPercent =
                  item.basePrice && item.finalPrice
                    ? Math.round(
                        ((item.basePrice - item.finalPrice) / item.basePrice) *
                          100,
                      )
                    : 0;

                return (
                  <div className="relative">
                    {isLaris && (
                      <div className="absolute mt-0 sm:-mt-10 h-10 w-full p-1 rounded-t-3xl pb-20 text-center  bg-[#332407]">
                        <h1 className="text-lg  text-white">Paket Terlaris</h1>
                      </div>
                    )}
                    <div
                      key={item.id}
                      className={`p-8 border mb-0 border-gray-300 hover:shadow-lg duration-500 relative
                    ${
                      isLaris
                        ? "border-[#332407] mt-10 sm:mt-0 border-t-0 border-2 bg-white rounded-t-3xl rounded-2xl"
                        : "bg-white rounded-2xl mb-0"
                    }`}
                    >
                      <div className="absolute right-8">
                        {profitPercent > 0 && (
                          <span className="bg-[#AD9052]/30 text-[#493c21] text-xs px-2 py-1 rounded-full">
                            Untung {profitPercent}%
                          </span>
                        )}
                      </div>
                      {/* Nama Paket */}
                      <p className="tracking-widest text font-bold mt-10 text-xl">
                        {item.name}
                      </p>

                      {/* Deskripsi */}
                      <h1 className="mb-3">{item.description}</h1>

                      {/* Harga */}
                      <h1 className="line-through mt-10 text-gray-400">
                        Rp {item.basePrice?.toLocaleString("id-ID")}
                      </h1>

                      <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold">
                          Rp {item.finalPrice?.toLocaleString("id-ID")}
                        </h1>
                      </div>

                      {/* Button */}
                      <div className="w-full flex justify-center">
                        <button
                          className={`w-full mt-5 py-2 rounded ${
                            isLaris
                              ? "bg-[#332407] text-white hover:bg-[#4d370b] duration-200"
                              : "text-[#332407] bg-white border border-[#332407] hover:bg-gray-200 duration-200"
                          }`}
                        >
                          Lihat Paket
                        </button>
                      </div>

                      {/* List Menu dari services */}
                      <ul className="mt-10">
                        {(() => {
                          const allMenus = [
                            ...new Map(
                              item.services
                                ?.flatMap((srv) =>
                                  menuLayanan.filter((menu) =>
                                    srv.selectedMenuItems?.includes(menu.id),
                                  ),
                                )
                                .map((menu) => [menu.id, menu]),
                            ).values(),
                          ];

                          return (
                            <>
                              {allMenus.slice(0, 4).map((menu) => (
                                <li
                                  key={menu.id}
                                  className="flex gap-2 items-center"
                                >
                                  <IoMdCheckmark className="text-[#332407]" />
                                  {menu.nama_menu}
                                </li>
                              ))}

                              {allMenus.length > 4 && (
                                <li className="text-[#AD9052] text-xs mt-2">
                                  + {allMenus.length - 4} menu lainnya
                                </li>
                              )}
                            </>
                          );
                        })()}
                      </ul>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="flex items-center justify-center p-3 font-dmsans text-[#AD9052] tracking-[3px] uppercase">
          <Link to="/semua-paket">Lihat Semua Paket</Link>
        </div>
      </div>
    </section>
  );
};

export default MenuPaket;
