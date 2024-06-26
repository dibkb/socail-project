import React, { Dispatch, SetStateAction, useState } from "react";
import Modallayout from "./modal-layout";
import styles from "@/styles/edit-post";
import { Post } from "@/types";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { TbPhoto } from "react-icons/tb";
import { resizeFile } from "@/utils/compress-image";
import { AlertDestructive } from "@/components/errors/error-message";
import { Button } from "@/components/ui/button";
import { useIsBelowWidth } from "@/hooks/isBelowWidth";
import { updatePost } from "@/actions/updatePost";
import Spinner from "@/components/svg/spinner";
interface Editpostmodal {
  setOpen: Dispatch<SetStateAction<boolean>>;
  post: Post;
}
const Editpostmodal = ({ setOpen, post }: Editpostmodal) => {
  const [state, setState] = useState({
    loading: false,
    errorMessage: "",
  });
  const [body, setBody] = useState<string>(post.body);
  const [image, setImage] = useState<string>(post?.image || "");
  const [error, setError] = useState(false);
  const changeTextAreaHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    setBody(event.target.value);
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        const image = (await resizeFile(file)) as string;
        setImage(image);
      } else {
        setError(true);
      }
    }
  };
  const updatePostHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({
      loading: true,
      errorMessage: "",
    });
    updatePost({
      id: post.id,
      body: body,
      image: image,
    }).then((res) => {
      if (res.data) {
        setState({
          loading: false,
          errorMessage: "",
        });
        window.location.reload();
      }
      if (res.error) {
        setState({
          loading: false,
          errorMessage: res.error,
        });
      }
    });
  };
  const { isBelowWidth } = useIsBelowWidth(600);
  return (
    <Modallayout setOpen={setOpen}>
      <div className="flex flex-col gap-y-6 relative">
        <h3 className="text-center text-sm font-semibold">Edit Post</h3>
        <form
          className="border bg-stone-800"
          style={{
            ...styles.container,
            minWidth: isBelowWidth ? "90vw" : 600,
          }}
          onSubmit={updatePostHandler}
        >
          <main className="flex flex-col gap-x-4" style={styles.main}>
            <textarea
              value={body}
              placeholder={"Edit post modal here ..."}
              className="text-sm bg-transparent focus:ring-transparent w-full"
              style={styles.textarea}
              onChange={changeTextAreaHandler}
            />
            {image && (
              <div className="relative mb-2">
                <Image
                  src={image}
                  alt={"Image assocaited with " + post.body}
                  width={300}
                  height={300}
                  className="rounded-lg"
                ></Image>
                <RxCross1
                  onClick={() => setImage("")}
                  className="p-2 rounded-full absolute top-0 right-0 bg-stone-700 w-9 h-9 hover:bg-stone-600 cursor-pointer"
                />
              </div>
            )}
            <input
              type="file"
              id={`imageinput`}
              hidden
              onChange={(e) => handleFileChange(e)}
            />
            <label
              htmlFor={`imageinput`}
              className="flex items-center gap-2 text-stone-500 hover:text-white text-sm"
            >
              {image ? "Edit photo" : "Add photo"}
              <TbPhoto size={18} className="cursor-pointer " />
            </label>
          </main>
          {state.errorMessage?.length ? (
            <p className="text-red-600 text-center">{state.errorMessage}</p>
          ) : (
            ""
          )}
          <Button
            className="mt-6 select-none"
            variant={"default"}
            type="submit"
            disabled={state.loading}
          >
            {state.loading ? (
              <>
                <Spinner fill="#000" />
                Updating post
              </>
            ) : (
              "Update post"
            )}
          </Button>
        </form>
        {error ? (
          <AlertDestructive
            message="Only images are allowed"
            onCloseHandler={() => setError(false)}
          />
        ) : (
          ""
        )}
      </div>
    </Modallayout>
  );
};

export default Editpostmodal;
