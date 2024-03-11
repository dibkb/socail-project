import React from "react";
import { FaThreads } from "react-icons/fa6";
const Navbar = () => {
  return (
    <nav className="p-2">
      {/* left */}
      <div>
        <FaThreads className="h-8 w-8 hover:scale-110 cursor-pointer" />
      </div>
      {/* center */}
      <div></div>
      {/* rights */}
      <div></div>
    </nav>
  );
};

export default Navbar;
