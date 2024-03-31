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
import { BsFillReplyAllFill } from "react-icons/bs";
import { useUserStore } from "@/src/providers/user-store-provider";

interface MinimalPost {
  post: Post;
  body: string;
  commentUser: User;
}
const MinimalPost = ({ post, body, commentUser }: MinimalPost) => {
  const { user } = useUserStore((state) => state);
  const {
    data: postOwner,
    error: userError,
    isLoading: userLoading,
  }: SWRResponse<smallProfile> = useSWR(post?.userId, smallProfileFetcher);
  if (userLoading || !postOwner || !user) {
    return <Postsk />;
  }
  return (
    <main className="flex flex-col gap-3 py-3 select-none">
      <span className="flex items-center gap-2 text-stone-600 ml-auto text-sm">
        <BsFillReplyAllFill />
        <p>Replied to </p>
      </span>
      <Singlepost
        post={post}
        user={postOwner?.profilePic ? postOwner : commentUser}
        trail={true}
      />
      <span className="flex items-center justify-between text-xs text-stone-600 font-medium">
        {/* type-comment */}
        <span className="flex gap-2  text-stone-200 w-full items-center px-4 py-1 border border-stone-800 rounded-2xl bg-stone-900">
          <Avatar
            variant={"others"}
            imgurl={commentUser.profilePic}
            name={commentUser.username}
          />
          <span>{body}</span>
        </span>
      </span>
    </main>
  );
};

export default MinimalPost;
