"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Modallayout from "./modal-layout";
import styles from "../styles/edit-profile-modal";
import { useUserStore } from "@/src/providers/user-store-provider";
import Editprofileinput from "@/components/profile/edit-profile-input";
import { Button } from "@/components/ui/button";
import Editprofileitems from "./edit-profile-values";
import { User } from "@/src/stores/user-store";
interface EditProfilePortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const label = {
  name: "Edit Name",
  username: "Edit Username",
  bio: "Edit Bio",
};
type UserKeys = Exclude<keyof User, "id" | "email" | "profilePic">;
export type openModal = UserKeys | false;
const EditProfilePortal = ({ setOpen }: EditProfilePortal) => {
  const { user, setUser } = useUserStore((state) => state);
  const [openEdit, setEdit] = useState<openModal>(false);
  return (
    <Modallayout setOpen={setOpen} closeOnClick={!openEdit}>
      <div className="border" style={styles.container}>
        <Editprofileinput
          placeholder={"Name"}
          value={user?.name}
          onClick={() => setEdit("name")}
        />
        <Editprofileinput
          placeholder={"Username"}
          value={user?.username}
          onClick={() => setEdit("username")}
        />
        <Editprofileinput
          placeholder={"Bio"}
          value={user?.bio}
          onClick={() => setEdit("bio")}
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
      {openEdit && user && (
        <Editprofileitems
          setOpen={setEdit}
          label={label[openEdit]}
          value={user[openEdit]}
        />
      )}
    </Modallayout>
  );
};
export default EditProfilePortal;
