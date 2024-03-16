"use client";
import { Dispatch, SetStateAction } from "react";
import Modallayout from "./modal-layout";
import styles from "../styles/edit-profile-modal";
import { useUserStore } from "@/src/providers/user-store-provider";
interface EditProfilePortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const EditProfilePortal = ({ setOpen }: EditProfilePortal) => {
  const { user, setUser } = useUserStore((state) => state);
  return (
    <Modallayout setOpen={setOpen}>
      <div className="border" style={styles.container}>
        <div
          className="flex flex-col gap-y-1 border-b"
          style={{ paddingBottom: ".8rem", borderColor: "#262626" }}
        >
          <p className="font-medium text-sm">Name</p>
          <p className="">{user?.name}</p>
        </div>
      </div>
    </Modallayout>
  );
};
export default EditProfilePortal;
