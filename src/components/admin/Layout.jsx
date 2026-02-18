import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F1ED] flex font-crimson font-extralight">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar setIsOpen={setIsOpen} />

        {/* Content */}
        <main className="p-2 sm:p-2 sm:pl-64">
          <div className=" sm:px-6  min-h-[calc(100vh-120px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
