import { cn } from "@/lib/utils";
import React from "react";
interface Editprofileinput {
  placeholder: string;
  classname?: string;
  value?: string;
  onClick: () => void;
}
const Editprofileinput = ({
  placeholder,
  classname,
  value,
  onClick,
}: Editprofileinput) => {
  return (
    <div
      className={cn("flex flex-col gap-y-1 border-b cursor-pointer", classname)}
      onClick={onClick}
      style={{ paddingBottom: ".8rem", borderColor: "#262626" }}
    >
      <p className="font-medium text-sm">{placeholder}</p>
      <p className="">{value}</p>
    </div>
  );
};

export default Editprofileinput;
