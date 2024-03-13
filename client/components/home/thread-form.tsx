import React from "react";
import AvatarForm from "./avatar";
import { Button } from "../ui/button";

const Threadform = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center w-full justify-between gap-4 cursor-pointer">
        <AvatarForm />
        <span className="text-sm text-stone-500 select-none mr-auto">
          Start a thread...
        </span>
        <Button variant="secondary" className="rounded-3xl" disabled>
          Post
        </Button>
      </div>
      <hr className="border-stone-800 border-t border-[1/2px]" />
    </div>
  );
};

export default Threadform;
