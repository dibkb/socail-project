"use client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
interface Navicons {
  active: React.ReactNode;
  inactive: React.ReactNode;
  src: string;
}
import { usePathname } from "next/navigation";
import ThreadformPortal from "@/modals/thread-modal";
const Navicons = ({ active, inactive, src }: Navicons) => {
  const [openThreadModal, setOpenThreadModal] = useState(false);
  const pathname = usePathname();
  const hightlight: boolean = useMemo(() => {
    if (src === "/") {
      if (pathname === "/") return true;
    } else {
      if (pathname.includes(src)) return true;
    }
    return false;
  }, [pathname, src]);
  if (src === "/post")
    return (
      <>
        <span
          className="h-16 w-20 flex items-center justify-center rounded-lg hover:bg-stone-800 cursor-pointer"
          onClick={() => setOpenThreadModal(true)}
        >
          {hightlight ? active : inactive}
        </span>
        {openThreadModal && <ThreadformPortal setOpen={setOpenThreadModal} />}
      </>
    );
  return (
    <>
      <Link
        className="h-16 w-20 flex items-center justify-center rounded-lg hover:bg-stone-800 cursor-pointer"
        href={src}
      >
        {hightlight ? active : inactive}
      </Link>
    </>
  );
};

export default Navicons;
