import React from "react";
import Navicons from "./nav-icons";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { cn } from "@/lib/utils";
const classNames: Record<"active" | "inactive", HTMLElement["className"]> = {
  active: "h-7 w-7",
  inactive: "h-7 w-7 text-stone-600",
};
interface NavbarCenter {
  className?: HTMLElement["className"];
}
const NavbarCenter = ({ className }: NavbarCenter) => {
  return (
    <div className={cn("flex gap-x-1 justify-between", className)}>
      <Navicons
        src={"/"}
        active={<GoHomeFill className={classNames.active} />}
        inactive={<GoHome className={classNames.inactive} />}
      />
      <Navicons
        src={"/search"}
        active={<IoSearchOutline className={classNames.active} />}
        inactive={<IoSearchOutline className={classNames.inactive} />}
      />
      <Navicons
        src={"/post"}
        active={<HiOutlinePencilSquare className={classNames.active} />}
        inactive={<HiOutlinePencilSquare className={classNames.inactive} />}
      />
      <Navicons
        src={"/activity"}
        active={<IoMdHeart className={classNames.active} />}
        inactive={<IoMdHeartEmpty className={classNames.inactive} />}
      />
      <Navicons
        src={"/profile"}
        active={<CiUser className={classNames.active} />}
        inactive={<CiUser className={classNames.inactive} />}
      />
    </div>
  );
};

export default NavbarCenter;
