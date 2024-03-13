"use client";
import React from "react";
import Modallayout from "./modal-layout";
import Postbutton from "@/components/Buttons/post-button";
import { Button } from "@/components/ui/button";

const ThreadformPortal = () => {
  return (
    <Modallayout>
      <div className="flex flex-col gap-y-6 relative">
        <h3 className="text-center text-sm font-semibold">New Thread</h3>
        <div
          className="border border-stone-600 bg-stone-800"
          style={{
            borderWidth: "0.8px",
            minWidth: "600px",
            padding: "2rem",
            borderRadius: "1.2rem",
          }}
        >
          Content
          <Button
            className="rounded-3xl fixed"
            style={{
              right: 16,
              bottom: 16,
            }}
          >
            Post
          </Button>
        </div>
      </div>
    </Modallayout>
  );
};

export default ThreadformPortal;
