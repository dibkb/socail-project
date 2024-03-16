"use client";
import Link from "next/link";
import React, { useMemo } from "react";
interface Navicons {
  active: React.ReactNode;
  inactive: React.ReactNode;
  src: string;
}
import { usePathname } from "next/navigation";
const Navicons = ({ active, inactive, src }: Navicons) => {
  const pathname = usePathname();
  const hightlight: boolean = useMemo(() => {
    if (src === "/") {
      if (pathname === "/") return true;
    } else {
      if (pathname.includes(src)) return true;
    }
    return false;
  }, [pathname, src]);
  return (
    <Link
      className="h-16 w-20 flex items-center justify-center rounded-lg hover:bg-stone-800 cursor-pointer"
      href={src}
    >
      {hightlight ? active : inactive}
    </Link>
  );
};

export default Navicons;
