import { useEffect, useState } from "react";
import { db } from "../auth/Firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

import HeaderDetail from "../components/HeaderDetail";

const DetailGaleri = () => {
  const [galeriData, setGaleriData] = useState([]);
  const [layananMap, setLayananMap] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 🔹 ambil data galeri
      const qGaleri = query(
        collection(db, "galeri"),
        orderBy("createdAt", "desc"),
      );
      const snapGaleri = await getDocs(qGaleri);

      const galeri = snapGaleri.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🔹 ambil data layanan
      const qLayanan = query(collection(db, "layanan"));
      const snapLayanan = await getDocs(qLayanan);

      const layananObj = {};
      snapLayanan.docs.forEach((doc) => {
        layananObj[doc.id] = doc.data().nama;
      });

      setGaleriData(galeri);
      setLayananMap(layananObj);
    } catch (error) {
      console.error("Gagal fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <HeaderDetail />
       <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <img
                src={selectedImage.gambar}
                alt={selectedImage.judul}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />

              {/* Title */}
              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-4 rounded-b-xl">
                <h3 className="text-lg font-semibold">
                  {layananMap[selectedImage.id_layanan] || "Layanan"}
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black px-3 py-1 rounded-full text-sm"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <section id="services">
        <div className="py-16 px-4 sm:px-8 bg-[#FFE8DA]">
          <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="col-span-3 text-center">Memuat galeri...</p>
            ) : galeriData.length === 0 ? (
              <p className="col-span-3 text-center">Belum ada galeri</p>
            ) : (
              galeriData.map((item) => (
               <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition duration-500 cursor-pointer"
              >
                  {/* Image */}
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-[300px] object-cover transform group-hover:scale-110 transition duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold tracking-wide">
                      {layananMap[item.id_layanan] || "Layanan"}
                    </h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailGaleri;
