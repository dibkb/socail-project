import React from "react";
import { FaThreads } from "react-icons/fa6";
const Navbar = () => {
  return (
    <nav className="py-4 px-6">
      {/* left */}
      <div>
        <FaThreads className="h-8 w-8 hover:scale-110 cursor-pointer transition-all" />
      </div>
      {/* center */}
      <div></div>
      {/* rights */}
      <div></div>
    </nav>
  );
};

export default Navbar;
