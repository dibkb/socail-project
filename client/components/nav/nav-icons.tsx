"use client";
import Link from "next/link";
import React from "react";
interface Navicons {
  active: React.ReactNode;
  inactive: React.ReactNode;
  src: string;
}
import { usePathname } from "next/navigation";
const Navicons = ({ active, inactive, src }: Navicons) => {
  const pathname = usePathname();
  return (
    <Link
      className="h-16 w-20 flex items-center justify-center rounded-lg hover:bg-stone-800 cursor-pointer"
      href={src}
    >
      {pathname.includes(src) ? active : inactive}
    </Link>
  );
};

export default Navicons;
