"use client";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import Modallayout from "./modal-layout";
interface Editprofileitems {
  label: string;
  setOpen: Dispatch<SetStateAction<openModal>>;
  value: string;
}
import styles from "@/styles/edit-profile-values";
import { openModal } from "./edit-profile-modal";
import { Button } from "@/components/ui/button";
import { update, updateval } from "@/actions/update";
import { useUserStore } from "@/src/providers/user-store-provider";
type UserKeys = keyof updateval;
const Editprofileitems = ({ setOpen, label, value }: Editprofileitems) => {
  const { setUser } = useUserStore((state) => state);
  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    setEditVal(event.target.value);
  };
  const [editVal, setEditVal] = useState<string>(value || "");
  const [isPending, startTransition] = useTransition();
  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = label.split(" ")[1].toLowerCase() as keyof updateval;
    startTransition(async () => {
      update({
        [val]: editVal,
      }).then((res) => {
        if (res.data) {
          // DATA
          setUser(res.data);
          console.log(res.data);
        }
        if (res.error) {
          // ERROR
        }
      });
    });
  };
  return (
    <Modallayout setOpen={() => setOpen(false)} z={1001} closeOnClick={true}>
      <form
        onSubmit={submitFormHandler}
        className="flex flex-col gap-y-6 relative"
      >
        <div className="flex items-center justify-between px-4">
          <h3
            className="text-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </h3>
          <h3 className="text-center font-semibold">{label}</h3>
          <Button
            type="submit"
            variant={"ghost"}
            disabled={editVal === value || editVal.length == 0}
            className="text-center cursor-pointer"
            style={{
              color: "#0284c7",
              fontSize: "1rem",
            }}
          >
            Done
          </Button>
        </div>
        <div className="border bg-stone-800" style={styles.container}>
          <textarea
            value={editVal}
            onChange={onChangeTextArea}
            className="bg-transparent focus:ring-transparent w-full"
            style={styles.textarea}
          />
        </div>
      </form>
    </Modallayout>
  );
};

export default Editprofileitems;
