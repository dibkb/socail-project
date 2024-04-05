"use client";
import { TbMenu } from "react-icons/tb";
import { useState } from "react";
import { useUserStore } from "@/src/providers/user-store-provider";
import { logoutUser } from "@/actions/logout";
import { useRouter } from "next/navigation";
export function DropdownMenu() {
  const router = useRouter();
  const { setUser } = useUserStore((state) => state);
  const [showMenu, setShowMenu] = useState(false);
  const logoutHandler = async () => {
    logoutUser()
      .then((r) => {
        if (r.data) {
          router.push("/auth/login");
          setUser(null);
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="relative z-100">
      <span
        className="cursor-pointer"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <TbMenu className="h-8 w-8 text-stone-700 hover:text-white" />
      </span>
      {showMenu && (
        <div className="w-44 border-none bg-stone-800 rounded-xl absolute top-8 right-0 select-none z-50">
          <div className="flex flex-col">
            <span
              onClick={logoutHandler}
              className={
                "capitalize rounded-xl cursor-pointer py-3 border-stone-700 hover:bg-stone-700 px-4"
              }
            >
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
