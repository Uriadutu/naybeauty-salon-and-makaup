import React, { useEffect, useState } from "react";
import { MdArrowBack, MdKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../auth/Firebase";

const Reservasi = () => {
  const [services, setServices] = useState([]);
  const [paketList, setPaketList] = useState([]);
  const [menuLayanan, setMenuLayanan] = useState([]);
  const [showList, setShowList] = useState(false);
  const [serviceForms, setServiceForms] = useState([
    { layananId: "", menus: [] },
  ]);

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

            setServices(Object.values(layananMap));
          },
        );

        return () => unsubMenu();
      },
    );

    return () => unsubLayanan();
  }, []);

  useEffect(() => {
    const unsubMenu = onSnapshot(collection(db, "menu_layanan"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuLayanan(data);
    });

    const unsubPaket = onSnapshot(collection(db, "paket"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPaketList(data);
    });

    return () => {
      unsubMenu();
      unsubPaket();
    };
  }, []);

  const handleAddPaket = (paket) => {
    let updatedForms = [];

    paket.services?.forEach((srv) => {
      const layananId = srv.layananId;

      const selectedMenus = menuLayanan.filter((menu) =>
        srv.selectedMenuItems?.includes(menu.id),
      );

      if (selectedMenus.length > 0) {
        updatedForms.push({
          layananId,
          menus: selectedMenus,
        });
      }
    });

    // Tambahkan 1 form kosong di akhir
    updatedForms.push({ layananId: "", menus: [] });

    setServiceForms(updatedForms);
  };

  /* ================= HANDLE PILIH LAYANAN ================= */
  const handleSelectLayanan = (index, layananId) => {
    const updated = [...serviceForms];
    updated[index].layananId = layananId;
    updated[index].menus = [];
    setServiceForms(updated);
  };

  /* ================= HANDLE CHECK MENU ================= */
  const handleCheckMenu = (index, menu, checked) => {
    let updated = [...serviceForms];

    if (checked) {
      updated[index].menus.push(menu);

      // Jika ini form terakhir dan baru dicentang → tambah form baru
      if (index === serviceForms.length - 1) {
        updated.push({ layananId: "", menus: [] });
      }
    } else {
      updated[index].menus = updated[index].menus.filter(
        (m) => m.id !== menu.id,
      );
    }

    // 🔥 LOGIC BARU: HAPUS FORM SETELAHNYA JIKA KOSONG
    for (let i = 0; i < updated.length; i++) {
      if (updated[i].menus.length === 0) {
        updated = updated.slice(0, i + 1);
        break;
      }
    }

    setServiceForms(updated);
  };

  /* ================= CART GABUNG SEMUA ================= */
  const cart = serviceForms.flatMap((form) =>
    form.menus.map((menu) => ({
      ...menu,
      nama_layanan: services.find((s) => s.id === form.layananId)?.nama || "",
    })),
  );

  return (
    <div className="bg-[#FFF9EB] min-h-[100vh]">
      {/* HEADER */}
      <header className="fixed top-0 w-full backdrop-blur-md shadow-lg bg-[#FFF9EB] z-50">
        <div className="px-4 sm:px-8 mx-auto py-3 grid grid-cols-3 items-center">
          <Link to={-1} className="text-2xl">
            <span className="flex items-center gap-1">
              <MdArrowBack />
              <p className="hidden sm:block">Kembali</p>
            </span>
          </Link>
          <p className="text-2xl text-center">Reservasi</p>
          <div></div>
        </div>
      </header>

      <section className="py-20 px-4 sm:px-48 bg-[#FFF9EB]">
        <div className="mb-4">
          {" "}
          <h1 className="subjudul">Paket/Menu Pilihan Anda</h1>
          <p className="sub-deskripsi">
            Pilih Paket atau Menu pilihan anda dan lakukan reservasi.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:mb-0 mb-96">
          {/* ================= LEFT SIDE LOOP ================= */}
          <div className="sm:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="font-semibold mb-3">Pilih Paket</h2>

              {paketList.length === 0 ? (
                <p className="text-sm text-gray-400">Belum ada paket</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {paketList.map((paket) => (
                    <div
                      key={paket.id}
                      onClick={() => handleAddPaket(paket)}
                      className="border p-3 rounded-lg cursor-pointer hover:bg-[#FFF4E8] transition"
                    >
                      <p className="font-medium">{paket.name}</p>
                      <p className="text-sm text-[#AD9052]">
                        Rp {paket.finalPrice?.toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {serviceForms.map((form, index) => {
              const selectedLayanan = services.find(
                (s) => s.id === form.layananId,
              );

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 space-y-4"
                >
                  <h2 className="font-semibold">Pilih Layanan {index + 1}</h2>

                  <select
                    value={form.layananId}
                    onChange={(e) => handleSelectLayanan(index, e.target.value)}
                    className="w-full border p-2 rounded-lg"
                  >
                    <option value="">-- Pilih Layanan --</option>
                    {services.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama}
                      </option>
                    ))}
                  </select>

                  {/* LIST MENU DENGAN SCROLL */}
                  {selectedLayanan && (
                    <div className="border rounded-lg p-3 max-h-60 overflow-y-auto space-y-3">
                      {selectedLayanan.menus.map((menu) => {
                        const isChecked = form.menus.some(
                          (m) => m.id === menu.id,
                        );

                        return (
                          <div
                            key={menu.id}
                            onClick={() =>
                              handleCheckMenu(index, menu, !isChecked)
                            }
                            className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition 
            ${isChecked ? "bg-[#FFF4E8]" : "hover:bg-gray-50"}`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) =>
                                  handleCheckMenu(index, menu, e.target.checked)
                                }
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span>{menu.nama_menu}</span>
                            </div>

                            <span className="text-sm text-[#AD9052] font-medium">
                              Rp{menu.harga_menu?.toLocaleString("id-ID")}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="h-full flex items-start justify-start">
            <div className="bg-white fixed inline sm:relative bottom-0 left-0 rounded-lg border w-full sm:h-auto p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <h1>Nama Lengkap</h1>
                <input type="text" className="border p-2 rounded" />
                <h1>Tanggal</h1>
                <input type="date" className="border p-2 rounded" />
                <h1>Jam</h1>
                <input type="time" className="border p-2 rounded" />
              </div>

              <div className="flex justify-between items-center mt-4 sm:hidden">
                <h1 className="font-semibold">Daftar Pesanan:</h1>
                <button onClick={() => setShowList(!showList)}>
                  <MdKeyboardArrowUp
                    className={`transition-transform duration-300 ${
                      showList ? "rotate-180" : ""
                    }`}
                    size={24}
                  />
                </button>
              </div>

              <div className={`${showList ? "block" : "hidden"} sm:block mt-2`}>
                {cart.length === 0 ? (
                  <p className="text-sm text-gray-400">Belum ada pilihan</p>
                ) : (
                  <ul className="space-y-2 ">
                    <div className="max-h-20 overflow-y-auto mt-2 pr-2">
                      <ul className="space-y-2">
                        {cart.map((item, i) => (
                          <li
                            key={i}
                            className="flex justify-between text-sm border-b pb-1"
                          >
                            <span>
                              {item.nama_layanan} - {item.nama_menu}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ul>
                )}
              </div>

              <button className="text-center bg-[#e8ba58] w-full border p-2 mt-4 hover:bg-[#daac49] duration-300">
                Reservasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservasi;
