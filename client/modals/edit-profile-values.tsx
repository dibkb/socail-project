"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Modallayout from "./modal-layout";
interface Editprofileitems {
  label: string;
  setOpen: Dispatch<SetStateAction<openModal>>;
  value: string;
}
import styles from "@/styles/edit-profile-values";
import { openModal } from "./edit-profile-modal";
const Editprofileitems = ({ setOpen, label, value }: Editprofileitems) => {
  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    setEditVal(event.target.value);
  };
  const [editVal, setEditVal] = useState<string>(value || "");
  return (
    <Modallayout setOpen={() => setOpen(false)} z={1001} closeOnClick={true}>
      <div className="flex flex-col gap-y-6 relative">
        <div className="flex items-center justify-between px-4">
          <h3
            className="text-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </h3>
          <h3 className="text-center font-semibold">{label}</h3>
          <h3
            className="text-center cursor-pointer"
            style={{
              color: "#0284c7",
            }}
          >
            Done
          </h3>
        </div>
        <div className="border bg-stone-800" style={styles.container}>
          <textarea
            value={editVal}
            onChange={onChangeTextArea}
            className="bg-transparent focus:ring-transparent w-full"
            style={styles.textarea}
          />
        </div>
      </div>
    </Modallayout>
  );
};

export default Editprofileitems;
