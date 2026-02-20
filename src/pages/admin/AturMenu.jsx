import React, { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import { AnimatePresence } from "framer-motion";
import AddMenuLayananModal from "../../modal/AddMenuLayananModal";
import EditMenuLayananModal from "../../modal/EditMenuLayananModal";
import { RiMoreLine } from "react-icons/ri";

import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../auth/Firebase";
import { useParams } from "react-router-dom";
import { formatRupiah } from "../../utils/helper";

const AturMenu = () => {
  const { id, nama } = useParams(); // 🔥 id_layanan dari URL

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async (id_layanan) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "menu_layanan"),
        where("id_layanan", "==", id_layanan),
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMenuData(data);
    } catch (error) {
      console.error("Gagal fetch menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu(id);
  }, [id]);

  const [dropdown, setDropdown] = useState({
    open: false,
    x: 0,
    y: 0,
    id: null,
  });

  const handleDelete = async (menuId) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus menu ini?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "menu_layanan", menuId));
      fetchMenu(id);
    } catch (error) {
      console.error("Gagal hapus:", error);
    }
  };

  return (
    <Layout>
      <AnimatePresence>
        {openModalAdd && (
          <AddMenuLayananModal
            isOpen={openModalAdd}
            onClose={() => setOpenModalAdd(false)}
            onSuccess={fetchMenu}
          />
        )}

        {openModalEdit && selectedMenu && (
          <EditMenuLayananModal
            isOpen={openModalEdit}
            onClose={() => setOpenModalEdit(false)}
            onSuccess={fetchMenu}
            data={selectedMenu}
          />
        )}
      </AnimatePresence>

      <div className="p-2 sm:p-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="">
            <h1 className="judul-admin">
              Manajemen Layanan : {nama}
            </h1>
            <h1 className="subjudul-admin">
              Kelola Menu Untuk Salon Anda
            </h1>
          </div>

          <button
            className="bg-[#CB9B00] hover:bg-[#b79833] text-black px-4 py-2 rounded-md"
            onClick={() => setOpenModalAdd(true)}
          >
            + Tambah Menu
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-md shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F1ED]">
              <tr>
                <th className="px-6 py-3 text-left">Nama Menu</th>
                <th className="px-6 py-3 text-left">Harga</th>
                <th className="px-6 p-0 w-0 text-center">#</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-6">
                    Memuat data...
                  </td>
                </tr>
              ) : menuData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6">
                    Belum ada menu
                  </td>
                </tr>
              ) : (
                menuData.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{item.nama_menu}</td>
                    <td className="px-6 py-3">
                      {formatRupiah(item.harga_menu)}
                    </td>
                    <td className="px-2 py-3 text-center">
                      <button
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
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
      {dropdown.open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdown({ open: false, x: 0, y: 0, id: null })}
        >
          <div
            className="absolute bg-white border rounded-md shadow-lg w-32 z-50"
            style={{
              top: dropdown.y + 6,
              left: dropdown.x - 120,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* EDIT */}
            <button
              onClick={() => {
                const menu = menuData.find((item) => item.id === dropdown.id);
                setSelectedMenu(menu);
                setOpenModalEdit(true);
                setDropdown({ open: false, x: 0, y: 0, id: null });
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              Edit
            </button>
            {/* HAPUS */}
            <button
              onClick={() => {
                handleDelete(dropdown.id);
                setDropdown({ open: false, x: 0, y: 0, id: null });
              }}
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

export default AturMenu;
