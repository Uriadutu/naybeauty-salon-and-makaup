import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Main from './pages/Main';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Layanan from './pages/admin/Layanan';
import Menu from './pages/admin/Menu';
import Paket from './pages/admin/Paket';
import DetailServices from './pages/DetailServices';
import AturMenu from './pages/admin/AturMenu';
import AturGaleri from './pages/admin/AturGaleri';
import Galeri from './pages/admin/Galeri';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/services" element={<Services />} />
            <Route path="/semua-layanan" element={<DetailServices />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* admin */}
            <Route path="/login/ney" element={<Login />} />
            {/* protected */}

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/layanan" element={<Layanan />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/edit-menu/:id/:nama" element={<AturMenu />} />
            <Route path="/paket" element={<Paket />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/galeri/atur-galeri/:id/:judul" element={<AturGaleri />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;