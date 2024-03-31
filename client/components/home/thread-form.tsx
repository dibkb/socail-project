"use client";
import React, { useState } from "react";
import AvatarForm from "./avatar";
import ThreadformPortal from "@/modals/thread-modal";
import Postbutton from "../Buttons/post-button";

const Threadform = () => {
  const [openThreadModal, setOpenThreadModal] = useState(false);
  return (
    <>
      <div
        className="flex flex-col gap-y-6 z-0"
        onClick={() => setOpenThreadModal(true)}
      >
        <div className="flex items-center w-full justify-between gap-4 cursor-pointer">
          <AvatarForm variant="self" />
          <span className="text-sm text-stone-500 select-none mr-auto">
            Start a thread...
          </span>
          <Postbutton />
        </div>
        <hr className="border-stone-800 border-t border-[1/2px]" />
      </div>
      {openThreadModal && <ThreadformPortal setOpen={setOpenThreadModal} />}
    </>
  );
};

export default Threadform;
