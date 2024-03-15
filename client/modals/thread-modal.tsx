"use client";
import React, { Dispatch, SetStateAction } from "react";
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
  return (
    <Modallayout setOpen={setOpen}>
      <div className="flex flex-col gap-y-6 relative">
        <h3 className="text-center text-sm font-semibold">New Thread</h3>
        <div className="border bg-stone-800" style={styles.container}>
          <main className="flex gap-x-4" style={styles.main}>
            <AvatarForm />
            <div
              className="flex flex-col gap-y-2"
              style={styles.rightContainer}
            >
              <p className="text-sm font-medium">
                {user?.username || "dib.kb"}
              </p>
              <textarea
                name=""
                id=""
                placeholder="Start a thread..."
                className="text-sm bg-transparent focus:ring-transparent"
                style={styles.textarea}
              ></textarea>
            </div>
          </main>
          {footer}
        </div>
      </div>
    </Modallayout>
  );
};

export default ThreadformPortal;
