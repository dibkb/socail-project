import { calulateTime } from "@/utils/calulate-time-passed";

import React from "react";
import Avatar from "../home/avatar";
import { Post, Threads } from "@/types";
import { IoMdHeartEmpty } from "react-icons/io";
interface Singlepost {
  post: (Post & { title?: never }) | (Threads & { body?: never });
  username: string;
  trail?: boolean;
  children: React.ReactNode;
}
export const Singlepost = ({
  post,
  username,
  trail = false,
  children,
}: Singlepost) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col items-center gap-1">
        <Avatar variant="self" />
        {trail && (
          <span className="grow border border-stone-800 bg-stone-800"></span>
        )}
      </div>
      <div className="flex flex-col grow">
        <span className="flex items-center justify-between w-full">
          <p className="text-sm">{username}</p>
          <span className="flex items-center gap-1 text-stone-600 text-xs font-medium">
            <p>{calulateTime(post.createdAt).quantity}</p>
            <p>{calulateTime(post.createdAt).unit}</p>
          </span>
        </span>
        <p className="text-base">{post.title || post.body}</p>
        <span className="mt-3 flex gap-3 items-center">{children}</span>
      </div>
    </div>
  );
};
