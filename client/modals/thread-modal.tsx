"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Modallayout from "./modal-layout";
import { Button } from "@/components/ui/button";
import AvatarForm from "@/components/home/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
import styles from "../styles/thread-modal";
import Threadbock from "@/components/home/thread-block";
import { Cross1Icon, ImageIcon } from "@radix-ui/react-icons";
import { TbPhoto } from "react-icons/tb";
interface ThreadformPortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const ThreadformPortal = ({ setOpen }: ThreadformPortal) => {
  const { user } = useUserStore((state) => state);
  const [threads, setThreads] = useState([{ id: 0, value: "" }]);
  const handleAddInput = () => {
    setThreads((prev) => [...prev, { id: threads.length, value: "" }]);
  };
  const handleRemoveInput = (id: number) => {
    setThreads((prev) => prev.filter((input) => input.id !== id));
  };
  const handleInputChange = (id: number, value: string) => {
    setThreads((prev) =>
      prev.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };
  const onChangeTextArea = (
    event: ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    handleInputChange(id, event.target.value);
  };
  const footer = (
    <div className="flex justify-between items-center">
      <p className="text-stone-500 text-sm">Anyone can reply</p>
      <Button className="rounded-3xl">Post</Button>
    </div>
  );
  return (
    <Modallayout setOpen={setOpen}>
      <div className="flex flex-col gap-y-6 relative">
        <h3 className="text-center text-sm font-semibold">New Thread</h3>
        <div className="border bg-stone-800" style={styles.container}>
          <main className="flex gap-x-4" style={styles.main}>
            <div
              className="flex flex-col items-center"
              style={styles.leftContainer}
            >
              {threads.map((thread) => (
                <React.Fragment key={thread.id + thread.value}>
                  <AvatarForm />
                  <span className="border" style={styles.vertical} />
                </React.Fragment>
              ))}
              <AvatarForm className="inline-block h-6 w-6" />
            </div>
            <div className="flex flex-col" style={styles.rightContainer}>
              {threads.map((thread) => (
                <div
                  key={thread.id}
                  style={{
                    marginTop: "8px",
                  }}
                >
                  <span className="flex justify-between items-center">
                    <p className="text-sm font-medium">
                      {user?.username || "dib.kb"}
                    </p>
                    {thread.id !== 0 && (
                      <Cross1Icon
                        onClick={() => handleRemoveInput(thread.id)}
                        className="cursor-pointer"
                      />
                    )}
                  </span>
                  <textarea
                    value={thread.value}
                    placeholder="Start a thread..."
                    className="text-sm bg-transparent focus:ring-transparent"
                    style={styles.textarea}
                    onChange={(e) => onChangeTextArea(e, thread.id)}
                  ></textarea>
                  <div>
                    <TbPhoto
                      size={18}
                      className="cursor-pointer text-stone-500"
                    />
                  </div>
                </div>
              ))}
              <span
                className="text-sm"
                style={styles.addThread}
                onClick={handleAddInput}
              >
                Add to thread
              </span>
            </div>
          </main>
          {footer}
        </div>
      </div>
    </Modallayout>
  );
};

export default ThreadformPortal;
