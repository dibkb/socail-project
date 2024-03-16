"use client";
import { Dispatch, SetStateAction } from "react";
import Modallayout from "./modal-layout";
import styles from "../styles/edit-profile-modal";
import { useUserStore } from "@/src/providers/user-store-provider";
import Editprofileinput from "@/components/profile/edit-profile-input";
interface EditProfilePortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const EditProfilePortal = ({ setOpen }: EditProfilePortal) => {
  const { user, setUser } = useUserStore((state) => state);
  return (
    <Modallayout setOpen={setOpen}>
      <div className="border" style={styles.container}>
        <Editprofileinput
          placeholder={"Name"}
          value={user?.name}
          onClick={() => {}}
        />
        <Editprofileinput
          placeholder={"Username"}
          value={user?.username}
          onClick={() => {}}
        />
        <Editprofileinput
          placeholder={"Bio"}
          value={user?.bio}
          onClick={() => {}}
        />
      </div>
    </Modallayout>
  );
};
export default EditProfilePortal;
