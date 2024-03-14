"use client";
import React, { Dispatch, SetStateAction } from "react";
import Modallayout from "./modal-layout";
import { Button } from "@/components/ui/button";
interface ThreadformPortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const ThreadformPortal = ({ setOpen }: ThreadformPortal) => {
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
          Content
          <div className="flex justify-between items-center">
            <p className="text-stone-500 text-sm">Anyone can reply</p>
            <Button className="rounded-3xl">Post</Button>
          </div>
        </div>
      </div>
    </Modallayout>
  );
};

export default ThreadformPortal;
