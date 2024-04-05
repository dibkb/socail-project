"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "@/styles/delete-modal";
import Modallayout from "./modal-layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useIsBelowWidth } from "@/hooks/isBelowWidth";
import { Post } from "@/types";
import { deletePost } from "@/actions/deletePost";
import Spinner from "@/components/svg/spinner";
interface DeleteModal {
  id: Post["id"];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteModal = ({ id, setOpen }: DeleteModal) => {
  const { isBelowWidth } = useIsBelowWidth(369);
  const [state, setState] = useState({
    loading: false,
    errorMessage: "",
  });
  const deletePosthandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ errorMessage: "", loading: true });
    deletePost(id)
      .then((r) => {
        if (r.data) {
          setState({ errorMessage: "", loading: false });
          setOpen(false);
          window.location.reload();
        }
        if (r.error) {
          setState({ loading: false, errorMessage: r.error });
        }
      })
      .catch();
  };
  return (
    <Modallayout setOpen={setOpen}>
      <div
        style={{
          ...styles.container,
          minWidth: isBelowWidth ? "90vw" : 369,
        }}
        className="relative p-1"
      >
        <form
          className="mt-2 text-sm flex flex-col gap-3 items-center"
          onSubmit={deletePosthandler}
        >
          <Image
            src={`https://cdn.dribbble.com/users/897074/screenshots/16927015/media/b754d4f6646c58e7038ef672be5ea2b9.jpg?resize=300x300&vertical=center`}
            width={200}
            height={200}
            alt="Dustbin"
          />
          <h3
            className="text-base font-medium text-center"
            style={{
              color: "#1c1917",
            }}
          >
            Are you sure you want to delete this post?
          </h3>
          {state.errorMessage?.length ? (
            <p className="text-red-600">{state.errorMessage}</p>
          ) : (
            ""
          )}
          <div
            className="text-sm flex gap-3 w-full mt-4"
            style={{
              fontSize: ".8rem",
              fontWeight: "400",
            }}
          >
            <Button
              variant={"destructive"}
              className="grow"
              type="submit"
              disabled={state.loading}
            >
              {state.loading ? (
                <>
                  <Spinner />
                  Deleting
                </>
              ) : (
                "Yes Delete"
              )}
            </Button>
            <Button
              variant={"default"}
              className="grow"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </form>
      </div>
    </Modallayout>
  );
};

export default DeleteModal;
