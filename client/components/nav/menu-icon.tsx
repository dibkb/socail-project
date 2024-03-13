"use client";
import { TbMenu } from "react-icons/tb";
import menuitems from "../../utils/nav-dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
export function DropdownMenu() {
  const [showMenu, setShowMenu] = useState(false);
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
            {menuitems.map((item, id) => {
              return (
                <span
                  key={item}
                  className={cn(
                    "rounded-none capitalize cursor-pointer py-3 border-stone-700 hover:bg-stone-700 px-4",
                    `${
                      id === menuitems.length - 1
                        ? `border-none rounded-b-xl`
                        : `border-b`
                    }`,
                    `${id === 0 && `rounded-t-xl`}`
                  )}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
