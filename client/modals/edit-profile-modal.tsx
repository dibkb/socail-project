"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Modallayout from "./modal-layout";
import styles from "../styles/edit-profile-modal";
import { useUserStore } from "@/src/providers/user-store-provider";
import Editprofileinput from "@/components/profile/edit-profile-input";
import { Button } from "@/components/ui/button";
import Editprofileitems from "./edit-profile-values";
import { User } from "@/src/stores/user-store";
import AvatarForm from "@/components/home/avatar";
import { resizeFile } from "@/utils/compress-image";
import { update } from "@/actions/update";
import Cropimagelayout from "./crop-image";
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
  const { setUser } = useUserStore((state) => state);
  const { user } = useUserStore((state) => state);
  const [imageUrl, setImageUrl] = useState<string>();
  const [openEdit, setEdit] = useState<openModal>(false);
  const [cropImage, setCropImage] = useState<boolean>(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        const image = (await resizeFile(file, 180)) as string;
        setImageUrl(image);
        setCropImage(true);
      } else {
        // TODO : error state
      }
    }
  };
  const handleProfileSubmit = () => {
    setOpen(false);
    update({
      profilePic: imageUrl,
    }).then((res) => {
      if (res.data) {
        // DATA
        setUser(res.data);
      }
      if (res.error) {
        // ERROR
        // TODO: set error
      }
    });
  };
  console.log(imageUrl);
  console.log(cropImage);
  return (
    <Modallayout setOpen={setOpen} closeOnClick={!(openEdit || cropImage)}>
      <div className="border" style={styles.container}>
        <span className="flex justify-between">
          <Editprofileinput
            classname="grow"
            placeholder={"Name"}
            value={user?.name}
            onClick={() => setEdit("name")}
          />
          <input
            type="file"
            id={`user-image`}
            hidden
            onChange={(e) => handleFileChange(e)}
          />
          <label htmlFor={`user-image`}>
            {imageUrl ? (
              <AvatarForm
                className="w-20 h-20 cursor-pointer"
                variant="others"
                imgurl={imageUrl}
              />
            ) : (
              <AvatarForm className="w-20 h-20 cursor-pointer" variant="self" />
            )}
          </label>
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
          onClick={handleProfileSubmit}
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
      {cropImage && imageUrl && <Cropimagelayout setOpen={setCropImage} />}
    </Modallayout>
  );
};

export default EditProfilePortal;
