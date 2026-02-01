import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;