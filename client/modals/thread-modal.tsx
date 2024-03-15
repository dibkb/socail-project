"use client";
import React, { Dispatch, SetStateAction } from "react";
import Modallayout from "./modal-layout";
import { Button } from "@/components/ui/button";
import AvatarForm from "@/components/home/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
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
        <div
          className="border bg-stone-800"
          style={{
            borderWidth: "1px",
            minWidth: "600px",
            padding: "2rem",
            borderRadius: "1.2rem",
            borderColor: "#44403c",
          }}
        >
          <main
            className="flex gap-x-4"
            style={{
              marginBottom: "1rem",
            }}
          >
            <AvatarForm />
            <div
              className="flex flex-col gap-y-2"
              style={{
                flexGrow: 1,
              }}
            >
              <p className="text-sm font-medium">
                {user?.username || "dib.kb"}
              </p>
              <textarea
                name=""
                id=""
                placeholder="Start a thread..."
                className="text-sm bg-transparent focus:ring-transparent"
                style={{
                  overflow: "hidden",
                  resize: "none",
                  outline: "none",
                }}
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
