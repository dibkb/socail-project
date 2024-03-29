"use client";
import React, { useState } from "react";
import { Singlepost } from "./single-post";
import { IoMdHeartEmpty } from "react-icons/io";
import Avatar from "../home/avatar";
import { Input } from "../ui/input";
import { Post, Comment } from "@/types";
import useSWR, { SWRResponse } from "swr";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { commentFetcher } from "@/actions/getComment";
import { calulateTime } from "@/utils/calulate-time-passed";
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
  const [openComments, setOpenComments] = useState<boolean>(false);
  console.log(data);
  return (
    <main className="flex flex-col gap-3 py-3 select-none">
      <Singlepost post={post} username={username} trail={true}>
        <div className="w-full">
          <IoMdHeartEmpty className="h-5 w-5 cursor-pointer" />
          <div className="flex justify-between items-center mt-4">
            <span className="flex items-center text-xs gap-3 text-stone-500 font-medium cursor-pointer">
              <p>1 like</p>
              <p className="hover:underline">{data?.length} comments</p>
            </span>
            {data?.length ? (
              <span onClick={() => setOpenComments((prev) => !prev)}>
                {openComments ? (
                  <RiArrowDropUpLine className="rounded-full hover:bg-stone-800 h-5 w-5 text-stone-500 cursor-pointer" />
                ) : (
                  <RiArrowDropDownLine className="rounded-full hover:bg-stone-800 h-5 w-5 text-stone-500 cursor-pointer" />
                )}
              </span>
            ) : (
              ""
            )}
          </div>
          {/* comments */}
          <div className="mt-2">
            {openComments &&
              data?.map((com) => (
                <span
                  key={com.id}
                  className="rounded-full flex justify-between"
                >
                  <p className="text-sm font-medium text-stone-400">
                    {com.body}
                  </p>
                  <span className="flex items-center gap-1 text-stone-600 text-xs font-medium">
                    <p>{calulateTime(com.createdAt).quantity}</p>
                    <p>{calulateTime(com.createdAt).unit}</p>
                  </span>
                </span>
              ))}
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
