"use client";
import React from "react";
import { Singlepost } from "./single-post";
import { IoMdHeartEmpty } from "react-icons/io";
import Avatar from "../home/avatar";
import { Input } from "../ui/input";
import { Post } from "@/types";
import useSWR, { SWRResponse } from "swr";
import { RiArrowDropDownLine } from "react-icons/ri";
import { commentFetcher } from "@/actions/getComment";
interface PostLayout {
  post: Post;
  username: string;
}
interface ErrorData {
  message: string;
}
const PostLayout = ({ post, username }: PostLayout) => {
  const { data, error, isLoading }: SWRResponse<Comment[], ErrorData, boolean> =
    useSWR(post?.id, commentFetcher);
  return (
    <main className="flex flex-col gap-3 py-3">
      <Singlepost post={post} username={username} trail={true}>
        <div className="w-full">
          <IoMdHeartEmpty className="h-5 w-5 cursor-pointer" />
          <div className="flex justify-between items-center mt-4">
            <span className="flex items-center text-xs gap-3 text-stone-500 font-medium cursor-pointer">
              <p>1 like</p>
              <p className="hover:underline">{data?.length} comments</p>
            </span>
            <RiArrowDropDownLine className="rounded-full hover:bg-stone-800 h-5 w-5 text-stone-500 cursor-pointer " />
          </div>
        </div>
      </Singlepost>
      <span className="flex items-center justify-between text-xs cursor-pointer text-stone-600 font-medium">
        {/* type-comment */}
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
