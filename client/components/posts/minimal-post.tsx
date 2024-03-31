"use-client";
import React from "react";
import { smallProfile } from "./post-comment";
import useSWR, { SWRResponse } from "swr";
import { Post } from "@/types";
import { smallProfileFetcher } from "@/actions/getComment";
import { Singlepost } from "./single-post";
import Avatar from "../home/avatar";
import { Postsk } from "../guides/skeleton-loader";
import { User } from "@/src/stores/user-store";

interface MinimalPost {
  post: Post;
  body: string;
  user: User;
  // username: string;
  // userid: string;
}
const MinimalPost = ({ post, body, user }: MinimalPost) => {
  const {
    data: postOwner,
    error: userError,
    isLoading: userLoading,
  }: SWRResponse<smallProfile> = useSWR(post?.userId, smallProfileFetcher);
  if (userLoading || !postOwner) {
    return <Postsk />;
  }
  return (
    <main className="flex flex-col gap-3 py-3 select-none">
      <Singlepost post={post} user={postOwner} trail={true} />
      <span className="flex items-center justify-between text-xs text-stone-600 font-medium">
        {/* type-comment */}
        <span className="flex gap-2  text-stone-200 w-full items-center px-4 py-1 border border-stone-800 rounded-2xl bg-stone-900">
          <Avatar
            variant={"others"}
            imgurl={user.profilePic}
            name={user.username}
          />
          <span>{body}</span>
        </span>
      </span>
    </main>
  );
};

export default MinimalPost;
