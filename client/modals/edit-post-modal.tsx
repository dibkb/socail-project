import React, { Dispatch, SetStateAction } from "react";
import Modallayout from "./modal-layout";
interface Editpostmodal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const Editpostmodal = ({ setOpen }: Editpostmodal) => {
  return (
    <Modallayout setOpen={setOpen}>
      <div className="border">Editpost</div>
    </Modallayout>
  );
};

export default Editpostmodal;
