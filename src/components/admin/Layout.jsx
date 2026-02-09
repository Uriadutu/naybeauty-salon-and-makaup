import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFE8DA] flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar setIsOpen={setIsOpen} />

        {/* Content */}
        <main className="p-6">
          <div className="bg-[#FFF9EB] rounded-xl p-6 shadow-sm min-h-[calc(100vh-120px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
