"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import React, { ChangeEvent } from "react";
import { TbPhoto } from "react-icons/tb";
import styles from "../../styles/thread-modal";
interface ThreadsInput {
  id: number;
  value: string;
  handleRemoveInput: (id: number) => void;
  onChangeTextArea: (
    event: ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => void;
  username?: string;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
}
const ThreadsInput = ({
  id,
  value,
  handleRemoveInput,
  onChangeTextArea,
  username,
  handleFileChange,
}: ThreadsInput) => {
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
        placeholder={id == 0 ? "Start a thread..." : "Say more..."}
        className="text-sm bg-transparent focus:ring-transparent w-full"
        style={styles.textarea}
        onChange={(e) => onChangeTextArea(e, id)}
      />
      <span className="">
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
      </span>
    </div>
  );
};

export default ThreadsInput;
