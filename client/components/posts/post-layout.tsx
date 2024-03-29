"use client";
import React, { useState } from "react";
import { Singlepost } from "./single-post";
import { IoMdHeartEmpty } from "react-icons/io";
import Avatar from "../home/avatar";
import { Input } from "../ui/input";
import { Post } from "@/types";
import useSWR from "swr";
import axios from "axios";
import { commentFetcher } from "@/actions/getComment";
interface PostLayout {
  post: Post;
  username: string;
}
const PostLayout = ({ post, username }: PostLayout) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { data, error, isLoading } = useSWR(post?.id, commentFetcher);
  return (
    <main className="flex flex-col gap-3 py-3">
      <Singlepost post={post} username={username} trail={true}>
        <IoMdHeartEmpty className="h-5 w-5 cursor-pointer" />
      </Singlepost>
      <span className="flex items-center justify-between text-xs cursor-pointer text-stone-600 font-medium">
        <span className="flex gap-2  text-stone-200 w-full">
          <Avatar variant={"self"} />
          <form
            action=""
            className="rounded-md border-none grow flex items-center pr-3"
          >
            <Input
              type="text"
              placeholder="Add a comment"
              className="border-transparent text-xs group focus-visible:border-stone-500 focus-visible:ring-0 grow"
            />
          </form>
        </span>
      </span>
    </main>
  );
};

export default PostLayout;
