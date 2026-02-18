import  { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import { RiMoreLine } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../auth/Firebase";
import { truncateChars } from "../../utils/helper";
import DetailLayananModal from "../../modal/DetailLayananModal";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [search, setSearch] = useState("");
  const [layananData, setLayananData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataDetail, setDataDetail] = useState({});
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [dropdown, setDropdown] = useState({
    open: false,
    x: 0,
    y: 0,
    id: null,
  });


  const navigate = useNavigate();

  const fetchLayanan = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "layanan"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLayananData(data);
    } catch (error) {
      console.error("Gagal fetch layanan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLayanan();
  }, []);

  // 🔍 FILTER SEARCH
  const filteredData = layananData.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDetail = (data) => {
    setDropdown({ open: false, x: 0, y: 0, id: null });
    setDataDetail(data);
    setOpenModalDetail(true);
  };

  return (
    <Layout>
      <AnimatePresence>
        {openModalDetail && (
          <DetailLayananModal
            isOpen={openModalDetail}
            onClose={() => setOpenModalDetail(false)}
            dataDetail={dataDetail}
          />
        )}
      </AnimatePresence>
      <div className="p-4 sm:p-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="">

          <h1 className="judul-admin">Manajemen Menu</h1>
          <h1 className="subjudul-admin">Kelola Menu Pada Salon Anda</h1>
            </div>
        </div>

        {/* SEARCH */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border border-[#E8DFD7] rounded-md
            focus:outline-none focus:ring-2 focus:ring-[#E8DFD7]"
          />
        </div>

        {/* TABLE */}
        <div className="w-full bg-white max-w-full border rounded-md border-[#E8DFD7]  overflow-x-auto shadow-md">
          <div className="sm:w-auto w-10">
            <table className="w-full border-collapse">
              <thead className="bg-[#F5F1ED]  ">
                <tr>
                  <th className="px-7 py-3 text-left text-sm font-medium whitespace-nowrap">
                    Nama Layanan
                  </th>
                  <th className="px-7 py-3 text-left text-sm font-medium">
                    Deskripsi
                  </th>
                  <th className="py-3 text-center text-sm font-medium w-0 p-0">
                    #
                  </th>
                </tr>
              </thead>

              <tbody className="">
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-7 py-6 text-center text-gray-500"
                    >
                      Memuat data...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-7 py-6 text-center text-gray-500"
                    >
                      Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={item.id} className="border-t hover:bg-[#F5F1ED] duration-300">
                      <td className="px-7 py-3 whitespace-nowrap">
                        {item.nama}
                      </td>
                      <td className="px-7 py-3 whitespace-nowrap">
                        {truncateChars(item.deskripsi, 20)}
                      </td>
                      <td className="px-2 py-3 text-center">
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

        {/* DROPDOWN */}
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
                onClick={() =>
                  navigate(`/menu/edit-menu/${dropdown.id}/${filteredData.find((item) => item.id === dropdown.id).nama}`)
                }
                className="w-full text-left px-3 py-2  hover:bg-gray-100"
              >
                Atur Menu
              </button>
              <button
                onClick={() =>
                  handleDetail(
                    filteredData.find((item) => item.id === dropdown.id),
                  )
                }
                className="w-full text-left px-3 py-2  hover:bg-gray-100"
              >
                Detail
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Menu;
