import React, { CSSProperties } from "react";
import { FaThreads } from "react-icons/fa6";
import { GoHome, GoHomeFill } from "react-icons/go";
import Navicons from "./nav-icons";
const classNames: Record<"active" | "inactive", HTMLElement["className"]> = {
  active: "h-7 w-7",
  inactive: "h-7 w-7 text-stone-600",
};
const Navbar = () => {
  return (
    <nav className="flex justify-between min-h-14 py-1">
      {/* left */}
      <div className="h-16 w-20 flex items-center justify-center">
        <FaThreads className="h-8 w-8 hover:scale-110 cursor-pointer transition-all" />
      </div>
      {/* center */}
      <div className="flex gap-x-1">
        <Navicons
          src={"/"}
          active={<GoHomeFill className={classNames.active} />}
          inactive={<GoHome className={classNames.inactive} />}
        />
        <Navicons
          src={"/search"}
          active={<GoHomeFill className={classNames.active} />}
          inactive={<GoHome className={classNames.inactive} />}
        />
      </div>
      {/* rights */}
      <div></div>
    </nav>
  );
};

export default Navbar;
