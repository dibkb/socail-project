"use client";
import { Comment } from "@/types";
import React from "react";
import Avatar from "../home/avatar";
import { calulateTime } from "@/utils/calulate-time-passed";
import useSWR, { SWRResponse } from "swr";
import { smallProfileFetcher } from "@/actions/getComment";
import { User } from "@/src/stores/user-store";
interface Postcomment {
  com: Comment;
}
type data = Omit<
  User,
  "name" | "email" | "bio" | "followingIds" | "followerIds"
>;
const Postcomment = ({ com }: Postcomment) => {
  const { data, error, isLoading }: SWRResponse<data> = useSWR(
    com?.userId,
    smallProfileFetcher
  );
  return (
    <main className="rounded-full flex justify-between">
      <div className="flex items-center grow gap-2">
        <span className="flex items-center gap-2">
          <Avatar
            variant={"others"}
            imgurl={data?.profilePic}
            name={data?.username}
            className="h-8 w-8"
          />
          <p className="text-sm">{data?.username}</p>
        </span>
        <p className="text-sm font-medium text-stone-400 grow">{com.body}</p>
        <span className="flex items-center gap-1 text-stone-600 text-xs font-medium">
          <p>{calulateTime(com.createdAt).quantity}</p>
          <p>{calulateTime(com.createdAt).unit}</p>
        </span>
      </div>
    </main>
  );
};

export default Postcomment;