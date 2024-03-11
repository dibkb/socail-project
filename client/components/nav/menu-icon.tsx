// "use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbMenu } from "react-icons/tb";
import menuitems from "../../utils/nav-dropdown-menu";
import { cn } from "@/lib/utils";
export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <TbMenu className="h-8 w-8 text-stone-700 hover:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 border-none bg-stone-800 rounded-xl">
        <DropdownMenuGroup className="flex flex-col">
          {menuitems.map((item, id) => {
            return (
              <DropdownMenuItem
                key={item}
                className={cn(
                  "rounded-none capitalize cursor-pointer py-3 border-stone-700",
                  `${id === menuitems.length - 1 ? `border-none` : `border-b`}`
                )}
              >
                {item}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
