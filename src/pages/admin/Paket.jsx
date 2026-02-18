import React, { useState } from "react";
import Layout from "../../components/admin/Layout";
import { AnimatePresence } from "framer-motion";
import { RiMoreLine } from "react-icons/ri";
import AddPaketModal from "../../modal/AddPaketModal";

// dummy services (nanti ganti dari firestore)
const dummyServices = [
  {
    id: "1",
    name: "Layanan Kuku",
    price: "50000",
    duration: "60",
  },
  {
    id: "2",
    name: "Facial Wajah",
    price: "75000",
    duration: "90",
  },
];

// dummy paket
const dummyPaket = [
  {
    id: "p1",
    name: "Paket Cantik",
    description: "Perawatan lengkap kuku dan wajah",
    basePrice: 125000,
    finalPrice: 100000,
    duration: 150,
    services: [],
    createdAt: new Date().toISOString(),
  },
];

const Paket = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editingPaket, setEditingPaket] = useState(null);
  const [paketData, setPaketData] = useState(dummyPaket);

  const handleSave = (newData) => {
    if (editingPaket) {
      setPaketData((prev) =>
        prev.map((p) => (p.id === newData.id ? newData : p))
      );
    } else {
      setPaketData((prev) => [...prev, newData]);
    }

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
            onSave={handleSave}
            services={dummyServices}
            editingPackage={editingPaket}
          />
        )}
      </AnimatePresence>

      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold">Manajemen Paket</h1>
            <p className="text-gray-500">
              Kelola paket layanan dan harga salon
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
        <div className="bg-white border rounded-md shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F1ED]">
              <tr>
                <th className="px-6 py-3 text-left">Nama Paket</th>
                <th className="px-6 py-3 text-left">Durasi</th>
                <th className="px-6 py-3 text-left">Harga</th>
                <th className="px-4 py-3 text-center">#</th>
              </tr>
            </thead>

            <tbody>
              {paketData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    Belum ada paket
                  </td>
                </tr>
              ) : (
                paketData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-6 py-3">{item.name}</td>
                    <td className="px-6 py-3">
                      {item.duration} menit
                    </td>
                    <td className="px-6 py-3 font-medium">
                      Rp
                      {item.finalPrice.toLocaleString("id-ID")}
                    </td>

                    {/* AKSI */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setEditingPaket(item);
                          setOpenModal(true);
                        }}
                        className="text-xl px-2"
                      >
                        <RiMoreLine />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Paket;
