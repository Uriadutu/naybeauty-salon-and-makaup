import React, { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../auth/Firebase";
import { FaSpa, FaList, FaBoxOpen, FaImages } from "react-icons/fa";

const Dashboard = () => {
  const [layananCount, setLayananCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);
  const [paketCount, setPaketCount] = useState(0);
  const [galeriCount, setGaleriCount] = useState(0);

  useEffect(() => {
    const unsubLayanan = onSnapshot(collection(db, "layanan"), (snap) => {
      setLayananCount(snap.size);
    });

    const unsubMenu = onSnapshot(collection(db, "menu_layanan"), (snap) => {
      setMenuCount(snap.size);
    });

    const unsubPaket = onSnapshot(collection(db, "paket"), (snap) => {
      setPaketCount(snap.size);
    });

    const unsubGaleri = onSnapshot(collection(db, "galeri"), (snap) => {
      setGaleriCount(snap.size);
    });

    return () => {
      unsubLayanan();
      unsubMenu();
      unsubPaket();
      unsubGaleri();
    };
  }, []);

  const cards = [
    {
      title: "Total Layanan",
      value: layananCount,
      icon: <FaSpa size={26} />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Menu Layanan",
      value: menuCount,
      icon: <FaList size={26} />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total Paket",
      value: paketCount,
      icon: <FaBoxOpen size={26} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Galeri",
      value: galeriCount,
      icon: <FaImages size={26} />,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Admin
          </h1>
          <p className="text-gray-500">
            Ringkasan data Nay Beauty Salon
          </p>
        </div>

        {/* STAT CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h2 className="text-2xl font-bold">{card.value}</h2>
              </div>

              <div
                className={`p-3 rounded-lg ${card.color}`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* WELCOME PANEL */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">
            Selamat Datang Ney Cantikkkk!
          </h2>
          <p className="text-gray-500">
            Gunakan dashboard ini untuk mengelola layanan, paket, menu layanan,
            dan galeri Nay Beauty Salon.
          </p>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;