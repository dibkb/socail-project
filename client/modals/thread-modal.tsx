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
import { Button } from "@/components/ui/button";
import AvatarForm from "@/components/home/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
import styles from "../styles/thread-modal";
import ThreadsInput from "@/components/threads-modal/threads-input";
import { createPost } from "@/actions/post";
import { cn } from "@/lib/utils";
import Spinner from "@/components/svg/spinner";
interface ThreadformPortal {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export interface imgurl {
  id: number;
  data: string;
}
export interface threads {
  id: number;
  value: string;
}
const ThreadformPortal = ({ setOpen }: ThreadformPortal) => {
  const { user } = useUserStore((state) => state);
  const [threads, setThreads] = useState<threads[]>([{ id: 0, value: "" }]);
  const [imgUrl, setImgUrl] = useState<imgurl[]>([{ id: 0, data: "" }]);
  const [loading, setLoading] = useState({ state: true, error: "" });
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
    startTransition(async () => {
      setLoading({
        state: true,
        error: "",
      });
      createPost({
        threads,
        imgs: imgUrl,
      })
        .then((res) => {
          if (res.data) {
            const { id } = res.data;
            if (id) {
              setLoading({
                state: false,
                error: "",
              });
            }
          }
        })
        .catch((err) => {
          setLoading({
            state: false,
            error: err.message,
          });
        })
        .finally(() => setLoading((prev) => ({ ...prev, state: false })));
    });
  };
  const footer = (
    <div className="flex justify-between items-center">
      <p className="text-stone-500 text-sm">Anyone can reply</p>
      <Button className="rounded-3xl" type="submit" disabled={isPending}>
        Post
      </Button>
    </div>
  );
  const body = (
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
            {threads[threads.length - 1].value.length === 0 ? (
              <button
                className={cn("text-sm")}
                disabled={true}
                style={{
                  ...styles.addThread,
                  cursor: "not-allowed",
                }}
              >
                Add to thread
              </button>
            ) : (
              <button
                className={cn("text-sm")}
                style={{
                  ...styles.addThread,
                  cursor: "pointer",
                }}
                onClick={handleAddInput}
              >
                Add to thread
              </button>
            )}
          </div>
        </main>
        {footer}
      </form>
    </div>
  );
  const loadingFrame = (
    <div className="flex items-center">
      <Spinner maxHeight={"40px"} maxWidth={"40px"} />
      <h3>Posting...</h3>
    </div>
  );
  return (
    <Modallayout setOpen={setOpen}>
      {loading.state ? loadingFrame : body}
    </Modallayout>
  );
};
export default ThreadformPortal;
