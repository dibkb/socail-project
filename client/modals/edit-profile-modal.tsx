"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Modallayout from "./modal-layout";
import styles from "../styles/edit-profile-modal";
import { useUserStore } from "@/src/providers/user-store-provider";
import Editprofileinput from "@/components/profile/edit-profile-input";
import { Button } from "@/components/ui/button";
import Editprofileitems from "./edit-profile-values";
interface EditProfilePortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const EditProfilePortal = ({ setOpen }: EditProfilePortal) => {
  const { user, setUser } = useUserStore((state) => state);
  const [openEdit, setEdit] = useState(false);
  return (
    <Modallayout setOpen={setOpen} closeOnClick={!openEdit}>
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
          onClick={() => setEdit(true)}
        />
        <Button
          className="rounded-lg"
          style={{
            padding: "1.5rem",
            fontWeight: 500,
          }}
        >
          Done
        </Button>
      </div>
      {openEdit && (
        <Editprofileitems
          setOpen={setEdit}
          label="Edit bio"
          value={user?.bio || ""}
        />
      )}
    </Modallayout>
  );
};
export default EditProfilePortal;
