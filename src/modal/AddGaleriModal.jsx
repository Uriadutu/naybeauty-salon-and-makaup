import React, { useEffect, useState } from "react";
import { db } from "../auth/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const ModalAddGaleri = ({ isOpen, onClose, onSuccess }) => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [idLayanan, setIdLayanan] = useState("");
  const [kategoriBaru, setKategoriBaru] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [layananList, setLayananList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch layanan
  useEffect(() => {
    const fetchLayanan = async () => {
      const snapshot = await getDocs(
        query(collection(db, "layanan"), orderBy("createdAt", "asc")),
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLayananList(data);
    };

    fetchLayanan();
  }, []);

  if (!isOpen) return null;

  // 🔥 Preview gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 Upload ke Cloudinary
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "gambar");
    data.append("cloud_name", "ds2woakhp");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ds2woakhp/image/upload",
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async () => {
    if (!judul || !deskripsi || !selectedFile) {
      alert("Semua field wajib diisi.");
      return;
    }

    if (!idLayanan && !kategoriBaru) {
      alert("Pilih atau isi kategori.");
      return;
    }

    setLoading(true);

    try {
      const imageURL = await uploadToCloudinary(selectedFile);

      await addDoc(collection(db, "galeri"), {
        judul,
        deskripsi,
        id_layanan: idLayanan || null,
        kategori_custom: kategoriBaru || null,
        gambar: imageURL,
        createdAt: new Date(),
      });

      onSuccess && onSuccess();
      // reset
      setJudul("");
      setDeskripsi("");
      setIdLayanan("");
      setKategoriBaru("");
      setSelectedFile(null);
      setPreview(null);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Tambah Galeri</h2>

        {/* Upload Gambar */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3 w-full"
        />

        {/* Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Judul */}
        <input
          type="text"
          placeholder="Judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        {/* Deskripsi */}
        <textarea
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        {/* Dropdown Kategori */}
        <select
          value={idLayanan}
          onChange={(e) => {
            setIdLayanan(e.target.value);
          }}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        >
          <option value="">Pilih Kategori Layanan</option>
          {layananList.map((layanan) => (
            <option key={layanan.id} value={layanan.id}>
              {layanan.nama}
            </option>
          ))}
        </select>

        {/* Button */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-[#AD9052] text-white"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddGaleri;
