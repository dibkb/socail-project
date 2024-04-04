import React, { Fragment } from "react";
import styles from "@/styles/delete-modal";
import Modallayout from "./modal-layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
interface DeleteModal {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteModal = ({ setOpen }: DeleteModal) => {
  return (
    <Modallayout setOpen={setOpen}>
      <div style={styles.container} className="relative p-1">
        {/* <h3
          className="text-center font-medium"
          style={{
            fontSize: "2rem",
            color: "#1c1917",
          }}
        >
          Delete Post
        </h3> */}
        <main className="mt-2 text-sm flex flex-col gap-3 items-center">
          <Image
            src={`https://cdn.dribbble.com/users/897074/screenshots/16927015/media/b754d4f6646c58e7038ef672be5ea2b9.jpg?resize=300x300&vertical=center`}
            width={200}
            height={200}
            alt="Dustbin"
          />
          <h3
            className="text-base font-medium"
            style={{
              color: "#1c1917",
            }}
          >
            Are you sure you want to delete this post?
          </h3>
          <div
            className="text-sm flex gap-3 w-full mt-4"
            style={{
              fontSize: ".8rem",
              fontWeight: "400",
            }}
          >
            <Button variant={"destructive"} className="grow">
              Yes Delete
            </Button>
            <Button
              variant={"default"}
              className="grow"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </main>
      </div>
    </Modallayout>
  );
};

export default DeleteModal;
