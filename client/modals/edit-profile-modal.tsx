import { Dispatch, SetStateAction } from "react";
import Modallayout from "./modal-layout";

interface EditProfilePortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const EditProfilePortal = ({ setOpen }: EditProfilePortal) => {
  return (
    <Modallayout setOpen={setOpen}>
      <div className="border bg-stone-800">fsdf</div>
    </Modallayout>
  );
};
export default EditProfilePortal;
