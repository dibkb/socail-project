"use client";
import { Dispatch, SetStateAction } from "react";
import Modallayout from "./modal-layout";
import styles from "../styles/edit-profile-modal";
import { useUserStore } from "@/src/providers/user-store-provider";
import Editprofileinput from "@/components/profile/edit-profile-input";
import { Button } from "@/components/ui/button";
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
    </Modallayout>
  );
};
export default EditProfilePortal;
