"use client";
import React from "react";
import { FaThreads } from "react-icons/fa6";
import { DropdownMenu } from "./menu-icon";
import { useIsBelowWidth } from "@/hooks/isBelowWidth";
import NavbarCenter from "./center-nav";
import Link from "next/link";
const Navbar = () => {
  const { isBelowWidth, loading } = useIsBelowWidth(600);
  const right = (
    <div className="flex items-center justify-center h-16 w-20">
      <DropdownMenu />
    </div>
  );
  const left = (
    <Link className="h-16 w-20 flex items-center justify-center" href={"/"}>
      <FaThreads className="h-8 w-8 hover:scale-110 cursor-pointer transition-all" />
    </Link>
  );
  let NAVBAR;
  if (!loading) {
    if (isBelowWidth) {
      NAVBAR = (
        <>
          <nav className="flex justify-between min-h-14 py-1 bg-stone-950 w-full fixed z-50">
            {left}
            {right}
          </nav>
          <NavbarCenter className="fixed bg-stone-950 z-50 bottom-0 w-full" />
        </>
      );
    } else {
      NAVBAR = (
        <nav className="flex justify-between min-h-14 py-1 bg-stone-950 w-full fixed z-50">
          {left}
          <NavbarCenter />
          {right}
        </nav>
      );
    }
    return NAVBAR;
  } else
    return (
      <nav className="flex justify-between min-h-14 p-2 w-full fixed z-50 bg-stone-900 animate-pulse "></nav>
    );
};

export default Navbar;
