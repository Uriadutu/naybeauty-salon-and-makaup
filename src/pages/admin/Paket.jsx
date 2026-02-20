import React, { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import { AnimatePresence, motion } from "framer-motion";
import { RiMoreLine } from "react-icons/ri";
import AddPaketModal from "../../modal/AddPaketModal";
import { GoChevronDown } from "react-icons/go";

import { db } from "../../auth/Firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";

const Paket = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editingPaket, setEditingPaket] = useState(null);

  const [paketData, setPaketData] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [namaTombol, setNamaTombol] = useState("Tambah Paket");
  const [expandedRow, setExpandedRow] = useState(null);
  const [menuLayanan, setMenuLayanan] = useState([]);
  const [dropdown, setDropdown] = useState({
    open: false,
    x: 0,
    y: 0,
    id: null,
  });

  useEffect(() => {
    const fetchMenu = async () => {
      const snapshot = await getDocs(collection(db, "menu_layanan"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuLayanan(data);
    };

    fetchMenu();
  }, []);

  // 🔥 GET PAKET
  useEffect(() => {
    const q = query(collection(db, "paket"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPaketData(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleFav = async (id) => {
    try {
      const q = query(collection(db, "paket"), where("isLaris", "==", true));

      const snapshot = await getDocs(q);

      const promises = snapshot.docs.map((docSnap) =>
        updateDoc(doc(db, "paket", docSnap.id), {
          isLaris: false,
        }),
      );

      await Promise.all(promises);

      const paketRef = doc(db, "paket", id);
      await updateDoc(paketRef, {
        isLaris: true,
      });
    } catch (error) {
      alert("Gagal menyimpan perubahan");
    }
  };
  // 🔥 GET SERVICES LANGSUNG DARI "layanan"
  useEffect(() => {
    const q = query(collection(db, "layanan"), orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().nama,
        price: doc.data().harga || "0",
        duration: doc.data().durasi || "0",
      }));

      setServices(data);
    });

    return () => unsub();
  }, []);

  const handleSave = () => {
    setEditingPaket(null);
  };

  return (
    <Layout>
      <AnimatePresence>
        {openModal && (
          <AddPaketModal
            isOpen={openModal}
            onClose={() => {
              setOpenModal(false);
              setEditingPaket(null);
            }}
            namaTombol={namaTombol}
            onSave={handleSave}
            services={services}
            editingPackage={editingPaket}
          />
        )}
      </AnimatePresence>

      <div className="p-2 sm:p-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="judul-admin">Manajemen Paket</h1>
            <p className="subjudul-admin">
              Kelola paket layanan perawatan eksklusif
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#CB9B00] hover:bg-[#b79833] text-black px-4 py-2 rounded-md"
          >
            + Tambah Paket
          </button>
        </div>

        {/* TABLE */}
        <div className=" bg-white border rounded-md border-[#E8DFD7]  overflow-x-auto shadow-md">
          <div className="sm:w-auto w-3">
            <table className="min-w-full ">
              <thead className="bg-[#F5F1ED]">
                <tr>
                  <th className="px-6 py-3 text-left pl-10 whitespace-nowrap">
                    Nama Paket
                  </th>
                  <th className="px-6 py-3 text-left whitespace-nowrap">
                    Layanan
                  </th>
                  <th className="px-6 py-3 text-left whitespace-nowrap">
                    Harga
                  </th>
                  <th className="px-0 py-3 m-0 text-center whitespace-nowrap">
                    #
                  </th>
                  <th className="p-0 w-0 m-0 pr-7 text-center whitespace-nowrap"></th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      Memuat data...
                    </td>
                  </tr>
                ) : paketData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      Belum ada paket
                    </td>
                  </tr>
                ) : (
                  paketData.map((item) => (
                    <React.Fragment key={item.id}>
                      {/* ROW UTAMA */}
                      <tr className="border-t hover:bg-gray-50  ">
                        <td className="pl-10 px-6 py-3 relative overflow-hidden whitespace-nowrap">
                          {item.isLaris && (
                            <div className="absolute -left-8 top-4 rotate-[-45deg] bg-[#f8c110] text-white text-xs font-bold px-10 shadow-lg">
                              Laris
                            </div>
                          )}
                          <div className="font-medium text-lg text-slate-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-slate-600 mt-1">
                            {item.description || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <div className=" text-lg text-slate-900">
                            {item.services.length} Layanan
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-amber-600">
                            Rp{item.finalPrice.toLocaleString("id-ID")}
                          </div>
                          {item.finalPrice !== item.basePrice && (
                            <div className="text-sm text-slate-500 line-through">
                              Rp{item.basePrice.toLocaleString("id-ID")}
                            </div>
                          )}
                        </td>

                        <td className="py-3 text-center whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              setDropdown({
                                open: true,
                                x: rect.right,
                                y: rect.bottom,
                                id: item.id,
                                data: item,
                              });
                            }}
                            className="text-xl px-2"
                          >
                            <RiMoreLine />
                          </button>
                        </td>

                        <td>
                          <button
                            onClick={() =>
                              setExpandedRow(
                                expandedRow === item.id ? null : item.id,
                              )
                            }
                            className="transition-transform duration-300"
                          >
                            <GoChevronDown
                              className={`text-sm sm:text-lg transition-transform duration-300 ${
                                expandedRow === item.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </td>
                      </tr>

                      {/* ROW DETAIL */}
                      <AnimatePresence>
                        {expandedRow === item.id && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-50"
                          >
                            <td colSpan="5" className="px-6 py-4">
                              <p className="font-semibold mb-2">
                                Detail Layanan & Menu
                              </p>

                              <div className="space-y-3 text-sm">
                                <ul className="list-disc ml-6">
                                  {item.services?.map((srv, i) => {
                                    // 🔥 ambil nama layanan
                                    const layanan = services.find(
                                      (l) => l.id === srv.id_layanan,
                                    );

                                    // 🔥 ambil semua menu yang dipilih berdasarkan ID
                                    const selectedMenus = menuLayanan.filter(
                                      (menu) =>
                                        srv.selectedMenuItems?.includes(
                                          menu.id,
                                        ),
                                    );

                                    return (
                                      <li key={i}>
                                        <span className="font-medium">
                                          {layanan?.name ||
                                            "Layanan tidak ditemukan"}
                                        </span>

                                        {/* LIST NAMA MENU */}
                                        {selectedMenus.length > 0 && (
                                          <ul className="list-disc ml-6 mt-1 text-gray-600">
                                            {selectedMenus.map((menu) => (
                                              <div key={menu.id} className="grid w-[300px] grid-cols-2 gap-0 items-center">

                                                <p className="m-0"> 

                                                {menu.nama_menu} 
                                                </p>
                                                
                                                <p> 

                                                - Rp{menu.harga_menu.toLocaleString("id-ID")} 
                                                </p>

                                              </div>
                                            ))}
                                          </ul>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {dropdown.open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdown({ open: false, x: 0, y: 0, id: null })}
        >
          <div
            className="absolute bg-white border rounded-md shadow-lg w-28 z-50"
            style={{
              top: dropdown.y + 6,
              left: dropdown.x - 110,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                handleFav(dropdown.id);

                setDropdown({ open: false, x: 0, y: 0, id: null });
              }}
              className="w-full text-left px-3 text-amber-500 py-2 hover:bg-amber-100"
            >
              Set Terlaris
            </button>
            <button
              onClick={() => {
                setEditingPaket(dropdown.data);
                setOpenModal(true);
                setNamaTombol("Edit Paket");
                setDropdown({ open: false, x: 0, y: 0, id: null });
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              // onClick={() => handleDeletePaket(dropdown.id)}
              className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-100"
            >
              Hapus
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Paket;
