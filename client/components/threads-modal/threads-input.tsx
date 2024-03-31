"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import React, { ChangeEvent } from "react";
import { TbPhoto } from "react-icons/tb";
import styles from "../../styles/thread-modal";
import { imgurl } from "@/modals/thread-modal";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { resizeFile } from "@/utils/compress-image";
interface ThreadsInput {
  id: number;
  value: string;
  handleRemoveInput: (id: number) => void;
  handleRemoveImg: (id: number) => void;
  onChangeTextArea: (
    event: ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => void;
  username?: string;
  imgUrl: imgurl[];
  setImgUrl: React.Dispatch<React.SetStateAction<imgurl[]>>;
  setErrorHandler: () => void;
}
const ThreadsInput = ({
  id,
  value,
  handleRemoveInput,
  onChangeTextArea,
  handleRemoveImg,
  username,
  setImgUrl,
  imgUrl,
  setErrorHandler,
}: ThreadsInput) => {
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        const image = (await resizeFile(file)) as string;
        setImgUrl((prev) => [
          ...prev.filter((input) => input.id !== id),
          {
            id: id,
            data: image,
          },
        ]);
      } else {
        setErrorHandler();
      }
    }
  };
  return (
    <div
      style={{
        marginTop: "8px",
      }}
    >
      <span className="flex justify-between items-center">
        <p className="text-sm font-medium">{username}</p>
        {id !== 0 && (
          <Cross1Icon
            onClick={() => handleRemoveInput(id)}
            className="cursor-pointer"
          />
        )}
      </span>
      <textarea
        value={value}
        placeholder={id == 0 ? "Start a shread..." : "Say more..."}
        className="text-sm bg-transparent focus:ring-transparent w-full"
        style={styles.textarea}
        onChange={(e) => onChangeTextArea(e, id)}
      />
      <span className="">
        {imgUrl.filter((img) => img.id === id)[0]?.data ? (
          <div className="relative mb-2">
            <Image
              src={imgUrl.filter((img) => img.id === id)[0]?.data}
              alt={"Image assocaited with " + id}
              width={450}
              height={450}
            ></Image>
            <RxCross1
              onClick={() => handleRemoveImg(id)}
              className="p-2 rounded-full absolute top-0 right-0 bg-stone-700 w-9 h-9 hover:bg-stone-600 cursor-pointer"
            />
          </div>
        ) : (
          <>
            <input
              type="file"
              id={`imageinput-${id}`}
              hidden
              onChange={(e) => handleFileChange(e, id)}
            />
            <label htmlFor={`imageinput-${id}`}>
              <TbPhoto
                size={18}
                className="cursor-pointer text-stone-500 hover:text-white"
              />
            </label>
          </>
        )}
      </span>
    </div>
  );
};

export default ThreadsInput;
