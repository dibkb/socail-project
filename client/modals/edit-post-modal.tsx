import React, { Dispatch, SetStateAction, useState } from "react";
import Modallayout from "./modal-layout";
import styles from "@/styles/edit-post";
import { Post } from "@/types";
import { Input } from "@/components/ui/input";
interface Editpostmodal {
  setOpen: Dispatch<SetStateAction<boolean>>;
  post: Post;
}
const Editpostmodal = ({ setOpen, post }: Editpostmodal) => {
  const [body, setBody] = useState<string>(post.body);
  const changeTextAreaHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    setBody(event.target.value);
  };
  return (
    <Modallayout setOpen={setOpen}>
      <div className="flex flex-col gap-y-6 relative">
        <h3 className="text-center text-sm font-semibold">Edit Post</h3>
        <form
          className="border bg-stone-800"
          style={styles.container}
          //   onSubmit={createPostHandler}
        >
          <main className="flex gap-x-4" style={styles.main}>
            <textarea
              value={body}
              placeholder={"Edit post modal here ..."}
              className="text-sm bg-transparent focus:ring-transparent w-full"
              style={styles.textarea}
              onChange={changeTextAreaHandler}
            />
          </main>
        </form>
      </div>
    </Modallayout>
  );
};

export default Editpostmodal;
