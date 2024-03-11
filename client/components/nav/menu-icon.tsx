import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbMenu } from "react-icons/tb";
import menuitems from "../../utils/nav-dropdown-menu";
export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <TbMenu className="h-8 w-8 text-stone-700 hover:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-none bg-stone-800">
        <DropdownMenuGroup className="flex flex-col gap-y-3">
          {menuitems.map((item) => (
            <DropdownMenuItem key={item} className="capitalize">
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
