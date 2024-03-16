"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ThreadformPortal from "@/modals/thread-modal";
const Profilepage = () => {
  const [openThreadModal, setOpenThreadModal] = useState(false);
  const noThread = (
    <Button onClick={() => setOpenThreadModal(true)} variant={"outline"}>
      Start your first thread
    </Button>
  );
  return (
    <div className="grow flex items-center justify-center">
      {!openThreadModal && noThread}
      {openThreadModal && <ThreadformPortal setOpen={setOpenThreadModal} />}
    </div>
  );
};

export default Profilepage;
