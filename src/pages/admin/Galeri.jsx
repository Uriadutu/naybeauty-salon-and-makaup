import { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import { RiMoreLine } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../auth/Firebase";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ModalAddGaleri from "../../modal/AddGaleriModal";
import { formatTanggal } from "../../utils/helper";

const Galeri = () => {
  const [search, setSearch] = useState("");
  const [galeriData, setGaleriData] = useState([]);
  const [layananMap, setLayananMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [dropdown, setDropdown] = useState({
    open: false,
    x: 0,
    y: 0,
    id: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const qGaleri = query(
        collection(db, "galeri"),
        orderBy("createdAt", "desc"),
      );
      const snapGaleri = await getDocs(qGaleri);

      const galeri = snapGaleri.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const qLayanan = query(collection(db, "layanan"));
      const snapLayanan = await getDocs(qLayanan);

      const layananObj = {};
      snapLayanan.docs.forEach((doc) => {
        layananObj[doc.id] = doc.data().nama;
      });

      setLayananMap(layananObj);
      setGaleriData(galeri);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = galeriData.filter(
    (item) =>
      item.judul?.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <AnimatePresence>
        {openModal && (
          <ModalAddGaleri
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onSuccess={fetchData()}
          />
        )}
      </AnimatePresence>
      <div className="p-2 sm:p-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="">
            <h1 className="judul-admin">Manajemen Galeri</h1>
            <h1 className="subjudul-admin">Kelola Galeri Pada Salon Anda</h1>
          </div>
          <button
            className="bg-[#CB9B00] hover:bg-[#b79833] text-black px-4 py-2 rounded-md"
            onClick={() => setOpenModal(true)}
          >
            + Tambah Galeri
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari galeri..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border border-[#E8DFD7] rounded-md
            focus:outline-none focus:ring-2 focus:ring-[#E8DFD7]"
          />
        </div>

        {/* TABLE */}
        <div className="w-full max-w-full bg-white border rounded-md border-[#E8DFD7] overflow-x-auto shadow-md">
          <div className="w-3 sm:w-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#F5F1ED]">
                <tr>
                  <th className="px-4 py-3 text-center text-sm">Gambar</th>
                  <th className="px-4 py-3 text-left text-sm w-96">Judul</th>
                  <th className="px-4 py-3 text-left text-sm">Kategori</th>
                  <th className="px-4 py-3 text-left text-sm">Tanggal</th>
                  <th className="py-3 text-center text-sm">#</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      Memuat data...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t hover:bg-[#F9F6F2] duration-300"
                    >
                      {/* GAMBAR */}
                      <td className="px-4 py-3 w-16 text-center">
                        <div className="flex justify-center w-full">
                          <div className="relative w-20 h-20 group">
                            <img
                              src={item.gambar}
                              alt={item.judul}
                              className="w-full h-full object-cover rounded-md"
                            />

                            <div
                              onClick={() => setPreviewImage(item.gambar)}
                              className="absolute inset-0 bg-black/40 
                          opacity-0 group-hover:opacity-100 
                          flex items-center justify-center 
                          rounded-md cursor-pointer transition"
                            >
                              <FiEye className="text-white text-xl" />
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* JUDUL + DESKRIPSI */}
                      <td className="px-4 w-64 py-3 align-top">
                        <p className="font-medium">{item.judul}</p>

                        <p className="text-sm sm:w-full w-[25rem] text-gray-500 break-words">
                          {item.deskripsi}
                        </p>
                      </td>

                      {/* KATEGORI BADGE */}
                      <td className="px-4 w-52 py-3">
                        <span className="px-3 py-1 text-xs rounded-full bg-[#ffc400]/40 text-[#725d2f] whitespace-nowrap">
                          {layananMap[item.id_layanan] || "Tidak ada"}
                        </span>
                      </td>

                      {/* TANGGAL */}
                      <td className="w-40 px-4 py-3 whitespace-nowrap">
                        {formatTanggal(item.createdAt)}
                      </td>

                      {/* AKSI */}
                      <td className="w-10 px-2 py-3 text-center">
                        <button
                          onClick={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            setDropdown({
                              open: true,
                              x: rect.right,
                              y: rect.bottom,
                              id: item.id,
                            });
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

        {/* IMAGE PREVIEW MODAL */}
        {previewImage && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setPreviewImage(null)}
          >
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[80%] rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* DROPDOWN */}
        {dropdown.open && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdown({ open: false, x: 0, y: 0, id: null })}
          >
            <div
              className="absolute bg-white border rounded-md shadow-lg w-32 z-50"
              style={{
                top: dropdown.y + 6,
                left: dropdown.x - 130,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => navigate(`/galeri/atur-galeri/${dropdown.id}`)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
                Hapus
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Galeri;
