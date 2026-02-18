import React, { useState } from 'react';
import { db } from '../../auth/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/admin/Layout';

const Galeri = () => {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [stok, setStok] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // file dipilih, belum diupload
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Simpan file saat dipilih, belum upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Upload ke Cloudinary dan kembalikan URL
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "gambar"); // pastikan preset ini tersedia
    data.append("cloud_name", "ds2woakhp");

    const res = await fetch("https://api.cloudinary.com/v1_1/ds2woakhp/image/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.secure_url;
  };

  // Simpan ke Firestore setelah upload ke Cloudinary
  const handleSubmit = async () => {
    if (!judul || !deskripsi || !stok || !selectedFile) {
      alert("Semua data wajib diisi dan gambar harus dipilih.");
      return;
    }

    const parsedStok = parseInt(stok);
    if (isNaN(parsedStok)) {
      alert("Stok harus berupa angka.");
      return;
    }

    setLoading(true);

    try {
      const imageURL = await uploadToCloudinary(selectedFile);

      await addDoc(collection(db, "galeri"), {
        judul,
        deskripsi,
        stok: parsedStok,
        gambar: imageURL,
        createdAt: new Date(),
      });

      alert("Data berhasil disimpan ke Firebase!");
      // Reset form
      setJudul('');
      setDeskripsi('');
      setStok('');
      setSelectedFile(null);
      navigate('/');
    } catch (error) {
      console.error("Gagal menyimpan:", error.message);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Form Upload Gambar ke Firebase</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} /><br /><br />

      {selectedFile && (
        <p>File terpilih: <strong>{selectedFile.name}</strong></p>
      )}

      <input
        type="text"
        placeholder="Judul Gambar"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <textarea
        placeholder="Deskripsi"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <input
        type="number"
        placeholder="Stok"
        value={stok}
        onChange={(e) => setStok(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      /><br /><br />

      <button onClick={handleSubmit} style={{ padding: "10px 20px" }} disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan ke Firebase"}
      </button>
    </div>
    </Layout>
  );
};

export default Galeri;