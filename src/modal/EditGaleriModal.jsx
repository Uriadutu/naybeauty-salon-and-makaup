import { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import { db } from "../../auth/Firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const EditGaleri = (id) => {
  const navigate = useNavigate();

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambarLama, setGambarLama] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Ambil data galeri
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "galeri", id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setJudul(data.judul);
        setDeskripsi(data.deskripsi);
        setGambarLama(data.gambar);
        setPreview(data.gambar);
      }
    };

    fetchData();
  }, [id]);

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
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (!judul || !deskripsi) {
      alert("Field tidak boleh kosong");
      return;
    }

    setLoading(true);

    try {
      let imageURL = gambarLama;

      // 🔥 kalau ada gambar baru
      if (selectedFile) {
        imageURL = await uploadToCloudinary(selectedFile);
      }

      await updateDoc(doc(db, "galeri", id), {
        judul,
        deskripsi,
        gambar: imageURL,
        updatedAt: new Date(),
      });

      alert("Galeri berhasil diperbarui!");
      navigate("/galeri");
    } catch (error) {
      console.error(error);
      alert("Gagal update data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">
          Edit Galeri
        </h1>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        {/* Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />

        {/* Judul */}
        <input
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        {/* Deskripsi */}
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-[#AD9052] text-white px-4 py-2 rounded-lg"
        >
          {loading ? "Menyimpan..." : "Update"}
        </button>
      </div>
    </Layout>
  );
};

export default EditGaleri;