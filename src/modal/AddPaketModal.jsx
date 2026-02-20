import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../auth/Firebase";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const AddPaketModal = ({ isOpen, onClose, editingPackage, onSave, namaTombol }) => {
  const [layananList, setLayananList] = useState([]);
  const [menuMap, setMenuMap] = useState({});
  const [expandedService, setExpandedService] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    services: [],
    customPrice: "",
  });

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      const layananSnap = await getDocs(collection(db, "layanan"));
      const layananData = layananSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      const menuSnap = await getDocs(collection(db, "menu_layanan"));
      const map = {};

      menuSnap.forEach((d) => {
        const m = d.data();
        if (!map[m.id_layanan]) map[m.id_layanan] = [];
        map[m.id_layanan].push({
          id: d.id,
          nama: m.nama_menu,
          harga: Number(m.harga_menu),
        });
      });

      setLayananList(layananData);
      setMenuMap(map);
    };

    fetchData();
  }, []);

  /* ================= EDIT MODE ================= */
  useEffect(() => {
    if (editingPackage) {
      setForm({
        ...editingPackage,
        customPrice: editingPackage.finalPrice?.toString() || "",
      });
    }
  }, [editingPackage]);

  /* ================= SERVICE TOGGLE ================= */
  const handleServiceToggle = (id) => {
    const exists = form.services.find((s) => s.id_layanan === id);

    setForm((prev) => ({
      ...prev,
      services: exists
        ? prev.services.filter((s) => s.id_layanan !== id)
        : [...prev.services, { id_layanan: id, selectedMenuItems: [] }],
    }));
  };

  /* ================= MENU TOGGLE ================= */
  const handleMenuToggle = (serviceId, menuId) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.map((s) =>
        s.id_layanan === serviceId
          ? {
              ...s,
              selectedMenuItems: s.selectedMenuItems.includes(menuId)
                ? s.selectedMenuItems.filter((id) => id !== menuId)
                : [...s.selectedMenuItems, menuId],
            }
          : s
      ),
    }));
  };

  /* ================= HITUNG HARGA ================= */
  const calculateBase = () => {
    let harga = 0;

    form.services.forEach((s) => {
      s.selectedMenuItems.forEach((id) => {
        const menu = menuMap[s.id_layanan]?.find((m) => m.id === id);
        if (menu) {
          harga += menu.harga;
        }
      });
    });

    return { harga };
  };

  const { harga: basePrice } = calculateBase();
  const finalPrice = form.customPrice
    ? Number(form.customPrice)
    : basePrice;

  /* ================= SAVE ================= */
  const handleSubmit = async () => {
    if (!form.name) return alert("Nama paket wajib diisi");
    if (form.services.length === 0)
      return alert("Pilih minimal satu layanan");

    const payload = {
      name: form.name,
      description: form.description,
      services: form.services,
      basePrice,
      finalPrice,
      createdAt: new Date().toISOString(),
      isLaris : false
    };

    if (editingPackage) {
      await updateDoc(doc(db, "paket", editingPackage.id), payload);
    } else {
      await addDoc(collection(db, "paket"), payload);
    }

    onSave && onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 px-4 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingPackage ? "Edit Paket" : "Tambah Paket"}
        </h2>

        {/* NAMA */}
        <input
          className="w-full border rounded p-2 mb-3"
          placeholder="Nama Paket"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* DESKRIPSI */}
        <textarea
          className="w-full border rounded p-2 mb-4"
          placeholder="Deskripsi Paket"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* LAYANAN */}
        <div className="space-y-3">
          {layananList
            .filter((l) => menuMap[l.id]?.length)
            .map((service) => {
              const selected = form.services.find(
                (s) => s.id_layanan === service.id
              );

              return (
                <div key={service.id}>
                  <div
                    onClick={() => handleServiceToggle(service.id)}
                    className={`flex justify-between items-center p-3 rounded cursor-pointer
                    ${
                      selected
                        ? "bg-amber-50 border border-amber-400"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex gap-2">
                      <input type="checkbox" readOnly checked={!!selected} />
                      {service.nama}
                    </div>

                    {selected && (
                      <ChevronDown
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedService(
                            expandedService === service.id
                              ? null
                              : service.id
                          );
                        }}
                      />
                    )}
                  </div>

                  {selected && expandedService === service.id && (
                    <div className="ml-6 mt-2 space-y-2 border-l-2 pl-3">
                      {menuMap[service.id].map((m) => (
                        <label
                          key={m.id}
                          className="flex justify-between text-sm"
                        >
                          <div className="flex gap-2">
                            <input
                              type="checkbox"
                              checked={selected.selectedMenuItems.includes(
                                m.id
                              )}
                              onChange={() =>
                                handleMenuToggle(service.id, m.id)
                              }
                            />
                            {m.nama}
                          </div>
                          <span>
                            Rp{m.harga.toLocaleString("id-ID")}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* HARGA */}
        <div className="mt-6 space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Harga Dasar</span>
            <span>Rp{basePrice.toLocaleString("id-ID")}</span>
          </div>

          <input
            type="number"
            placeholder="Harga Final (opsional)"
            className="w-full border rounded p-2"
            value={form.customPrice}
            onChange={(e) =>
              setForm({ ...form, customPrice: e.target.value })
            }
          />

          <div className="flex justify-between font-semibold">
            <span>Harga Digunakan</span>
            <span className="text-amber-600">
              Rp{finalPrice.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border rounded py-2"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-amber-600 text-white rounded py-2"
          >
            {namaTombol}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddPaketModal;
