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
import { update } from "@/actions/update";
import Cropimagelayout from "./crop-image";
import { useIsBelowWidth } from "@/hooks/isBelowWidth";
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
  const [openEdit, setEdit] = useState<openModal>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageCropUrl, setImageCropUrl] = useState<string>("");
  const [cropImage, setCropImage] = useState<boolean>(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
        setCropImage(true);
      } else {
        // TODO : error state
      }
    }
  };
  const handleProfileSubmit = async () => {
    setOpen(false);
    // const image = (await resizeFile(imageCropUrl, 180)) as string;
    update({
      profilePic: imageCropUrl,
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
  const { isBelowWidth } = useIsBelowWidth(600);
  return (
    <Modallayout setOpen={setOpen} closeOnClick={!(openEdit || cropImage)}>
      <div
        style={{
          ...styles.container,
          minWidth: isBelowWidth ? "90vw" : 600,
        }}
      >
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
            {imageCropUrl || imageUrl ? (
              <AvatarForm
                className="w-20 h-20 cursor-pointer"
                variant="others"
                imgurl={
                  imageCropUrl.length && !cropImage ? imageCropUrl : imageUrl
                }
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
      {cropImage && imageUrl && (
        <Cropimagelayout
          setOpen={setCropImage}
          imageUrl={imageUrl}
          setImageCropUrl={setImageCropUrl}
        />
      )}
    </Modallayout>
  );
};

export default EditProfilePortal;
