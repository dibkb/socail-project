"use client";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import Modallayout from "./modal-layout";
import { Button } from "@/components/ui/button";
import AvatarForm from "@/components/home/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
import styles from "../styles/thread-modal";
import ThreadsInput from "@/components/threads-modal/threads-input";
interface ThreadformPortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export interface imgurl {
  id: number;
  data: string;
}
const ThreadformPortal = ({ setOpen }: ThreadformPortal) => {
  const { user } = useUserStore((state) => state);
  const [threads, setThreads] = useState([{ id: 0, value: "" }]);
  const [imgUrl, setImgUrl] = useState<imgurl[]>([]);
  const [isPending, startTransition] = useTransition();
  const handleAddInput = () => {
    setThreads((prev) => [...prev, { id: prev.length, value: "" }]);
  };
  const handleRemoveInput = (id: number) => {
    setThreads((prev) => prev.filter((input) => input.id !== id));
    setImgUrl((prev) => prev.filter((input) => input.id !== id));
  };
  const handleRemoveImg = (id: number) => {
    setImgUrl((prev) => prev.filter((input) => input.id !== id));
  };
  const handleInputChange = (id: number, value: string) => {
    setThreads((prev) =>
      prev.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };
  const onChangeTextArea = (
    event: ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    handleInputChange(id, event.target.value);
  };
  const createPostHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {});
  };
  const footer = (
    <div className="flex justify-between items-center">
      <p className="text-stone-500 text-sm">Anyone can reply</p>
      <Button className="rounded-3xl" type="submit">
        Post
      </Button>
    </div>
  );
  return (
    <Modallayout setOpen={setOpen}>
      <div className="flex flex-col gap-y-6 relative">
        <h3 className="text-center text-sm font-semibold">New Thread</h3>
        <form
          className="border bg-stone-800"
          style={styles.container}
          onSubmit={createPostHandler}
        >
          <main className="flex gap-x-4" style={styles.main}>
            <div
              className="flex flex-col items-center"
              style={styles.leftContainer}
            >
              {threads.map((thread) => (
                <React.Fragment key={thread.id + thread.value}>
                  <AvatarForm />
                  <span className="border" style={styles.vertical} />
                </React.Fragment>
              ))}
              <AvatarForm className="inline-block h-6 w-6" />
            </div>
            <div className="flex flex-col" style={styles.rightContainer}>
              {threads.map((thread) => (
                <ThreadsInput
                  key={thread.id}
                  id={thread.id}
                  value={thread.value}
                  handleRemoveInput={handleRemoveInput}
                  handleRemoveImg={handleRemoveImg}
                  onChangeTextArea={onChangeTextArea}
                  username={user?.username}
                  setImgUrl={setImgUrl}
                  imgUrl={imgUrl}
                ></ThreadsInput>
              ))}
              <span
                className="text-sm"
                style={styles.addThread}
                onClick={handleAddInput}
              >
                Add to thread
              </span>
            </div>
          </main>
          {footer}
        </form>
      </div>
    </Modallayout>
  );
};
export default ThreadformPortal;
