import { calulateTime } from "@/utils/calulate-time-passed";

import React from "react";
import Avatar from "../home/avatar";
import { Post, Threads } from "@/types";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
interface Singlepost {
  post: (Post & { title?: never }) | (Threads & { body?: never });
  username: string;
}
export const Singlethread = ({ post, username }: Singlepost) => {
  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <Avatar variant="self" />
        <span className="grow border border-stone-800 bg-stone-800"></span>
      </div>
      <div className="flex flex-col grow">
        <span className="flex items-center justify-between w-full">
          <p className="text-sm">{username}</p>
          <span className="flex items-center gap-1 text-stone-600 text-xs font-medium">
            <p>{calulateTime(post.createdAt).quantity}</p>
            <p>{calulateTime(post.createdAt).unit}</p>
          </span>
        </span>
        <p>{post.title || post.body}</p>
        <span className="mt-3 flex gap-3 items-center">
          <IoMdHeartEmpty className="h-5 w-5 cursor-pointer" />
          <FaRegComment className="h-4 w-4 cursor-pointer" />
        </span>
      </div>
    </>
  );
};
