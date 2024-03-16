import React from "react";
interface Editprofileinput {
  placeholder: string;
  value?: string;
  onClick: () => void;
}
const Editprofileinput = ({
  placeholder,
  value,
  onClick,
}: Editprofileinput) => {
  return (
    <div
      className="flex flex-col gap-y-1 border-b cursor-pointer"
      onClick={onClick}
      style={{ paddingBottom: ".8rem", borderColor: "#262626" }}
    >
      <p className="font-medium text-sm">{placeholder}</p>
      <p className="">{value}</p>
    </div>
  );
};

export default Editprofileinput;
