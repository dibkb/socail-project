"use client";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import Modallayout from "./modal-layout";
import { Button } from "@/components/ui/button";
import AvatarForm from "@/components/home/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
import styles from "../styles/thread-modal";
interface ThreadformPortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const ThreadformPortal = ({ setOpen }: ThreadformPortal) => {
  const { user } = useUserStore((state) => state);
  const footer = (
    <div className="flex justify-between items-center">
      <p className="text-stone-500 text-sm">Anyone can reply</p>
      <Button className="rounded-3xl">Post</Button>
    </div>
  );
  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };
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
              <AvatarForm />
              <span className="border" style={styles.vertical} />
              <AvatarForm className="inline-block h-6 w-6" />
            </div>
            <div className="flex flex-col" style={styles.rightContainer}>
              <p className="text-sm font-medium">
                {user?.username || "dib.kb"}
              </p>
              <textarea
                placeholder="Start a thread..."
                className="text-sm bg-transparent focus:ring-transparent"
                style={styles.textarea}
                onChange={onChangeTextArea}
              ></textarea>
              <div>other options</div>
              <span className="text-sm" style={styles.addThread}>
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
