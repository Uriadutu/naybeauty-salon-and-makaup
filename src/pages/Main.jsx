import React from "react";
import Header from "../components/Header";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import MenuPaket from "./MenuPaket";
import Galeri from "./Galeri";
import Contact from "./Contact";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Home />
      <About />
      <Services />
      <MenuPaket />
      <Galeri />
      <Contact />
      <Footer />
    </div>
  );
};

export default Main;
