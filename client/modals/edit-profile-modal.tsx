"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Modallayout from "./modal-layout";
import styles from "../styles/edit-profile-modal";
import { useUserStore } from "@/src/providers/user-store-provider";
import Editprofileinput from "@/components/profile/edit-profile-input";
import { Button } from "@/components/ui/button";
import Editprofileitems from "./edit-profile-values";
import { User } from "@/src/stores/user-store";
import AvatarForm from "@/components/home/avatar";
interface EditProfilePortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const label = {
  name: "Edit Name",
  username: "Edit Username",
  bio: "Edit Bio",
};
type UserKeys = Exclude<
  keyof User,
  "id" | "email" | "profilePic" | "followingIds" | "followerIds"
>;
export type openModal = UserKeys | false;
const EditProfilePortal = ({ setOpen }: EditProfilePortal) => {
  const { user } = useUserStore((state) => state);
  const [openEdit, setEdit] = useState<openModal>(false);
  // const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  // const imageRef = useRef(null);
  return (
    <Modallayout setOpen={setOpen} closeOnClick={!openEdit}>
      <div className="border" style={styles.container}>
        <span className="flex justify-between">
          <Editprofileinput
            classname="grow"
            placeholder={"Name"}
            value={user?.name}
            onClick={() => setEdit("name")}
          />
          <AvatarForm className="w-20 h-20 cursor-pointer" variant="self" />
        </span>
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
          onClick={() => setOpen(false)}
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
