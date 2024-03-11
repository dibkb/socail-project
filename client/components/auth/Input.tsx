import React from "react";
import { Input } from "../ui/input";
interface Forminput {
  //   field: any;
  placeholder: HTMLInputElement["placeholder"];
  type?: HTMLInputElement["type"];
}
const Forminput = ({ placeholder, type = "text" }: Forminput) => {
  return (
    <Input
      placeholder={placeholder}
      //   {...field}
      className="focus-visible:ring-stone-700 py-8 bg-stone-900 rounded-xl"
      type={type}
    />
  );
};

export default Forminput;
