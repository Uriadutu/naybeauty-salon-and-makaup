import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Main from "./pages/Main";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Layanan from "./pages/admin/Layanan";
import Menu from "./pages/admin/Menu";
import Paket from "./pages/admin/Paket";
import DetailServices from "./pages/DetailServices";
import AturMenu from "./pages/admin/AturMenu";
import AturGaleri from "./pages/admin/AturGaleri";
import Galeri from "./pages/admin/Galeri";
import Reservasi from "./pages/Reservasi";
import DetailGaleri from "./pages/DetailGaleri";
import DetailPaket from "./pages/DetailPaket";
import ProtectedRoute from "./pages/ProtectRoute";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/services" element={<Services />} />
            <Route path="/semua-layanan" element={<DetailServices />} />
            <Route path="/semua-galeri" element={<DetailGaleri />} />
            <Route path="/semua-paket" element={<DetailPaket />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservasi" element={<Reservasi />} />
            {/* admin */}
            <Route path="/login/ney" element={<Login />} />
            {/* protected */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/layanan"
              element={
                <ProtectedRoute>
                  <Layanan />
                </ProtectedRoute>
              }
            />

            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <Menu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/menu/edit-menu/:id/:nama"
              element={
                <ProtectedRoute>
                  <AturMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/paket"
              element={
                <ProtectedRoute>
                  <Paket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/galeri"
              element={
                <ProtectedRoute>
                  <Galeri />
                </ProtectedRoute>
              }
            />
            <Route
              path="/galeri/atur-galeri/:id/:judul"
              element={
                <ProtectedRoute>
                  <AturGaleri />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
