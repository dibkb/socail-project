"use client";
import { useUserStore } from "@/src/providers/user-store-provider";
import React, { ChangeEvent } from "react";
import styles from "../../styles/thread-modal";
const Threadbock = () => {
  const { user } = useUserStore((state) => state);
  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };
  return (
    <div>
      <p className="text-sm font-medium">{user?.username || "dib.kb"}</p>
      <textarea
        placeholder="Start a shread..."
        className="text-sm bg-transparent focus:ring-transparent"
        style={styles.textarea}
        onChange={onChangeTextArea}
      ></textarea>
      <div>other options</div>
    </div>
  );
};

export default Threadbock;
