import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../auth/Firebase";
import { IoMdCheckmark } from "react-icons/io";

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
    // 🔹 Ambil semua menu_layanan dan group by id_layanan
    const unsubMenu = onSnapshot(collection(db, "menu_layanan"), (snap) => {
      const map = {};

      snap.docs.forEach((doc) => {
        const data = doc.data();

        if (!map[data.id_layanan]) {
          map[data.id_layanan] = [];
        }

        map[data.id_layanan].push(data.nama_menu);
      });

    });

    // 🔹 Ambil semua paket
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

      // Termurah
      const termurah = [...data].sort((a, b) => a.finalPrice - b.finalPrice)[0];

      // Termahal
      const termahal = [...data].sort((a, b) => b.finalPrice - a.finalPrice)[0];

      // Terlaris
      const terlaris = data.find((item) => item.isLaris === true);

      // Hindari duplikat
      const unique = [];
      [termurah, terlaris, termahal].forEach((item) => {
        if (item && !unique.find((u) => u.id === item.id)) {
          unique.push(item);
        }
      });

      setPaketList(unique);
      setLoading(false);
    });

    return () => {
      unsubMenu();
      unsubPaket();
    };
  }, []);

  return (
    <section id="menu-paket">
      <div className="py-16 px-4 sm:px-8 bg-[#FFF9EB] sm:h-[100vh]">
        <div>
          <h1 className="judul">Paket</h1>
          <h1 className="subjudul">Pilih Paket</h1>
          <h1 className="subjudul2">Sesuai Kebutuhan</h1>
          <h1 className="sub-deskripsi">
            Nikmati berbagai paket perawatan eksklusif dengan kombinasi layanan
            terbaik untuk hasil maksimal.
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 justify-center items-center mt-10">
            {loading ? (
              <p className="col-span-full text-center">Memuat paket...</p>
            ) : paketList.length === 0 ? (
              <p className="col-span-full text-center">
                Belum ada paket tersedia
              </p>
            ) : (
              paketList.map((item) => {
                const isLaris = item.isLaris;

                return (
                  <div
                    key={item.id}
                    className={`p-8 pb-1 border border-gray-300 hover:shadow-lg duration-500 relative
                    ${
                      isLaris
                        ? "bg-[#332407] text-white h-[28rem]"
                        : "bg-white h-[26rem]"
                    }`}
                  >
                    {/* Badge Terlaris */}
                    {isLaris && (
                      <div className="absolute top-0 right-0 bg-[#FFD9C3] text-[#332407] px-6">
                        Terlaris
                      </div>
                    )}

                    {/* Nama Paket */}
                    <p className="uppercase tracking-widest text-sm">
                      {item.name}
                    </p>

                    {/* Deskripsi */}
                    <h1 className="mb-3">{item.description}</h1>

                    {/* Harga */}
                    <h1>Mulai Dari</h1>
                    <h1 className="text-3xl">
                      Rp {item.finalPrice?.toLocaleString("id-ID")}
                    </h1>

                    {/* List Menu dari services */}
                    <ul className="mt-10">
                      {item.services
                        ?.flatMap((srv) =>
                          menuLayanan
                            .filter((menu) =>
                              srv.selectedMenuItems?.includes(menu.id),
                            )
                            .map((menu) => menu.nama_menu),
                        )
                        .slice(0, 5)
                        .map((menuName, index) => (
                          <li key={index} className="flex gap-2 items-center">
                            <IoMdCheckmark
                              className={
                                item.isLaris ? "text-white" : "text-[#332407]"
                              }
                            />
                            {menuName}
                          </li>
                        ))}
                    </ul>

                    {/* Button */}
                    <div className="w-full flex justify-center">
                      <button
                        className={`w-full mt-5 py-2 ${
                          isLaris
                            ? "text-[#332407] bg-white"
                            : "bg-[#332407] text-white"
                        }`}
                      >
                        Lihat Paket
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPaket;
