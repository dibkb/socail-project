"use client";
import { Comment } from "@/types";
import React from "react";
import Avatar from "../home/avatar";
import { calulateTime } from "@/utils/calulate-time-passed";
import useSWR, { SWRResponse } from "swr";
import { smallProfileFetcher } from "@/actions/getComment";
import { User } from "@/src/stores/user-store";
import { useIsBelowWidth } from "@/hooks/isBelowWidth";
import Link from "next/link";
interface Postcomment {
  com: Comment;
}
export type smallProfile = Pick<User, "id" | "username" | "profilePic">;
const Postcomment = React.memo(({ com }: Postcomment) => {
  const { data, error, isLoading }: SWRResponse<smallProfile> = useSWR(
    com.userId,
    smallProfileFetcher
  );
  const { isBelowWidth } = useIsBelowWidth(399);
  return (
    <main className="flex justify-between items-start">
      <div className="flex items-center grow gap-2">
        <Link
          className="flex items-center gap-2 hover:underline"
          href={`user/@${data?.username}`}
        >
          <Avatar
            variant={"others"}
            imgurl={data?.profilePic}
            name={data?.username}
            className="h-8 w-8"
          />
          {isBelowWidth ? (
            ""
          ) : (
            <p className="text-xs sm:text-sm">{data?.username}</p>
          )}
        </Link>
        <p className="text-sm font-medium text-stone-400 grow text-clip line-clamp-1">
          {com.body}
        </p>
        <span className="flex items-center gap-1 text-stone-600 text-xs font-medium">
          <p>{calulateTime(com.createdAt).quantity}</p>
          <p>{calulateTime(com.createdAt).unit}</p>
        </span>
      </div>
    </main>
  );
});

export default Postcomment;
